import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";

export default class PluginPlaces implements IPlugin {
  constructor() {
    this.initialize();
  }

  /**
   * Initialize plugin.
   *
   * @return {void} This function does not return anything.
   */
  initialize(): void {
    const settingsHTML: string = `<input type="checkbox" id="wazemySettings_places_enable"/>
<label for="wazemySettings_places_enable">Enable Places</label>`;
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
    const { tabLabel, tabPane } =
      W.userscripts.registerSidebarTab("wazemyplaces");
    tabLabel.innerHTML = "WazeMY Places";
    tabLabel.title = "WazeMY Places";
    tabPane.innerHTML = `<div>
      <h4>WazeMY Places</h4>
    </div>
    <div id="wazemyPlaces">
      <select name="wazemyPlaces_polygons" id="wazemyPlaces_polygons"></select>
      <button id="wazemyPlaces_scan">Scan</button>
      <div id="wazemyPlaces_purCount"></div>
      <div id="wazemyPlaces_totalCount"></div>
      <div id="wazemyPlaces_table">
      <table id="wazemyPlaces_venues">
        <thead>
          <tr>
            <th>PUR</th>
            <th>L</th>
            <th>Name</th>
            <th>Errors</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      </div>
    </div>`;

    // Populate select options with polygons from KVMR.
    const map = W.map.getLayersBy("uniqueName", "__KlangValley");
    map[0].features.forEach((feature: any) => {
      $("#wazemyPlaces_polygons").append(
        $("<option>", {
          value: feature.data.number,
          text: feature.data.number,
        }),
      );
    });

    // Handle Scan button.
    $("#wazemyPlaces_scan").on("click", () => {
      const map = W.map.getLayersBy("uniqueName", "__KlangValley");
      map[0].features.forEach((feature: any) => {
        if (
          feature.data.number ===
          $("#wazemyPlaces_polygons option:selected")[0].innerText
        ) {
          // Send request to Descartes for all venues within bounding box.
          const bounds = feature.geometry
            .getBounds()
            .transform(W.map.getProjectionObject(), "EPSG:4326");
          const url = `https://www.waze.com/row-Descartes/app/Features?bbox=${bounds.left}%2C${bounds.bottom}%2C${bounds.right}%2C${bounds.top}&venueLevel=4&venueFilter=1%2C1%2C1%2C1`;
          GM_xmlhttpRequest({
            method: "GET",
            responseType: "json",
            headers: {},
            url: url,
            onload: function (response) {
              $("#wazemyPlaces_venues > tbody").empty();
              let purCount = 0;
              let totalCount = 0;
              response.response.venues.objects.forEach((venue: any) => {
                // Check venue against rules.
                const status = evaluateVenue(venue);
                const isPUR: boolean = checkPURstatus(venue);
                if (status.priority > 0 || isPUR) {
                  // Add venue to table.
                  let lon = 0;
                  let lat = 0;
                  if (venue.geometry.type === "Polygon") {
                    lon = venue.geometry.coordinates[0][0][0];
                    lat = venue.geometry.coordinates[0][0][1];
                  } else {
                    lon = venue.geometry.coordinates[0];
                    lat = venue.geometry.coordinates[1];
                  }
                  const row = $("<tr>");
                  row.attr("id", `${lon}:${lat}:${venue.id}`);
                  row.on("click", (e) => {
                    const target = e.currentTarget.id.split(":"); // split to lon:lat:id
                    const xy =
                      OpenLayers.Layer.SphericalMercator.forwardMercator(
                        parseFloat(target[0]),
                        parseFloat(target[1]),
                      );
                    W.map.setCenter(xy);
                  });

                  let purHTML = ``;
                  if (isPUR) {
                    purCount++;
                    if (venue.approved === false) {
                      purHTML = `<td align="center">N</td>`;
                    } else if (
                      venue.venueUpdateRequests[0].type === "REQUEST"
                    ) {
                      if (venue.venueUpdateRequests[0].subType === "FLAG") {
                        purHTML = `<td align="center">F</td>`;
                      } else if (
                        venue.venueUpdateRequests[0].subType === "UPDATE"
                      ) {
                        purHTML = `<td align="center">U</td>`;
                      } else if (
                        venue.venueUpdateRequests[0].subType === "DELETE"
                      ) {
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

                  const levelHTML = `<td>${venue.lockRank ? venue.lockRank + 1 : 1}</td>`;
                  row.append(levelHTML);

                  const colHTML = `<td>${venue.name}</td>`;
                  row.append(colHTML);

                  const errorsHTML = `<td>${status.errors.join("\r\n")}</td>`;
                  row.append(errorsHTML);

                  $("#wazemyPlaces_venues > tbody").append(row);
                  totalCount++;
                }

                function evaluateVenue(venue: any): any {
                  let status: { priority: 0 | 1 | 2 | 3; errors: string[] } = {
                    priority: 0,
                    errors: [],
                  };
                  if (typeof venue.name == "undefined") {
                    status.priority = 3;
                    status.errors.push("Name is not defined.");
                  }
                  return status;
                }

                function checkPURstatus(venue: any): boolean {
                  if (venue.venueUpdateRequests?.length > 0) {
                    return true;
                  } else {
                    return false;
                  }
                }
              });
              $("#wazemyPlaces_purCount").text(`# PUR = ${purCount}`);
              $("#wazemyPlaces_totalCount").text(`# total = ${totalCount}`);
            },
            onerror: function (response) {
              console.log("onerror");
            },
            onprogress: function (response) {
              console.log("onprogress");
            },
          });
        }
      });
    });
    console.log("[WazeMY] PluginPlaces enabled.");
  }

  /**
   * Disable plugin.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    if ($("span[title='WazeMY Places']").length > 0) {
      W.userscripts.removeSidebarTab("wazemyplaces");
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
    } else {
      this.disable();
    }
    console.log("[WazeMY] PluginPlaces settings updated.", settings);
  }
}
