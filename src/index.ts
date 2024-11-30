import "./style/main.less";
import PluginManager from "./PluginManager";

const updateMessage = `PluginZoomPic: Fix broken link after WME update.`;

async function main() {
  console.log("[WazeMY] Script started");
  document.addEventListener("wme-ready", initializeWazeMY, { once: true });
}

async function initializeWazeMY() {
  console.log("[WazeMY] WME ready");

  const { tabLabel, tabPane } = W.userscripts.registerSidebarTab("wazemy");
  tabLabel.innerHTML = "WazeMY";
  tabLabel.title = "WazeMY";
  tabPane.innerHTML = `<div>
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
}

main().catch((e) => {
  console.log("WazeMY: Bootstrap");
  console.log(e);
});
