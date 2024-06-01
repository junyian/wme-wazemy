export default interface Plugin {
  initialize(): void; // initialize settings, hidden windows, etc.
  enable(): void; // enable plugin when detected from settings
  disable(): void; // disable plugin when detected from settings
  updateSettings(settings: any): void;
}
