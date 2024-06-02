import IPlugin from "./IPlugin";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";

export default class PluginFactory {
  static createPlugin(pluginName: string): IPlugin {
    switch (pluginName) {
      case "PluginCopyLatLon":
        return new PluginCopyLatLon();
        break;
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
