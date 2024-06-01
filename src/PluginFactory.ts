import IPlugin from "./IPlugin";

export default class PluginFactory {
  static createPlugin(pluginName: string): IPlugin {
    switch (pluginName) {
      default:
        throw new Error(`Unknown plugin: ${pluginName}`);
    }
  }
}
