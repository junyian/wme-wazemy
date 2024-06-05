import IPlugin from "../IPlugin";

export default class PluginZoomPic implements IPlugin {
  constructor() {
    this.initialize();
  }

  /**
   * Initialize plugin.
   *
   * @return {void} This function does not return anything.
   */
  initialize(): void {
    $(document.body).on("click", () => {
      const img = $(
        "div.modal-dialog.venue-image-dialog > div > div.modal-body > img",
      );
      if (img.length > 0) {
        const newImg = img[0] as HTMLImageElement;

        const links: JQuery<HTMLElement> = $(
          "div.modal-dialog.venue-image-dialog > div > div.modal-header > a",
        );
        for (let i = 0; i < links.length; i++) {
          links[i].remove();
        }
        const newImgHTML = `<a href="${newImg.src.replace("thumbs/thumb700_", "")}" target="_blank">(+)</a>`;
        $(
          "div.modal-dialog.venue-image-dialog > div > div.modal-header",
        ).append(newImgHTML);
      }
      $("div.modal-dialog.venue-image-dialog");
    });
    console.log("[WazeMY] PluginZoomPic initialized.");
  }

  /**
   * Enable plugin.
   *
   * @return {void} This function does not return anything.
   */
  enable(): void {
    console.log("[WazeMY] PluginZoomPic enabled.");
  }

  /**
   * Disable plugin.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    console.log("[WazeMY] PluginZoomPic disabled.");
  }

  /**
   * Updates the settings of the PluginZoomPic based on the provided settings object.
   *
   * @return {void} This function does not return anything.
   */
  updateSettings(settings: any): void {
    console.log("[WazeMY] PluginZoomPic settings updated.", settings);
  }

  /**
   * Copies lat/lon of mouse position to clipboard.
   *
   * @return {void} This function does not return anything.
   */
}
