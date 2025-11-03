import "./style/main.less";
import PluginManager from "./PluginManager";
import { WmeSDK } from "wme-sdk-typings";

const updateMessage: string = `Version 2025.11.03.1: Migrated PluginPlaces sidebar tabs to WME SDK for improved compatibility.`;

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
        </div>
      `;
      WazeWrap.Interface.ShowScriptUpdate(
        "WME WazeMY",
        GM_info.script.version,
        updateMessage,
        "https://greasyfork.org/en/scripts/404584-wazemy",
        "javascript:alert('No forum available');",
      );
      const pluginManager = PluginManager.instance;

      pluginManager.addPlugin("copylatlon", "PluginCopyLatLon");
      pluginManager.addPlugin("tooltip", "PluginTooltip");
      pluginManager.addPlugin("trafcam", "PluginTrafficCameras");
      pluginManager.addPlugin("kvmr", "PluginKVMR");
      pluginManager.addPlugin("zoompic", "PluginZoomPic");
      pluginManager.addPlugin("places", "PluginPlaces");
      pluginManager.addPlugin("gemini", "PluginGemini");
    },
  );
}
