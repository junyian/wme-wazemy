import "./style/main.less";
import PluginManager from "./PluginManager";
import { WmeSDK } from "wme-sdk-typings";

const updateMessage = `Port script to WME SDK.`;

var sdk: WmeSDK;

async function main() {
  console.log("[WazeMY] Script started");
  unsafeWindow.SDK_INITIALIZED.then(initScript);
}

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

async function initializeWazeMY() {
  console.log("[WazeMY] WME ready");

  sdk.Sidebar.registerScriptTab().then(
    (sidebarResult: RegisterSidebarTabResult) => {
      sidebarResult.tabLabel.innerHTML = "WazeMY";
      sidebarResult.tabLabel.title = "WazeMY";
      sidebarResult.tabPane.innerHTML = `<div>
        <h4>WazeMY</h4>
        <b>${GM_info.script.version}</b>
        </div>
        <fieldset class="wazemySettings">
        <legend class="wazemySettingsLegend">
          <h6>Settings</h6></legend>
        <div id="wazemySettings_settings"></div>
        </fieldset>
        <fieldset class="wazemySettings">
        <legend class="wazemySettingsLegend">
        <h6>Shortcuts</h6></legend>
        <div id="wazemySettings_shortcuts">
        </div>
        </fieldset>`;
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
    },
  );
}

main().catch((e) => {
  console.log("WazeMY: Bootstrap");
  console.log(e);
});
