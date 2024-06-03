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
          ["junyianl", "EpailXi", "paulkok_my", "CoolCityCat"].includes(
            WazeWrap.User.Username(),
          )
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
