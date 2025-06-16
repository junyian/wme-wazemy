export default class SettingsStorage {
  private storageKey: string;
  static instance: SettingsStorage;

  /**
   * Initializes a new instance of the SettingsStorage class with the specified storage key.
   *
   * @param {string} storageKey - The key used to store the settings in the local storage.
   */
  constructor(storageKey: string) {
    this.storageKey = storageKey;
  }

  /**
   * Saves the given settings to the local storage.
   *
   * @param {any} settings - The settings to be saved.
   * @return {void} This function does not return anything.
   */
  saveSettings(settings: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }

  /**
   * Loads the settings from the local storage.
   *
   * @return {any} The loaded settings, or null if no settings are found.
   */
  loadSettings(): any {
    const settings = localStorage.getItem(this.storageKey);
    return settings ? JSON.parse(settings) : null;
  }

  /**
   * Updates a specific setting in the local storage.
   *
   * @param {string} key - The key of the setting to update.
   * @param {any} value - The new value for the setting.
   * @return {void} This function does not return anything.
   */
  updateSetting(key: string, value: any): void {
    const settings = this.loadSettings() || {};
    const newKey = Object.keys(value);
    settings[key][newKey[0]] = value[newKey[0]]; // updates existing setting or adds a new one
    this.saveSettings(settings);
  }

  /**
   * Retrieves a specific setting from the local storage.
   *
   * @param {string} key - The key of the setting to retrieve.
   * @return {any} The value of the setting, or null if the setting is not found.
   */
  getSetting(key: string): any {
    const settings = this.loadSettings();
    return settings ? settings[key] : null;
  }

  /**
   * Removes a specific setting from the local storage.
   *
   * @param {string} key - The key of the setting to remove.
   * @return {void} This function does not return anything.
   */
  removeSetting(key: string): void {
    const settings = this.loadSettings();
    if (settings && key in settings) {
      delete settings[key];
      this.saveSettings(settings);
    }
  }
}

SettingsStorage.instance = new SettingsStorage("WME_wazemySettings");
