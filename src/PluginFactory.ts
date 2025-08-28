import IPlugin from "./IPlugin";
import PluginTooltip from "./plugins/PluginTooltip";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";
import PluginTrafficCameras from "./plugins/PluginTrafficCameras";
import PluginKVMR from "./plugins/PluginKVMR";
import PluginZoomPic from "./plugins/PluginZoomPic";
import PluginPlaces from "./plugins/PluginPlaces";
import PluginGemini from "./plugins/PluginGemini";

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
        return new PluginKVMR();
      case "PluginZoomPic":
        return new PluginZoomPic();
      case "PluginPlaces":
        return new PluginPlaces();
      case "PluginGemini":
        return new PluginGemini();
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
