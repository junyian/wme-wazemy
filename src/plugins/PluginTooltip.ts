import { WmeSDK } from "wme-sdk-typings";
import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";

export default class PluginTooltip implements IPlugin {
  private sdk: WmeSDK;

  constructor() {
    this.sdk = unsafeWindow.getWmeSdk({
      scriptId: "wme-wazemy-tooltip",
      scriptName: "WazeMY"
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
    // WazeWrap.Events.register("mousemove", null, this.showTooltip.bind(this));
    this.sdk.Events.on({
      eventName: "wme-map-mouse-move",
      eventHandler: showTooltip,
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
    // WazeWrap.Events.unregister("mousemove", null, this.showTooltip);
    this.sdk.Events.off({
      eventName: "wme-map-mouse-move",
      eventHandler: showTooltip,
    });
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
}

/**
   * Shows the tooltip at the mouse position.
   *
   * @return {void} This function does not return anything.
   */
function showTooltip(): void {
  let output: string = "";
  let showTooltip: boolean = false;
  const sdk = unsafeWindow.getWmeSdk({
    scriptId: "wme-wazemy",
    scriptName: "WazeMY",
  });

  // Manual check of settings because unregistering event is not working.
  if ($("#wazemySettings_tooltip_enable").prop("checked") === true) {
    const landmark = W.map.venueLayer.getFeatureBy(
      "renderIntent",
      "highlight",
    );

    const segment = W.map.segmentLayer.getFeatureBy(
      "renderIntent",
      "highlight",
    );
    if (landmark) {
      const venue = sdk.DataModel.Venues.getById({ venueId: landmark.attributes.wazeFeature.id });

      output = venue.name ? `<b>${venue.name}</b><br>` : "";

      output += `<i>[${venue.categories.join(", ")}]</i><br>`;

      const venueAddress = sdk.DataModel.Venues.getAddress({ venueId: landmark.attributes.wazeFeature.id });
      output += venueAddress.houseNumber ? `${venueAddress.houseNumber}, ` : "";
      output += venueAddress.street.name ? `${venueAddress.street.name}<br>` : "";
      output += `${venueAddress.city.name}, ${venueAddress.state.name}<br>`;

      output += `<b>Lock:</b> ${venue.lockRank + 1}`;
      showTooltip = true;
    } else if (segment) {
      const segmentId = segment.attributes.wazeFeature.id;
      const segmentData = sdk.DataModel.Segments.getById({ segmentId: segmentId });
      const address = sdk.DataModel.Segments.getAddress({ segmentId: segmentId });

      output = address.street.name ? `<b>${address.street.name}</b><br>` : "";
      const altStreets = address.altStreets;
      for (let i = 0; i < altStreets.length; i++) {
        const altStreetName = altStreets[i].street.name;
        output += `Alt: ${altStreetName}<br>`;
      }
      output += `${address.city.name}, ${address.state.name}<br>`;
      output += `<b>ID:</b> ${segmentId}<br>`;
      if (segmentData.isTwoWay) {
        output += `<b>Direction:</b> Two way<br>`;
      } else if (segmentData.isAtoB) {
        output += `<b>Direction:</b> A -> B<br>`;
      } else if (segmentData.isBtoA) {
        output += `<b>Direction:</b> B -> A<br>`;
      }
      output += `<b>Lock:</b> ${segmentData.lockRank + 1}`;
      showTooltip = true;
    }

    const tooltipDiv = $("#wazemyTooltip");
    if (showTooltip === true) {
      let positions: string[] = [];

      positions = document
        .querySelector(".wz-map-ol-control-span-mouse-position")
        .innerHTML.split(" ");

      const lat = parseFloat(positions[0]);
      const lon = parseFloat(positions[1]);

      if (lat >= 0 && lon >= 0) {
        let pixel = sdk.Map.getPixelFromLonLat({
          lonLat: {
            lat: parseFloat(positions[0]),
            lon: parseFloat(positions[1]),
          },
        });

        const tw = tooltipDiv.innerWidth();
        const th = tooltipDiv.innerHeight();

        let tooltipX = pixel.x + window.scrollX + 15;
        let tooltipY = pixel.y + window.scrollY + 15;

        // Handle cases where tooltip is too near the edge.
        if (tooltipX + tw > W.map.$map.innerWidth()) {
          tooltipX -= tw + 20; // 20 = scroll bar size
          if (tooltipX < 0) {
            tooltipX = 0;
          }
        }
        if (tooltipY + th > W.map.$map.innerHeight()) {
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
    } else {
      tooltipDiv.css("visibility", "hidden");
    }
  }
}


