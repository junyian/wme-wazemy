import IPlugin from "./IPlugin";
import PluginTooltip from "./plugins/PluginTooltip";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";
import PluginTrafficCameras from "./plugins/PluginTrafficCameras";
import PluginKVMR from "./plugins/PluginKVMR";
import PluginZoomPic from "./plugins/PluginZoomPic";
import PluginPlaces from "./plugins/PluginPlaces";

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
            "lutfi_bihar",
            "DINKAFTAC",
            "dinohoo",
            "inyshen",
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
            "hooijack",
            "zumaidi",
            "godericbal",
            "TinyWizard",
            "bayau72",
            "jayleongwk",
            "jessteepy",
            "kadyus",
            "beliamuda",
            "damaultz",
            "dckj",
            "kweeheng",
          ].includes(WazeWrap.User.Username())
        ) {
          return new PluginKVMR();
        } else {
          console.log(`Plugin not created: ${pluginName}`);
          return null;
        }
      case "PluginZoomPic":
        return new PluginZoomPic();
      case "PluginPlaces":
        return new PluginPlaces();
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
