import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";
import { WmeSDK, MapUpdateRequest } from "wme-sdk-typings";
import { formatRelativeTime, formatFullDate } from "../utils/dateUtils";

export default class PluginURs implements IPlugin {
  private sdk: WmeSDK;
  private sidebarElements: {
    tabLabel: HTMLElement;
    tabPane: HTMLElement;
  } | null = null;
  private mapDataLoadedHandler: (() => void) | null = null;

  private tabHTML: string = `
    <div><h4>WazeMY URs</h4></div>
    <div id="wazemyURs">
      <button id="wazemyURs_refresh">Refresh</button>
      <div id="wazemyURs_status"></div>
      <div id="wazemyURs_count"></div>
      <div id="wazemyURs_table">
      <table id="wazemyURs_list">
        <thead>
          <tr>
            <th>Type</th>
            <th>Sev</th>
            <th>Reported</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      </div>
    </div>
  `;

  constructor() {
    this.sdk = unsafeWindow.getWmeSdk({
      scriptId: "wme-wazemy-urs",
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
    const settingsHTML: string = `<div><input type="checkbox" id="wazemySettings_urs_enable"/>
      <label for="wazemySettings_urs_enable">Enable URs Panel</label></div>`;
    $("#wazemySettings_settings").append(settingsHTML);

    $("#wazemySettings_urs_enable").on("change", () => {
      PluginManager.instance.updatePluginSettings("urs", {
        enable: $("#wazemySettings_urs_enable").prop("checked"),
      });
    });

    // Set settings according to last stored value.
    const savedSettings: any = SettingsStorage.instance.getSetting("urs");
    if (savedSettings?.enable === true) {
      $("#wazemySettings_urs_enable").prop("checked", true);
    } else {
      $("#wazemySettings_urs_enable").prop("checked", false);
    }
    console.log("[WazeMY] PluginURs initialized.");
  }

  /**
   * Enable plugin.
   *
   * @return {void} This function does not return anything.
   */
  enable(): void {
    this.sdk.Sidebar.registerScriptTab().then((sidebarResult) => {
      this.sidebarElements = sidebarResult;

      sidebarResult.tabLabel.innerHTML = "WazeMY URs";
      sidebarResult.tabLabel.title = "WazeMY URs";
      sidebarResult.tabPane.innerHTML = this.tabHTML;

      // Handle Refresh button.
      $("#wazemyURs_refresh").on("click", () => {
        this.refreshURList();
      });

      // Auto-refresh on map data loaded.
      this.mapDataLoadedHandler = () => {
        this.refreshURList();
      };
      this.sdk.Events.on({
        eventName: "wme-map-data-loaded",
        eventHandler: this.mapDataLoadedHandler,
      });

      // Initial load
      this.refreshURList();

      console.log("[WazeMY] PluginURs enabled.");
    });
  }

  /**
   * Refresh the UR list with current data.
   */
  private refreshURList(): void {
    $("#wazemyURs_status").text("Loading URs...");
    $("#wazemyURs_list > tbody").empty();

    const allURs: MapUpdateRequest[] =
      this.sdk.DataModel.MapUpdateRequests.getAll();

    // Filter to only editable URs
    const editableURs = allURs.filter((ur) => ur.isEditable);

    // Sort by reportedOn descending (newest first)
    editableURs.sort((a, b) => b.reportedOn - a.reportedOn);

    let count = 0;

    editableURs.forEach((ur: MapUpdateRequest) => {
      const row = $("<tr>");
      row.attr("data-ur-id", ur.id.toString());
      row.addClass("wazemyURs_row");

      // Store geometry for click handler
      const lon = ur.geometry.coordinates[0];
      const lat = ur.geometry.coordinates[1];
      row.attr("data-lon", lon.toString());
      row.attr("data-lat", lat.toString());

      row.on("click", () => {
        this.sdk.Map.setMapCenter({
          lonLat: { lon, lat },
        });
      });

      // Type column - format the type name
      const typeFormatted = this.formatURType(ur.updateRequestType);
      const typeHTML = `<td title="${ur.updateRequestType}">${typeFormatted}</td>`;
      row.append(typeHTML);

      // Severity column with color coding
      const severityClass = `wazemyURs_severity_${ur.severity}`;
      const severityHTML = `<td class="${severityClass}">${ur.severity.charAt(0).toUpperCase()}</td>`;
      row.append(severityHTML);

      // Reported date column
      const relativeTime = formatRelativeTime(ur.reportedOn);
      const fullDate = formatFullDate(ur.reportedOn);
      const reportedHTML = `<td title="${fullDate}">${relativeTime}</td>`;
      row.append(reportedHTML);

      // Status column
      const status = ur.isOpen ? "Open" : "Closed";
      const statusHTML = `<td>${status}</td>`;
      row.append(statusHTML);

      $("#wazemyURs_list > tbody").append(row);
      count++;
    });

    $("#wazemyURs_count").text(`Editable URs: ${count}`);
    $("#wazemyURs_status").text("");
  }

  /**
   * Format the UR type for display.
   */
  private formatURType(type: string): string {
    const typeMap: Record<string, string> = {
      BLOCKED_ROAD: "Blocked",
      INCORRECT_ADDRESS: "Address",
      INCORRECT_GENERAL_ERROR: "General",
      INCORRECT_JUNCTION: "Junction",
      INCORRECT_MISSING_ROUNDABOUT: "Roundabout",
      INCORRECT_ROUTE: "Route",
      INCORRECT_TURN: "Turn",
      MISSING_BRIDGE_OVERPASS: "Bridge",
      MISSING_EXIT: "Exit",
      MISSING_ROAD: "Missing Rd",
      TURN_NOT_ALLOWED: "No Turn",
      WRONG_DRIVING_DIRECTIONS: "Directions",
    };
    return typeMap[type] || type;
  }

  /**
   * Disable plugin.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    // Remove event handler
    if (this.mapDataLoadedHandler) {
      this.sdk.Events.off({
        eventName: "wme-map-data-loaded",
        eventHandler: this.mapDataLoadedHandler,
      });
      this.mapDataLoadedHandler = null;
    }

    if (this.sidebarElements) {
      this.sidebarElements.tabLabel.remove();
      this.sidebarElements.tabPane.remove();
      this.sidebarElements = null;
    }
    console.log("[WazeMY] PluginURs disabled.");
  }

  /**
   * Updates the settings of the PluginURs based on the provided settings object.
   *
   * @return {void} This function does not return anything.
   */
  updateSettings(settings: any): void {
    if (settings.enable === true) {
      this.enable();
    } else {
      this.disable();
    }
    console.log("[WazeMY] PluginURs settings updated.", settings);
  }
}
