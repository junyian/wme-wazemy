import "./style/main.less";
import PluginManager from "./PluginManager";

const updateMessage = `Complete rewrite of the WazeMY script to TypeScript.<br>
  Bugfixes:<br>
  <ul>
    <li>Tooltip is not removed when feature is disabled via settings.</li>
  </ul>
  Improvements:<br>
  <ul>
    <li>Modernized the copy of lat/lon method.</li>
  </ul>
  Todo:<br>
  <ul>
    <li>Picture zoom in.</li>
  </ul>`;
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
<fieldset id="wazemySettings" style="border: 1px solid silver; padding: 8px; border-radius: 4px;">
  <legend style="margin-bottom:0px; border-bottom-style:none;width:auto;">
    <h6>Settings</h6></legend>
  <div id="wazemySettings_settings"></div>
</fieldset>
<fieldset style="border: 1px solid silver; padding: 8px; border-radius: 4px;">
  <legend style="margin-bottom:0px; border-bottom-style:none;width:auto;">
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
}

main().catch((e) => {
  console.log(e);
});
