import IPlugin from "../IPlugin";

export default class PluginZoomPic implements IPlugin {
  private currentBlobUrl: string | null = null;

  constructor() {
    this.initialize();
  }

  /**
   * Initialize plugin.
   *
   * @return {void} This function does not return anything.
   */
  initialize(): void {
    this.createPopupContainer();
    this.setupPopupHandlers();

    $(document.body).on("click", () => {
      const img = $(".venue-image-dialog > wz-dialog-content > img");
      if (img.length > 0) {
        const newImg = img[0] as HTMLImageElement;

        // Remove existing zoom links
        const links: JQuery<HTMLElement> = $(
          ".venue-image-dialog > wz-dialog-header > #zoomPicLink",
        );
        for (let i = 0; i < links.length; i++) {
          links[i].remove();
        }

        // Add clickable span that fetches and displays image in popup
        const newImgHTML = `<span id="zoomPicLink" style="cursor:pointer; color:blue; text-decoration:underline;">(+)</span>`;
        $(".venue-image-dialog > wz-dialog-header").append(newImgHTML);

        $("#zoomPicLink").on("click", (e) => {
          e.stopPropagation();
          const fullSizeUrl = newImg.src.replace("thumbs/thumb700_", "");
          this.fetchAndDisplayImage(fullSizeUrl);
        });
      }
    });
    console.log("[WazeMY] PluginZoomPic initialized.");
  }

  /**
   * Create the popup container for displaying full-size images.
   */
  private createPopupContainer(): void {
    const popupHTML = `<div id="gmPopupContainerZoomPic" style="display:none; position:fixed; z-index:10001; background:#fff; border:2px solid #333; border-radius:5px; padding:5px; cursor:move; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
      <div style="text-align:right; margin-bottom:5px;">
        <span id="zoomPicClose" style="cursor:pointer; font-weight:bold; padding:0 5px;">[X]</span>
      </div>
      <div id="zoomPicLoading" style="display:none; padding:20px; text-align:center;">Loading...</div>
      <img id="zoomPicImage" style="max-width:90vw; max-height:85vh; display:block;">
    </div>`;
    document.body.insertAdjacentHTML("afterbegin", popupHTML);
  }

  /**
   * Setup event handlers for popup close and drag functionality.
   */
  private setupPopupHandlers(): void {
    const popup = document.getElementById("gmPopupContainerZoomPic");
    const closeBtn = document.getElementById("zoomPicClose");

    // Close button handler
    closeBtn?.addEventListener("click", () => {
      this.closePopup();
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && popup?.style.display === "block") {
        this.closePopup();
      }
    });

    // Drag functionality
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    popup?.addEventListener("mousedown", (e) => {
      const target = e.target as HTMLElement;
      // Don't drag if clicking on close button or image
      if (target.id === "zoomPicClose" || target.id === "zoomPicImage") return;

      isDragging = true;
      offsetX = e.clientX - popup.offsetLeft;
      offsetY = e.clientY - popup.offsetTop;
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging || !popup) return;
      popup.style.left = e.clientX - offsetX + "px";
      popup.style.top = e.clientY - offsetY + "px";
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  }

  /**
   * Close the popup and cleanup blob URL.
   */
  private closePopup(): void {
    const popup = document.getElementById("gmPopupContainerZoomPic");
    const imgEl = document.getElementById("zoomPicImage") as HTMLImageElement;

    if (popup) {
      popup.style.display = "none";
    }

    // Revoke blob URL to free memory
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }

    if (imgEl) {
      imgEl.src = "";
    }
  }

  /**
   * Fetch image via GM_xmlhttpRequest and display in popup.
   */
  private fetchAndDisplayImage(url: string): void {
    const popup = document.getElementById("gmPopupContainerZoomPic");
    const imgEl = document.getElementById("zoomPicImage") as HTMLImageElement;
    const loadingEl = document.getElementById("zoomPicLoading");

    if (!popup || !imgEl) return;

    // Show popup with loading indicator
    popup.style.display = "block";
    popup.style.left = "50px";
    popup.style.top = "50px";

    if (loadingEl) loadingEl.style.display = "block";
    imgEl.style.display = "none";

    // Cleanup previous blob URL if exists
    if (this.currentBlobUrl) {
      URL.revokeObjectURL(this.currentBlobUrl);
      this.currentBlobUrl = null;
    }

    GM_xmlhttpRequest({
      method: "GET",
      responseType: "blob",
      url: url,
      onload: (response) => {
        if (loadingEl) loadingEl.style.display = "none";
        imgEl.style.display = "block";

        // Create blob URL - this works regardless of server MIME type
        this.currentBlobUrl = URL.createObjectURL(response.response);
        imgEl.src = this.currentBlobUrl;
      },
      onerror: () => {
        if (loadingEl) loadingEl.style.display = "none";
        imgEl.style.display = "block";
        imgEl.alt = "Error loading image";
        console.error("[WazeMY] PluginZoomPic: Error loading image from", url);
      },
    });
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
