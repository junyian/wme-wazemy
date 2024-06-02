import IPlugin from "../IPlugin";

export default class PluginCopyLatLon implements IPlugin {
  constructor() {
    this.initialize();
  }
  initialize(): void {
    const settingsHTML = `<div>Ctrl+Alt+C: <i>Copy lat/lon of mouse position to clipboard.</i></div>`;
    $("#wazemySettings_shortcuts").append(settingsHTML);

    this.enable(); // Manually enable plugin since there is no settings to trigger this.

    console.log("[WazeMY] PluginCopyLatLon initialized.");
  }

  enable(): void {
    new WazeWrap.Interface.Shortcut(
      "WazeMY_latloncopy",
      "Copies lat/lon of mouse position to clipboard.",
      "wazemy",
      "WazeMY",
      "CA+c",
      this.copyLatLon,
      null,
    ).add();
    console.log("[WazeMY] PluginCopyLatLon enabled.");
  }

  disable(): void {
    console.log("[WazeMY] PluginCopyLatLon disabled.");
  }

  updateSettings(settings: any): void {
    console.log("[WazeMY] PluginCopyLatLon settings updated.", settings);
  }

  copyLatLon(): void {
    const latlon = $(".wz-map-ol-control-span-mouse-position").text();
    navigator.clipboard.writeText(latlon);
  }
}
