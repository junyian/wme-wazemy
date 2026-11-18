import "./style/main.less";
import PluginManager from "./PluginManager";
import SettingsStorage from "./SettingsStorage";
import { WmeSDK } from "wme-sdk-typings";

const updateMessage: string = `Version 2026.11.18.1: Added a Reset Settings button to clear stored settings left over from older versions.`;

var sdk: WmeSDK;

console.log("[WazeMY] Script started");
unsafeWindow.SDK_INITIALIZED.then(initScript);

function initScript() {
  if (!unsafeWindow.getWmeSdk) {
    throw new Error("WME SDK not available");
  }
  sdk = unsafeWindow.getWmeSdk({
    scriptId: "wme-wazemy",
    scriptName: "WazeMY",
  });

  sdk.Events.once({ eventName: "wme-ready" }).then(initializeWazeMY);
}

function initializeWazeMY() {
  console.log("[WazeMY] WME ready");

  if (WazeWrap && WazeWrap.Ready) {
    WazeWrap.Alerts.success("wme-wazemy", "Script initialized");
  }

  sdk.Sidebar.registerScriptTab().then(
    (sidebarResult: RegisterSidebarTabResult) => {
      sidebarResult.tabLabel.innerHTML = "WazeMY";
      sidebarResult.tabLabel.title = "WazeMY";
      sidebarResult.tabPane.innerHTML = `
        <wz-section-header headline="WazeMY" size="section-header2" class="settings-header">
          <wz-overline class="headline">WazeMY</wz-overline>
        </wz-section-header>
        <wz-overline class="headline">${GM_info.script.version}</wz-overline>
        <div class="settings">
          <div class="settings__form-group">
            <fieldset class="wazemySettings">
              <legend class="wazemySettingsLegend">
                <wz-label>Settings</wz-label>
              </legend>
              <div id="wazemySettings_settings"></div>
            </fieldset>
          </div>
          <div class="settings__form-group">
            <fieldset class="wazemySettings">
              <legend class="wazemySettingsLegend">
                <wz-label>Shortcuts</wz-label>
              </legend>
              <div id="wazemySettings_shortcuts"></div>
            </fieldset>
          </div>
          <div class="settings__form-group">
            <fieldset class="wazemySettings">
              <legend class="wazemySettingsLegend">
                <wz-label>Gemini</wz-label>
              </legend>
              <div id="wazemySettings_gemini"></div>
            </fieldset>
          </div>
          <div class="settings__form-group">
            <fieldset class="wazemySettings">
              <legend class="wazemySettingsLegend">
                <wz-label>Reset</wz-label>
              </legend>
              <div id="wazemySettings_reset">
                <wz-button id="wazemySettings_resetButton" color="secondary" size="sm">
                  Reset all settings
                </wz-button>
                <div style="font-size: 10px; margin-top: 5px;">
                  Clears all stored WazeMY settings (including the Gemini API key) and reloads the page.
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      `;
      WazeWrap.Interface.ShowScriptUpdate(
        "WME WazeMY",
        GM_info.script.version,
        updateMessage,
        "https://greasyfork.org/en/scripts/404584-wazemy",
        "javascript:alert('No forum available');",
      );
      console.info(["wme-wazemy", updateMessage]);

      $("#wazemySettings_resetButton").on("click", () => {
        const confirmed = confirm(
          "Reset all WazeMY settings to defaults?\n\nThis also removes the saved Gemini API key. The page will reload.",
        );
        if (!confirmed) return;
        SettingsStorage.instance.clearSettings();
        console.log("[WazeMY] Settings reset");
        location.reload();
      });

      const pluginManager = PluginManager.instance;

      pluginManager.addPlugin("copylatlon", "PluginCopyLatLon");
      pluginManager.addPlugin("tooltip", "PluginTooltip");
      pluginManager.addPlugin("trafcam", "PluginTrafficCameras");
      pluginManager.addPlugin("kvmr", "PluginKVMR");
      pluginManager.addPlugin("zoompic", "PluginZoomPic");
      pluginManager.addPlugin("places", "PluginPlaces");
      pluginManager.addPlugin("urs", "PluginURs");
      pluginManager.addPlugin("gemini", "PluginGemini");
    },
  );
}
