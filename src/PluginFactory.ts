import IPlugin from "./IPlugin";
import PluginTooltip from "./plugins/PluginTooltip";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";
import PluginTrafficCameras from "./plugins/PluginTrafficCameras";

export default class PluginFactory {
  static createPlugin(pluginName: string): IPlugin {
    switch (pluginName) {
      case "PluginTooltip":
        return new PluginTooltip();
      case "PluginCopyLatLon":
        return new PluginCopyLatLon();
      case "PluginTrafficCameras":
        return new PluginTrafficCameras();
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
