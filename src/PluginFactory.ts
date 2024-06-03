import IPlugin from "./IPlugin";
import PluginTooltip from "./plugins/PluginTooltip";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";
import PluginTrafficCameras from "./plugins/PluginTrafficCameras";
import PluginKVMR from "./plugins/PluginKVMR";

export default class PluginFactory {
  static createPlugin(pluginName: string): IPlugin {
    switch (pluginName) {
      case "PluginTooltip":
        return new PluginTooltip();
      case "PluginCopyLatLon":
        return new PluginCopyLatLon();
      case "PluginTrafficCameras":
        return new PluginTrafficCameras();
      case "PluginKVMR":
        if (
          [
            "rickylo103",
            "EpailXi",
            "lufti_bihar",
            "DINKAFTAC",
            "dinohoo",
            "Inyshen",
            "RapidGod",
            "omegahawk",
            "firman_bakti",
            "junyianl",
            "apis_",
            "izuaniz",
            "paulkok_my",
            "CoolCityCat",
            "Somebal",
            "james890526",
            "pamyskywalker",
            "Hooijack",
            "zumaidi",
            "godericbal",
            "TinyWizard",
            "bayau72",
            "jayleongwk",
            "jessteepy",
          ].includes(WazeWrap.User.Username())
        ) {
          return new PluginKVMR();
        } else {
          console.log(`Plugin not created: ${pluginName}`);
          return null;
        }
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
