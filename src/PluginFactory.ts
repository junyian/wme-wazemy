import IPlugin from "./IPlugin";
import PluginTooltip from "./plugins/PluginTooltip";
import PluginCopyLatLon from "./plugins/PluginCopyLatLon";

export default class PluginFactory {
  static createPlugin(pluginName: string): IPlugin {
    switch (pluginName) {
      case "PluginTooltip":
        return new PluginTooltip();
      case "PluginCopyLatLon":
        return new PluginCopyLatLon();
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
