import IPlugin from "./IPlugin";
import PluginTooltip from "./plugins/PluginTooltip";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";
import PluginTrafficCameras from "./plugins/PluginTrafficCameras";
import PluginKVMR from "./plugins/PluginKVMR";
import PluginZoomPic from "./plugins/PluginZoomPic";
import PluginPlaces from "./plugins/PluginPlaces";
import { WmeSDK } from "wme-sdk-typings";

export default class PluginFactory {
  static createPlugin(pluginName: string, sdk: WmeSDK): IPlugin {
    switch (pluginName) {
      case "PluginTooltip":
        return new PluginTooltip();
      case "PluginCopyLatLon":
        return new PluginCopyLatLon(sdk);
      case "PluginTrafficCameras":
        return new PluginTrafficCameras();
      case "PluginKVMR":
        return new PluginKVMR();
      case "PluginZoomPic":
        return new PluginZoomPic();
      case "PluginPlaces":
        return new PluginPlaces();
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
