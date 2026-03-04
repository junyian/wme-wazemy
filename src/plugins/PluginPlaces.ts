import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";
import { WmeSDK } from "wme-sdk-typings";
import { formatRelativeTime, formatFullDate } from "../utils/dateUtils";
import PluginGemini, {
  GeminiEvaluationResult,
  GeminiError,
  GeminiErrorType,
  VIOLATION_TO_WME_REASON,
} from "./PluginGemini";

const VENUE_IMAGE_BASE_URL = "https://venue-image.waze.com";

const GEMINI_ERROR_INFO: Record<string, { icon: string; tooltip: string }> = {
  quota: { icon: "Q", tooltip: "Gemini API quota exceeded - try again later" },
  api_key: { icon: "K", tooltip: "Invalid Gemini API key - check settings" },
  network: { icon: "N", tooltip: "Network error - check your connection" },
  unknown: {
    icon: "!",
    tooltip: "Evaluation failed - check console for details",
  },
};

export default class PluginPlaces implements IPlugin {
  private sdk: WmeSDK;
  private sidebarElements: {
    tabLabel: HTMLElement;
    tabPane: HTMLElement;
  } | null = null;

  private tabHTML: string = `
    <div><h4>WazeMY Places</h4></div>
    <div id="wazemyPlaces">
      <select name="wazemyPlaces_polygons" id="wazemyPlaces_polygons"></select>
      <button id="wazemyPlaces_scan">Scan</button>
      <div id="wazemyPlaces_scanStatus"></div>
      <div id="wazemyPlaces_purCount"></div>
      <div id="wazemyPlaces_totalCount"></div>
      <div id="wazemyPlaces_table">
      <table id="wazemyPlaces_venues">
        <thead>
          <tr>
            <th title="I=Image\nN=New Place\nU=Update\nF=Flag\nD=Delete">PUR</th>
            <th>Date</th>
            <th>L</th>
            <th>Name</th>
            <th>Errors</th>
            <th title="Gemini AI evaluation for image PURs">AI</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      </div>
    </div>
  `;

  constructor() {
    this.sdk = unsafeWindow.getWmeSdk({
      scriptId: "wme-wazemy-places",
      scriptName: "WazeMY",
    });
    this.initialize();
  }

  /**
   * Initialize plugin.
   *
   * @return {void} This function does not return anything.
   */
  initialize(): void {
    const settingsHTML: string = `<div><input type="checkbox" id="wazemySettings_places_enable"/>
      <label for="wazemySettings_places_enable">Enable Places</label></div>`;
    $("#wazemySettings_settings").append(settingsHTML);

    $("#wazemySettings_places_enable").on("change", () => {
      PluginManager.instance.updatePluginSettings("places", {
        enable: $("#wazemySettings_places_enable").prop("checked"),
      });
    });

    // Set settings according to last stored value.
    const savedSettings: any = SettingsStorage.instance.getSetting("places");
    if (savedSettings?.enable === true) {
      $("#wazemySettings_places_enable").prop("checked", true);
    } else {
      $("#wazemySettings_places_enable").prop("checked", false);
    }
    console.log("[WazeMY] PluginPlaces initialized.");
  }

  /**
   * Enable plugin.
   *
   * @return {void} This function does not return anything.
   */
  enable(): void {
    this.sdk.Sidebar.registerScriptTab().then((sidebarResult) => {
      this.sidebarElements = sidebarResult;

      sidebarResult.tabLabel.innerHTML = "WazeMY Places";
      sidebarResult.tabLabel.title = "WazeMY Places";
      sidebarResult.tabPane.innerHTML = this.tabHTML;

      // Populate select options with polygons from KVMR.
      const kvmrLayer = PluginManager.instance.getLayer("__KlangValley");
      if (kvmrLayer) {
        kvmrLayer.features.forEach((feature: any) => {
          $("#wazemyPlaces_polygons").append(
            $("<option>", {
              value: feature.data.number,
              text: feature.data.number,
            }),
          );
        });
      }

      // Handle Scan button.
      $("#wazemyPlaces_scan").on("click", async () => {
        const pluginSdk = this.sdk;
        $("#wazemyPlaces_scanStatus").text("Scanning tiles.");
        $("#wazemyPlaces_venues > tbody").empty();

        const kvmrLayer = PluginManager.instance.getLayer("__KlangValley");
        if (!kvmrLayer) {
          console.log("[PluginPlaces] No KVMR layer found. Aborting scan.");
          return false;
        }
        const mr = kvmrLayer.getFeaturesByAttribute(
          "number",
          $("#wazemyPlaces_polygons option:selected")[0].innerText,
        );
        if (mr.length === 0) {
          console.log("[PluginPlaces] No polygon found. Aborting scan.");
          return false;
        }

        const feature = mr[0];
        let bounds = feature.geometry.getBounds().clone();
        const webMercator = new OpenLayers.Projection("EPSG:900913");
        const wgs84 = new OpenLayers.Projection("EPSG:4326");
        bounds = bounds.transform(webMercator, wgs84);
        const venues = await getAllVenues(bounds);

        // Helper functions defined once
        function evaluateVenue(venue: any): {
          priority: 0 | 1 | 2 | 3;
          errors: string[];
        } {
          let status: { priority: 0 | 1 | 2 | 3; errors: string[] } = {
            priority: 0,
            errors: [],
          };
          // Rule #1
          if (typeof venue.name == "undefined") {
            if (!venue.categories.includes("RESIDENCE_HOME")) {
              status.priority = 3;
              status.errors.push("Missing name.");
            }
          } else {
            // Rule: Check name for all uppercase.
            if (venue.name === venue.name.toUpperCase()) {
              status.priority = 3;
              status.errors.push("Name is uppercase.");
            }

            // Rule: Check name for all lowercase.
            if (venue.name === venue.name.toLowerCase()) {
              status.priority = 3;
              status.errors.push("Name is lowercase.");
            }
          }

          // Rule: Min lock is not set.
          if (venue.lockRank === 0) {
            status.priority = 3;
            status.errors.push("Min lock not set.");
          }

          // Rule: Phone number format.
          if (venue.phone) {
            if (
              /^[\d]{3}-[\d]{3} [\d]{4}$/.test(venue.phone) === false &&
              /^[\d]{3}-[\d]{4} [\d]{4}$/.test(venue.phone) === false &&
              /^[\d]{2}-[\d]{4} [\d]{4}$/.test(venue.phone) === false &&
              /^[\d]{2}-[\d]{3} [\d]{4}$/.test(venue.phone) === false &&
              /^[\d]{3}-[\d]{3} [\d]{3}$/.test(venue.phone) === false &&
              /^[\d]{1}-[\d]{3}-[\d]{2}-[\d]{4}$/.test(venue.phone) === false
            ) {
              status.priority = 2;
              status.errors.push("Phone number format incorrect.");
            }
          }

          // Rule: Category specific rank locks.
          if (
            (venue.categories.includes("CHARGING_STATION") &&
              venue.lockRank < 3) ||
            (venue.categories.includes("GAS_STATION") && venue.lockRank < 3) ||
            (venue.categories.includes("AIRPORT") && venue.lockRank < 4) ||
            (venue.categories.includes("BUS_STATION") && venue.lockRank < 2) ||
            (venue.categories.includes("FERRY_PIER") && venue.lockRank < 2) ||
            (venue.categories.includes("JUNCTION_INTERCHANGE") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("REST_AREAS") && venue.lockRank < 2) ||
            (venue.categories.includes("SEAPORT_MARINA_HARBOR") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("TRAIN_STATION") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("TUNNEL") && venue.lockRank < 2) ||
            (venue.categories.includes("CITY_HALL") && venue.lockRank < 2) ||
            (venue.categories.includes("COLLEGE_UNIVERSITY") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("COURTHOUSE") && venue.lockRank < 2) ||
            (venue.categories.includes("DOCTOR_CLINIC") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("EMBASSY_CONSULATE") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("FIRE_DEPARTMENT") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("HOSPITAL_URGENT_CARE") &&
              venue.lockRank < 3) ||
            (venue.categories.includes("LIBRARY") && venue.lockRank < 2) ||
            (venue.categories.includes("MILITARY") && venue.lockRank < 3) ||
            (venue.categories.includes("POLICE_STATION") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("PRISON_CORRECTIONAL_FACILITY") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("RELIGIOUS_CENTER") &&
              venue.lockRank < 3) ||
            (venue.categories.includes("SCHOOL") && venue.lockRank < 2) ||
            (venue.categories.includes("BANK_FINANCIAL") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("SHOPPING_CENTER") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("MUSEUM") && venue.lockRank < 2) ||
            (venue.categories.includes("RACING_TRACK") && venue.lockRank < 2) ||
            (venue.categories.includes("STADIUM_ARENA") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("THEME_PARK") && venue.lockRank < 2) ||
            (venue.categories.includes("TOURIST_ATTRACTION_HISTORIC_SITE") &&
              venue.lockRank < 2) ||
            (venue.categories.includes("ZOO_AQUARIUM") && venue.lockRank < 2) ||
            (venue.categories.includes("BEACH") && venue.lockRank < 2) ||
            (venue.categories.includes("GOLF_COURSE") && venue.lockRank < 2) ||
            (venue.categories.includes("PARK") && venue.lockRank < 2) ||
            (venue.categories.includes("FOREST_GROVE") && venue.lockRank < 2) ||
            (venue.categories.includes("ISLAND") && venue.lockRank < 4) ||
            (venue.categories.includes("RIVER_STREAM") && venue.lockRank < 3) ||
            (venue.categories.includes("SEA_LAKE_POOL") &&
              venue.lockRank < 5) ||
            (venue.categories.includes("CANAL") && venue.lockRank < 2) ||
            (venue.categories.includes("SWAMP_MARSH") && venue.lockRank < 2)
          ) {
            status.priority = 2;
            status.errors.push("Min lock incorrect.");
          }
          return status;
        }

        function checkPURstatus(venue: any): boolean {
          return venue.venueUpdateRequests?.length > 0;
        }

        function getPURDate(venue: any): number | null {
          if (venue.venueUpdateRequests?.length > 0) {
            // Try dateAdded first, fallback to createdOn
            return (
              venue.venueUpdateRequests[0].dateAdded ||
              venue.venueUpdateRequests[0].createdOn ||
              null
            );
          }
          return null;
        }

        // Collect and filter venues
        interface ProcessedVenue {
          venue: any;
          status: { priority: 0 | 1 | 2 | 3; errors: string[] };
          isPUR: boolean;
          isImagePUR: boolean;
          purDate: number | null;
          lon: number;
          lat: number;
          geminiResult?: GeminiEvaluationResult;
          geminiError?: GeminiErrorType;
          imageUrl?: string;
        }

        const processedVenues: ProcessedVenue[] = [];

        venues.forEach((venue: any) => {
          const status = evaluateVenue(venue);
          const isPUR = checkPURstatus(venue);
          const isImagePUR =
            isPUR && venue.venueUpdateRequests?.[0]?.type === "IMAGE";
          if (status.priority > 0 || isPUR) {
            let lon = 0;
            let lat = 0;
            if (venue.geometry.type === "Polygon") {
              lon = venue.geometry.coordinates[0][0][0];
              lat = venue.geometry.coordinates[0][0][1];
            } else {
              lon = venue.geometry.coordinates[0];
              lat = venue.geometry.coordinates[1];
            }

            // Get image URL for IMAGE PURs
            let imageUrl: string | undefined;
            if (isImagePUR) {
              const pur = venue.venueUpdateRequests?.[0];
              // Find the unapproved image in venue.images that matches the PUR
              const pendingImage = venue.images?.find(
                (img: any) => img.id === pur?.id || img.approved === false,
              );
              if (pendingImage?.id) {
                imageUrl = `${VENUE_IMAGE_BASE_URL}/${pendingImage.id}`;
              }
            }

            processedVenues.push({
              venue,
              status,
              isPUR,
              isImagePUR,
              purDate: getPURDate(venue),
              lon,
              lat,
              imageUrl,
            });
          }
        });

        // Sort: PURs first (newest to oldest), then non-PURs
        processedVenues.sort((a, b) => {
          // PURs come first
          if (a.isPUR && !b.isPUR) return -1;
          if (!a.isPUR && b.isPUR) return 1;
          // Both are PURs: sort by date descending (newest first)
          if (a.isPUR && b.isPUR) {
            const dateA = a.purDate || 0;
            const dateB = b.purDate || 0;
            return dateB - dateA;
          }
          // Both are non-PURs: keep original order
          return 0;
        });

        // Evaluate IMAGE PURs with Gemini AI
        const geminiPlugin = PluginManager.instance.getPlugin(
          "gemini",
        ) as PluginGemini;
        const imagePURs = processedVenues.filter(
          (pv) => pv.isImagePUR && pv.imageUrl,
        );

        if (geminiPlugin?.isConfigured() && imagePURs.length > 0) {
          let quotaExceeded = false;
          let evaluated = 0;

          // Evaluate images sequentially to detect quota errors early
          for (const pv of imagePURs) {
            if (quotaExceeded) {
              // Mark remaining venues as quota-limited
              pv.geminiError = "quota";
              continue;
            }

            evaluated++;
            $("#wazemyPlaces_scanStatus").text(
              `Evaluating image ${evaluated}/${imagePURs.length} with Gemini...`,
            );

            // Small delay between requests to avoid rate limiting
            if (evaluated > 1) {
              await new Promise((resolve) => setTimeout(resolve, 500));
            }

            try {
              const result = await geminiPlugin.evaluateImageFromUrl(
                pv.imageUrl!,
              );
              pv.geminiResult = result;
            } catch (error) {
              console.error(
                `[WazeMY] Gemini evaluation failed for ${pv.venue.name}:`,
                error,
              );

              // Check if this is a quota error
              if (error instanceof GeminiError) {
                pv.geminiError = error.type;
                if (error.type === "quota") {
                  quotaExceeded = true;
                  console.warn(
                    "[WazeMY] Gemini quota exceeded, skipping remaining evaluations",
                  );
                }
              } else {
                pv.geminiError = "unknown";
              }
            }
          }

          if (quotaExceeded) {
            $("#wazemyPlaces_scanStatus").text(
              `Gemini quota exceeded. Evaluated ${evaluated - 1}/${imagePURs.length} images.`,
            );
          }
        }

        // Render sorted venues
        let purCount = 0;
        let totalCount = 0;

        processedVenues.forEach((pv) => {
          const { venue, status, isPUR, purDate, lon, lat } = pv;

          const row = $("<tr>");
          row.attr("id", `${lon}:${lat}:${venue.id}`);
          row.on("click", (e) => {
            const target = e.currentTarget.id.split(":"); // split to lon:lat:id
            this.sdk.Map.setMapCenter({
              lonLat: {
                lon: parseFloat(target[0]),
                lat: parseFloat(target[1]),
              },
            });
          });

          // PUR type column
          let purHTML = ``;
          if (isPUR) {
            purCount++;
            if (venue.approved === false) {
              purHTML = `<td align="center">N</td>`;
            } else if (venue.venueUpdateRequests[0].type === "REQUEST") {
              if (venue.venueUpdateRequests[0].subType === "FLAG") {
                purHTML = `<td align="center">F</td>`;
              } else if (venue.venueUpdateRequests[0].subType === "UPDATE") {
                purHTML = `<td align="center">U</td>`;
              } else if (venue.venueUpdateRequests[0].subType === "DELETE") {
                purHTML = `<td align="center">D</td>`;
              } else {
                purHTML = `<td align="center">+</td>`;
              }
            } else if (venue.venueUpdateRequests[0].type === "IMAGE") {
              purHTML = `<td align="center">I</td>`;
            } else {
              purHTML = `<td align="center">+</td>`;
            }
          } else {
            purHTML = `<td></td>`;
          }
          row.append(purHTML);

          // Date column
          let dateHTML = `<td></td>`;
          if (isPUR && purDate) {
            const relativeTime = formatRelativeTime(purDate);
            const fullDate = formatFullDate(purDate);
            dateHTML = `<td title="${fullDate}">${relativeTime}</td>`;
          }
          row.append(dateHTML);

          const levelHTML = `<td>${venue.lockRank ? venue.lockRank + 1 : 1}</td>`;
          row.append(levelHTML);

          const colHTML = `<td>${venue.name}</td>`;
          row.append(colHTML);

          const errorsHTML = `<td>${status.errors.join("\r\n")}</td>`;
          row.append(errorsHTML);

          // AI column for Gemini evaluation
          let aiHTML = `<td></td>`;
          if (pv.isImagePUR && pv.geminiResult) {
            const suggestion = pv.geminiResult.suggestion;
            const reason = pv.geminiResult.reason;
            if (suggestion === "Reject") {
              const violations = pv.geminiResult.violations || [];
              const primaryViolation = violations[0] || "OTHER_GENERAL_ISSUE";
              aiHTML = `<td class="wazemyPlaces_ai_reject" title="${reason}">
                <span>✗</span>
                <button class="wazemyPlaces_quickReject"
                  data-venue-id="${venue.id}"
                  data-violation="${primaryViolation}"
                  title="Quick Reject: ${violations.join(", ")}">
                  Reject
                </button>
              </td>`;
            } else {
              aiHTML = `<td class="wazemyPlaces_ai_approve" title="${reason}">✓</td>`;
            }
          } else if (pv.isImagePUR && pv.geminiError) {
            // Show specific error indicators
            const info =
              GEMINI_ERROR_INFO[pv.geminiError] || GEMINI_ERROR_INFO.unknown;
            aiHTML = `<td class="wazemyPlaces_ai_error" title="${info.tooltip}">${info.icon}</td>`;
          } else if (pv.isImagePUR && !pv.geminiResult) {
            // No evaluation attempted
            let tooltip = "Gemini evaluation not available";
            if (!geminiPlugin) {
              tooltip = "Gemini plugin not loaded";
            } else if (!geminiPlugin.isConfigured()) {
              tooltip = "Gemini API key not configured - add key in settings";
            } else if (!pv.imageUrl) {
              tooltip = "No image URL found in PUR data";
            }
            aiHTML = `<td class="wazemyPlaces_ai_none" title="${tooltip}">-</td>`;
          }
          row.append(aiHTML);

          $("#wazemyPlaces_venues > tbody").append(row);
          totalCount++;
        });

        // Attach Quick Reject button handlers
        $(".wazemyPlaces_quickReject").on("click", function (e) {
          e.stopPropagation(); // Prevent row click from triggering
          const button = $(this);
          const venueId = button.data("venue-id");
          const violation = button.data("violation");
          performQuickReject(venueId, violation, button);
        });

        // Quick reject function
        function performQuickReject(
          venueId: string,
          violation: string,
          button: JQuery,
        ): void {
          const wmeReasonValue = VIOLATION_TO_WME_REASON[violation] || "8";

          // Find and select the venue in WME to open its panel
          const venue = processedVenues.find((pv) => pv.venue.id === venueId);
          if (!venue) {
            console.log("[WazeMY] Could not find venue for quick reject.");
            return;
          }

          // Center map on venue first
          pluginSdk.Map.setMapCenter({
            lonLat: { lon: venue.lon, lat: venue.lat },
          });

          // Disable button and show progress
          button.prop("disabled", true).text("...");

          // Wait for map to center, then try to click the PUR and reject
          setTimeout(() => {
            // Try to find and click the reject button in WME's PUR panel
            const rejectButton = $(
              'wz-button[color="secondary"]:contains("Reject"), ' +
                "wz-button.reject-button, " +
                'button:contains("Reject")',
            ).first();

            if (rejectButton.length > 0) {
              rejectButton[0].click();

              // Wait for dialog, then select reason and submit
              setTimeout(() => {
                const reasonSelect = $(
                  'wz-select[name="annotationType"], ' +
                    'select[name="annotationType"], ' +
                    ".rejection-reason select",
                ).first();

                if (reasonSelect.length > 0) {
                  const selectElement = reasonSelect[0] as HTMLSelectElement;
                  if (selectElement.tagName.toLowerCase() === "wz-select") {
                    (selectElement as any).value = wmeReasonValue;
                    selectElement.dispatchEvent(
                      new Event("change", { bubbles: true }),
                    );
                  } else {
                    selectElement.value = wmeReasonValue;
                    $(selectElement).trigger("change");
                  }
                }

                // Click submit
                setTimeout(() => {
                  const submitButton = $(
                    'wz-button:contains("Submit"), ' +
                      'wz-button:contains("Confirm"), ' +
                      'wz-button[color="primary"]:visible',
                  ).first();

                  if (submitButton.length > 0) {
                    submitButton[0].click();
                    button.text("Done").addClass("wazemyPlaces_rejected");
                  } else {
                    button.prop("disabled", false).text("Retry");
                  }
                }, 200);
              }, 300);
            } else {
              console.log("[WazeMY] Could not find WME reject button.");
              button.prop("disabled", false).text("Retry");
            }
          }, 500);
        }

        $("#wazemyPlaces_purCount").text(`# PUR = ${purCount}`);
        $("#wazemyPlaces_totalCount").text(`# total = ${totalCount}`);
        $("#wazemyPlaces_scanStatus").text("");

        async function getAllVenues(bounds: any) {
          let venues: any = [];
          // console.log(bounds);
          const baseURL: string =
            "https://www.waze.com/row-Descartes/app/Features?language=en&v=2&cameras=true&mapComments=true&roadClosures=true&roadTypes=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C15%2C16%2C17%2C18%2C19%2C20%2C22&venueLevel=4&venueFilter=1%2C1%2C1%2C1&";
          let urls: string[] = [];
          const stepSize: number = 0.1;
          for (let left = bounds.left; left <= bounds.right; left += stepSize) {
            for (
              let bottom = bounds.bottom;
              bottom <= bounds.top;
              bottom += stepSize
            ) {
              urls.push(
                `bbox=${left}%2C${bottom}%2C${left + stepSize > bounds.right ? bounds.right : left + stepSize}%2C${bottom + stepSize > bounds.top ? bounds.top : bottom + stepSize}`,
              );
            }
          }
          for (let i = 0; i < urls.length; i++) {
            // console.log(baseURL + urls[i]);
            $("#wazemyPlaces_scanStatus").text(
              `Scanning tile ${i + 1} of ${urls.length}.`,
            );
            const result = await GM.xmlHttpRequest({
              method: "GET",
              responseType: "json",
              url: baseURL + urls[i],
            }).catch((e: any) => console.error(e));
            venues = venues.concat(result.response.venues.objects);
          }
          return venues;
        }
      });

      console.log("[WazeMY] PluginPlaces enabled.");
    });
  }

  /**
   * Disable plugin.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    if (this.sidebarElements) {
      this.sidebarElements.tabLabel.remove();
      this.sidebarElements.tabPane.remove();
      this.sidebarElements = null;
    }
    console.log("[WazeMY] PluginPlaces disabled.");
  }

  /**
   * Updates the settings of the PluginPlaces based on the provided settings object.
   *
   * @return {void} This function does not return anything.
   */
  updateSettings(settings: any): void {
    if (settings.enable === true) {
      this.enable();
    } else if (settings.enable === false) {
      this.disable();
    }
    console.log("[WazeMY] PluginPlaces settings updated.", settings);
  }
}
