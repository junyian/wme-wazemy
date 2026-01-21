import { WmeSDK } from "wme-sdk-typings";
import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";

export default class PluginTooltip implements IPlugin {
  private sdk: WmeSDK;
  private currentFeatureId: string | number | null = null;
  private currentLayerName: string | null = null;

  constructor() {
    this.sdk = unsafeWindow.getWmeSdk({
      scriptId: "wme-wazemy-tooltip",
      scriptName: "WazeMY",
    });
    this.initialize();
  }

  /**
   * Initializes the plugin by adding settings into the tab pane, setting the initial state of the settings based on the last stored value, and adding a hidden tooltip window.
   *
   * @return {void} This function does not return anything.
   */
  initialize(): void {
    // Add settings into tab pane.
    const settingsHTML: string = `<input type="checkbox" id="wazemySettings_tooltip_enable"/>
<label for="wazemySettings_tooltip_enable">Enable map tooltip</label>`;
    $("#wazemySettings_settings").append(settingsHTML);

    $("#wazemySettings_tooltip_enable").on("change", () => {
      PluginManager.instance.updatePluginSettings("tooltip", {
        enable: $("#wazemySettings_tooltip_enable").prop("checked"),
      });
    });

    // Set settings according to last stored value.
    const savedSettings: any = SettingsStorage.instance.getSetting("tooltip");
    if (savedSettings?.enable === true) {
      $("#wazemySettings_tooltip_enable").prop("checked", true);
    } else {
      $("#wazemySettings_tooltip_enable").prop("checked", false);
    }

    // Add hidden tooltip window.
    const tooltipHTML = `<div id="wazemyTooltip"></div>`;
    $(document.body).append(tooltipHTML);

    console.log("[WazeMY] PluginTooltip initialized.");
  }

  /**
   * Enables the PluginTooltip by registering the "mousemove" event, showing the tooltip, and logging a message.
   *
   * @return {void} This function does not return anything.
   */
  enable(): void {
    // Track layer events for segments and venues
    this.sdk.Events.trackLayerEvents({
      layerName: "segments",
    });
    this.sdk.Events.trackLayerEvents({
      layerName: "venues",
    });

    // Register handlers for mouse enter/leave events
    this.sdk.Events.on({
      eventName: "wme-layer-feature-mouse-enter",
      eventHandler: this.onFeatureMouseEnter.bind(this),
    });
    this.sdk.Events.on({
      eventName: "wme-layer-feature-mouse-leave",
      eventHandler: this.onFeatureMouseLeave.bind(this),
    });

    // Keep mouse move for positioning updates
    this.sdk.Events.on({
      eventName: "wme-map-mouse-move",
      eventHandler: this.updateTooltipPosition.bind(this),
    });

    $("#wazemyTooltip").show();
    console.log("[WazeMY] PluginTooltip enabled.");
  }

  /**
   * Disables the PluginTooltip by unregistering the "mousemove" event, hiding the tooltip, and logging a message.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    // Stop tracking layer events
    this.sdk.Events.stopLayerEventsTracking({
      layerName: "segments",
    });
    this.sdk.Events.stopLayerEventsTracking({
      layerName: "venues",
    });

    // Unregister event handlers
    this.sdk.Events.off({
      eventName: "wme-layer-feature-mouse-enter",
      eventHandler: this.onFeatureMouseEnter.bind(this),
    });
    this.sdk.Events.off({
      eventName: "wme-layer-feature-mouse-leave",
      eventHandler: this.onFeatureMouseLeave.bind(this),
    });
    this.sdk.Events.off({
      eventName: "wme-map-mouse-move",
      eventHandler: this.updateTooltipPosition.bind(this),
    });

    // Clear current feature state
    this.currentFeatureId = null;
    this.currentLayerName = null;

    $("#wazemyTooltip").hide();
    console.log("[WazeMY] PluginTooltip disabled.");
  }

  /**
   * Updates the settings of the PluginTooltip based on the provided settings object.
   *
   * @param {any} settings - The new settings object.
   * @return {void} This function does not return anything.
   */
  updateSettings(settings: any): void {
    if (settings.enable === true) {
      this.enable();
    } else {
      this.disable();
    }
    console.log("[WazeMY] PluginTooltip settings updated.", settings);
  }

  /**
   * Handles mouse enter event on a feature.
   * Stores the feature ID and layer name for tooltip display.
   *
   * @param {Object} event - The event object containing featureId and layerName.
   * @return {void}
   */
  private onFeatureMouseEnter(event: {
    featureId: string | number;
    layerName: string;
  }): void {
    this.currentFeatureId = event.featureId;
    this.currentLayerName = event.layerName;
  }

  /**
   * Handles mouse leave event on a feature.
   * Clears the stored feature information and hides the tooltip.
   *
   * @return {void}
   */
  private onFeatureMouseLeave(): void {
    this.currentFeatureId = null;
    this.currentLayerName = null;
    $("#wazemyTooltip").css("visibility", "hidden");
  }

  /**
   * Updates the tooltip position and content based on the current hovered feature.
   *
   * @return {void} This function does not return anything.
   */
  private updateTooltipPosition(): void {
    // If no feature is currently hovered, hide tooltip
    if (!this.currentFeatureId || !this.currentLayerName) {
      $("#wazemyTooltip").css("visibility", "hidden");
      return;
    }

    let output: string = "";

    // Build tooltip content based on layer type
    if (this.currentLayerName === "venues") {
      const venue = this.sdk.DataModel.Venues.getById({
        venueId: String(this.currentFeatureId),
      });

      output = venue.name ? `<b>${venue.name}</b><br>` : "";
      output += `<i>[${venue.categories.join(", ")}]</i><br>`;

      const venueAddress = this.sdk.DataModel.Venues.getAddress({
        venueId: String(this.currentFeatureId),
      });
      output += venueAddress.houseNumber ? `${venueAddress.houseNumber}, ` : "";
      output += venueAddress.street?.name
        ? `${venueAddress.street.name}<br>`
        : "";
      if (venueAddress.city?.name && venueAddress.state?.name) {
        output += `${venueAddress.city.name}, ${venueAddress.state.name}<br>`;
      }

      output += `<b>Lock:</b> ${venue.lockRank + 1}`;
    } else if (this.currentLayerName === "segments") {
      const segmentData = this.sdk.DataModel.Segments.getById({
        segmentId: Number(this.currentFeatureId),
      });
      const address = this.sdk.DataModel.Segments.getAddress({
        segmentId: Number(this.currentFeatureId),
      });

      output = address.street?.name ? `<b>${address.street.name}</b><br>` : "";
      const altStreets = address.altStreets;
      for (let i = 0; i < altStreets.length; i++) {
        const altStreetName = altStreets[i].street?.name;
        if (altStreetName) {
          output += `Alt: ${altStreetName}<br>`;
        }
      }
      if (address.city?.name && address.state?.name) {
        output += `${address.city.name}, ${address.state.name}<br>`;
      }
      output += `<b>ID:</b> ${this.currentFeatureId}<br>`;
      if (segmentData.isTwoWay) {
        output += `<b>Direction:</b> Two way<br>`;
      } else if (segmentData.isAtoB) {
        output += `<b>Direction:</b> A -> B<br>`;
      } else if (segmentData.isBtoA) {
        output += `<b>Direction:</b> B -> A<br>`;
      }
      output += `<b>Lock:</b> ${segmentData.lockRank + 1}`;
    }

    // Update tooltip position based on mouse coordinates
    const tooltipDiv = $("#wazemyTooltip");
    const positions: string[] = document
      .querySelector(".wz-map-ol-control-span-mouse-position")
      .innerHTML.split(" ");

    const lat = parseFloat(positions[0]);
    const lon = parseFloat(positions[1]);

    if (lat >= 0 && lon >= 0) {
      const pixel = this.sdk.Map.getPixelFromLonLat({
        lonLat: {
          lat: parseFloat(positions[0]),
          lon: parseFloat(positions[1]),
        },
      });

      const tw = tooltipDiv.innerWidth();
      const th = tooltipDiv.innerHeight();

      let tooltipX = pixel.x + window.scrollX + 15;
      let tooltipY = pixel.y + window.scrollY + 15;

      // Handle cases where tooltip is too near the edge
      const mapElement = this.sdk.Map.getMapViewportElement();
      if (tooltipX + tw > mapElement.offsetWidth) {
        tooltipX -= tw + 20; // 20 = scroll bar size
        if (tooltipX < 0) {
          tooltipX = 0;
        }
      }
      if (tooltipY + th > mapElement.offsetHeight) {
        tooltipY -= th + 20;
        if (tooltipY < 0) {
          tooltipY = 0;
        }
      }

      tooltipDiv.html(output);
      tooltipDiv.css("top", `${tooltipY}px`);
      tooltipDiv.css("left", `${tooltipX}px`);
      tooltipDiv.css("visibility", "visible");
    }
  }
}
