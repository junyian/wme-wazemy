import { WmeSDK } from "wme-sdk-typings";
import IPlugin from "./IPlugin";
import PluginFactory from "./PluginFactory";
import SettingsStorage from "./SettingsStorage";

export default class PluginManager {
  private plugins: { [key: string]: IPlugin } = {};
  private settingsStorage: SettingsStorage;
  private layerRegistry: Map<string, any> = new Map();
  static instance: PluginManager;

  constructor(settings: SettingsStorage) {
    this.settingsStorage = settings;
  }

  /**
   * Adds a plugin to the PluginManager.
   *
   * @param {string} key - The key to associate the plugin with.
   * @param {string} type - The type of plugin to create.
   * @return {void} This function does not return anything.
   */
  addPlugin(key: string, type: string): void {
    const plugin = PluginFactory.createPlugin(type);
    this.plugins[key] = plugin;
    const pluginSettings = this.settingsStorage.getSetting(key);

    if (pluginSettings) {
      plugin.updateSettings(pluginSettings);
    }
  }

  /**
   * Removes a plugin from the PluginManager.
   *
   * @param {string} key - The key associated with the plugin to remove.
   * @return {void} This function does not return anything.
   */
  removePlugin(key: string): void {
    if (this.plugins[key]) {
      this.settingsStorage.removeSetting(key);
      delete this.plugins[key];
    }
  }

  /**
   * Enables a plugin with the given key if it exists.
   *
   * @param {string} key - The key of the plugin to enable.
   * @return {void} This function does not return anything.
   */
  public enablePlugin(key: string): void {
    if (this.plugins[key]) {
      this.plugins[key].enable();
    }
  }

  /**
   * Disables a plugin with the given key if it exists.
   *
   * @param {string} key - The key of the plugin to disable.
   * @return {void} This function does not return anything.
   */
  public disablePlugin(key: string): void {
    if (this.plugins[key]) {
      this.plugins[key].disable();
    }
  }

  /**
   * Updates the settings of a plugin associated with the given key.
   *
   * @param {string} key - The key associated with the plugin.
   * @param {any} settings - The new settings to be applied to the plugin.
   * @return {void} This function does not return anything.
   */
  public updatePluginSettings(key: string, settings: any): void {
    if (this.plugins[key]) {
      this.plugins[key].updateSettings(settings);
      this.settingsStorage.updateSetting(key, settings);
    }
  }

  /**
   * Registers a layer in the layer registry for cross-plugin access.
   *
   * @param {string} name - The unique name of the layer.
   * @param {any} layer - The layer object to register.
   * @return {void} This function does not return anything.
   */
  public registerLayer(name: string, layer: any): void {
    this.layerRegistry.set(name, layer);
  }

  /**
   * Retrieves a layer from the layer registry.
   *
   * @param {string} name - The unique name of the layer.
   * @return {any} The layer object, or undefined if not found.
   */
  public getLayer(name: string): any {
    return this.layerRegistry.get(name);
  }
}

PluginManager.instance = new PluginManager(SettingsStorage.instance);
