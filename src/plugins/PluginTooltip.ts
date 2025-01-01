import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";

export default class PluginTooltip implements IPlugin {
  constructor() {
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
    WazeWrap.Events.register("mousemove", null, this.showTooltip);
    $("#wazemyTooltip").show();
    console.log("[WazeMY] PluginTooltip enabled.");
  }

  /**
   * Disables the PluginTooltip by unregistering the "mousemove" event, hiding the tooltip, and logging a message.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    WazeWrap.Events.unregister("mousemove", null, this.showTooltip);
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
   * Shows the tooltip at the mouse position.
   *
   * @param {MouseEvent} e - The mouse event.
   * @return {void} This function does not return anything.
   */
  showTooltip(e: MouseEvent): void {
    let output: string = "";
    let showTooltip: boolean = false;

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
        output = `<b>${landmark.attributes.wazeFeature._wmeObject.attributes.name}</b><br>`;

        const categories =
          landmark.attributes.wazeFeature._wmeObject.getCategories();
        output += `<i>[${categories.join(", ")}]</i><br>`;

        const address = landmark.attributes.wazeFeature._wmeObject.getAddress();
        try {
          output += address.getHouseNumber()
            ? `${address.getHouseNumber()}, `
            : "";
          output += address.getStreetName()
            ? `${address.getStreetName()}<br>`
            : `No street<br>`;
          output += `${address.getCityName()}, `;
          output += `${address.getStateName()}<br>`;
        } catch {
          output += "No address<br>";
        }
        output += `<b>Lock:</b> ${landmark.attributes.wazeFeature._wmeObject.getLockRank() + 1}`;
        showTooltip = true;
      } else if (segment) {
        const segmentId = segment.attributes.wazeFeature.id;
        const address = segment.attributes.wazeFeature._wmeObject.getAddress();
        output = `<b>${address.getStreetName()}</b><br>`;
        const altStreets = address.getAltStreets();
        for (let i = 0; i < altStreets.length; i++) {
          const altStreetName = altStreets[i].getStreetName();
          output += `Alt: ${altStreetName}<br>`;
        }
        output += `${address.getCityName()}, ${address.getStateName()}<br>`;
        output += `<b>ID:</b> ${segmentId}<br>`;
        output += `<b>Lock:</b> ${segment.attributes.wazeFeature._wmeObject.getLockRank() + 1}`;
        showTooltip = true;
      }

      const tooltipDiv = $("#wazemyTooltip");
      if (showTooltip === true) {
        const tw = tooltipDiv.innerWidth();
        const th = tooltipDiv.innerHeight();
        let tooltipX = e.clientX + window.scrollX + 15;
        let tooltipY = e.clientY + window.scrollY + 15;
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
      } else {
        tooltipDiv.css("visibility", "hidden");
      }
    }
  }
}
