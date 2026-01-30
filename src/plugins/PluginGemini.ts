import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";
import { WmeSDK } from "wme-sdk-typings";

// Mapping from Gemini violation codes to WME rejection reason values
const VIOLATION_TO_WME_REASON: Record<string, string> = {
  IRRELEVANT_IMAGE: "7", // Not relevant / wrong place
  LOW_QUALITY: "3", // Low quality
  INAPPROPRIATE_CONTENT: "4", // Offensive
  PERSONAL_INFORMATION: "6", // Private / personal info
  SCREENSHOT_OF_MAP: "5", // Screenshot
  EXCESSIVE_TEXT_OR_OVERLAYS: "3", // Low quality (closest match)
  COPYRIGHTED_MATERIAL: "1", // Copyrighted
  ORIENTATION_OR_CROPPING_ISSUE: "3", // Low quality
  DUPLICATE_IMAGE: "2", // Duplicate
  OTHER_GENERAL_ISSUE: "8", // Other
};

export default class PluginGemini implements IPlugin {
  private sdk: WmeSDK;
  private geminiApiKey: string;
  private lastEvaluatedImageSrc: string | null = null;
  private evaluateDebounceTimer: ReturnType<typeof setTimeout> | null = null;
  private lastEvaluationResult: {
    suggestion: string;
    reason: string;
    violations: string[];
  } | null = null;

  /**
   * Constructs a new instance of the PluginGemini class.
   * Initializes the WME SDK with the specified script ID and name,
   * and calls the initialize method to set up the plugin.
   */
  constructor() {
    this.sdk = unsafeWindow.getWmeSdk({
      scriptId: "wme-wazemy-gemini",
      scriptName: "WazeMY",
    });
    this.initialize();
  }

  /**
   * Initialize plugin.
   *
   * @return {void} This function does not return anything.
   */
  initialize(): void {
    const settingsHTML: string = `
      <div>
        <input type="checkbox" id="wazemySettings_gemini_enable"/>
        <label for="wazemySettings_gemini_enable">Enable Gemini integration</label>
      </div>
    `;
    $("#wazemySettings_settings").append(settingsHTML);

    $("#wazemySettings_gemini_enable").on("change", () => {
      PluginManager.instance.updatePluginSettings("gemini", {
        enable: $("#wazemySettings_gemini_enable").prop("checked"),
      });
    });

    const geminiAPIKeySettings: string = `
      <div>
        <label for="wazemySettings_gemini_apiKey">API Key</label>
        <input type="password" id="wazemySettings_gemini_apiKey" placeholder="Enter Gemini API Key"/>
        <wz-button id="wazemySettings_gemini_saveApiKey" class="wazemySettingsButton" style="padding:3px">
          Save
        </wz-button>
        <div style="font-size: 10px; margin-top: 5px;">
          Get your API key from <a href="https://aistudio.google.com/" target="_blank">Google AI Studio</a>.
        </div>
      </div>
    `;
    $("#wazemySettings_gemini").append(geminiAPIKeySettings);

    $("#wazemySettings_gemini_saveApiKey").on("click", () => {
      PluginManager.instance.updatePluginSettings("gemini", {
        geminiApiKey: $("#wazemySettings_gemini_apiKey").val(),
      });
    });

    // Set settings according to last stored value.
    const savedSettings: any = SettingsStorage.instance.getSetting("gemini");
    if (savedSettings?.enable === true) {
      $("#wazemySettings_gemini_enable").prop("checked", true);
    } else {
      $("#wazemySettings_gemini_enable").prop("checked", false);
    }
    if (savedSettings?.geminiApiKey) {
      $("#wazemySettings_gemini_apiKey").val(savedSettings.geminiApiKey);
      this.geminiApiKey = savedSettings.geminiApiKey;
    }

    // let aiAnswer = this.getGeminiTextResponse("How AI does work?");
    // console.log("[WazeMY] Gemini AI Answer:", aiAnswer);
    this.initializeVenueUpdateRequestImageHelper();

    console.log("[WazeMY] PluginGemini initialized.");
  }

  /**
   * Enable plugin.
   *
   * @return {void} This function does not return anything.
   */
  enable(): void {
    console.log("[WazeMY] PluginGemini enabled.");
  }

  /**
   * Disable plugin.
   *
   * @return {void} This function does not return anything.
   */
  disable(): void {
    console.log("[WazeMY] PluginGemini disabled.");
  }

  /**
   * Updates the settings of the PluginGemini based on the provided settings object.
   *
   * @return {void} This function does not return anything.
   */
  updateSettings(settings: any): void {
    if (settings.enable) {
      if (settings.enable === true) {
        this.enable();
      } else {
        this.disable();
      }
    }

    console.log("[WazeMY] PluginGemini settings updated.");
  }

  /**
   * Initialize the helper for venue update request image.
   *
   * @return {void} This function does not return anything.
   */
  initializeVenueUpdateRequestImageHelper(): void {
    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
      const bytes = new Uint8Array(buffer);
      let binary = "";
      for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return btoa(binary);
    };

    const onload_base64image = (response: any): void => {
      const base64data = arrayBufferToBase64(response.response);
      this.getGeminiPictureEvaluation(base64data).then((evaluation: string) => {
        const evaluationText = JSON.parse(evaluation);
        this.lastEvaluationResult = evaluationText;
        $("#gemini").replaceWith(
          `<div id='gemini' class="changes"><b>Gemini image evaluation: ${evaluationText.suggestion}</b><br><i>${evaluationText.reason}</i><br></div>`,
        );
        if (evaluationText.suggestion === "Reject") {
          $("#gemini").append(
            `<b>Violations:</b><ul>${evaluationText.violations.map((v: string) => `<li>${v}</li>`).join("")}</ul>`,
          );
          // Add Quick Reject button
          $("#gemini").append(
            `<wz-button id="gemini-quick-reject" color="secondary" size="sm">Quick Reject</wz-button>`,
          );
          $("#gemini-quick-reject").on("click", () => {
            this.performQuickReject();
          });
        }
      });
    };

    const evaluateImage = (displayAfterElement: string): void => {
      const imagePreview = $(".image-preview");
      const geminiElement = $("#gemini");

      if (imagePreview.length > 0 && geminiElement.length === 0) {
        const src = imagePreview.attr("src");
        if (src === this.lastEvaluatedImageSrc) {
          return;
        }
        this.lastEvaluatedImageSrc = src;
        $(displayAfterElement).after(
          "<div id='gemini' class='changes'><i>Gemini is evaluating...</i><br></div>",
        );
        GM_xmlhttpRequest({
          method: "GET",
          url: src,
          responseType: "arraybuffer",
          onload: onload_base64image.bind(this),
        });
      }
    };

    $(document.body).on("click", (_e) => {
      if (this.evaluateDebounceTimer) {
        clearTimeout(this.evaluateDebounceTimer);
      }
      this.evaluateDebounceTimer = setTimeout(() => {
        evaluateImage("div.changes");
      }, 300);
    });
  }

  getGeminiTextResponse(context: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.geminiApiKey) {
        reject(new Error("Gemini API key is not set."));
        return;
      }

      const model = "gemini-2.5-flash";

      const message = {
        contents: [{ parts: [{ text: context }] }],
        generationConfig: { thinkingConfig: { thinkingBudget: 0 } },
      };
      GM_xmlhttpRequest({
        method: "POST",
        url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.geminiApiKey}`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(message),
        onload: function (response) {
          try {
            const data = JSON.parse(response.responseText);
            // console.log(data["candidates"][0]["content"]["parts"][0]["text"]);
            resolve(data["candidates"][0]["content"]["parts"][0]["text"]);
          } catch (e) {
            console.error(new Error("Failed to parse response: " + e.message));
            reject(new Error(`Failed to parse Gemini response: ${e.message}`));
          }
        },
      });
    });
  }

  getGeminiPictureEvaluation(base64ImageData: string): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.geminiApiKey) {
        reject(new Error("Gemini API key is not set."));
        return;
      }

      const model = "gemini-2.5-flash";

      const prompt = `You are an AI assistant specialized in Waze Map Editor (WME) venue image moderation.

Your task is to evaluate an uploaded image of a Waze venue against Waze Map Editor's official guidelines for venue images. You will determine if the image should be 'Approved' or 'Rejected' and provide a clear, concise justification, along with specific guideline violations if rejected.

I will provide you with an image for evaluation.

Respond with a JSON object with the following fields:
- "suggestion": "Approve" or "Reject"
- "reason": Concise explanation for the decision
- "violations": Array of violation codes if rejected. Valid codes: "IRRELEVANT_IMAGE", "LOW_QUALITY", "INAPPROPRIATE_CONTENT", "PERSONAL_INFORMATION", "SCREENSHOT_OF_MAP", "EXCESSIVE_TEXT_OR_OVERLAYS", "COPYRIGHTED_MATERIAL", "ORIENTATION_OR_CROPPING_ISSUE", "DUPLICATE_IMAGE", "OTHER_GENERAL_ISSUE"

Waze Venue Image Guidelines to Consider:

1.  **Relevance:** The image *must* clearly depict the venue/business itself (e.g., its entrance, sign, storefront). No random objects, people (unless part of a large crowd at an event, but generally avoided), or irrelevant scenery.
2.  **Quality:** Images must be clear, well-lit, in focus, and not blurry, pixelated, overexposed, or excessively dark.
3.  **Appropriateness:** No offensive, violent, sexually explicit, or hateful content.
4.  **No Personal Information:** Avoid identifiable faces (especially children), license plates, or other sensitive personal data unless it's an unchangeable part of the venue's permanent signage.
5.  **No Map Screenshots:** Do not approve images that are screenshots of Waze, Google Maps, or any other navigation/map application.
6.  **Minimal Text/Overlays:** Avoid images with excessive text, watermarks, promotional overlays, or graphic elements that are not part of the venue's physical branding/signage. A clear logo on a sign is generally fine; a flyer overlay is not.
7.  **Copyright:** Avoid copyrighted images without explicit permission (AI should err on the side of caution).
8.  **Focus:** The primary subject of the image should be the venue.
9.  **Orientation:** Landscape orientation is generally preferred for display, but a good quality portrait image of a tall building is acceptable if it clearly shows the venue. Poor rotation is a rejection reason.

Decision Logic:

* If the image adheres to all the above guidelines, set 'decision' to "Approved".
* If the image violates one or more guidelines, set 'decision' to "Rejected" and list *all* applicable violation codes in the 'violations' array.`;

      const message = {
        contents: [
          {
            parts: [
              {
                inlineData: {
                  mimeType: "image/jpeg",
                  data: base64ImageData,
                },
              },
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          thinkingConfig: { thinkingBudget: 0 },
          responseMimeType: "application/json",
        },
      };
      GM_xmlhttpRequest({
        method: "POST",
        url: `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.geminiApiKey}`,
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(message),
        onload: function (response) {
          try {
            const data = JSON.parse(response.responseText);
            // console.log(data["candidates"][0]["content"]["parts"][0]["text"]);
            resolve(data["candidates"][0]["content"]["parts"][0]["text"]);
          } catch (e) {
            console.log(new Error("Failed to parse response: " + e.message));
            reject(new Error(`Failed to parse Gemini response: ${e.message}`));
          }
        },
      });
    });
  }

  /**
   * Performs quick rejection of the current PUR image using WME's reject functionality.
   * Maps Gemini violations to WME rejection reasons and triggers the rejection.
   */
  private performQuickReject(): void {
    if (!this.lastEvaluationResult || this.lastEvaluationResult.suggestion !== "Reject") {
      console.log("[WazeMY] No rejection to perform - evaluation is not a reject.");
      return;
    }

    // Determine the WME rejection reason from the first violation
    const violations = this.lastEvaluationResult.violations || [];
    const primaryViolation = violations[0] || "OTHER_GENERAL_ISSUE";
    const wmeReasonValue = VIOLATION_TO_WME_REASON[primaryViolation] || "8";

    // Find and click the WME reject button
    // The reject button in WME PUR review is typically a wz-button with specific text or class
    const rejectButton = $(
      'wz-button[color="secondary"]:contains("Reject"), ' +
      'wz-button.reject-button, ' +
      'button:contains("Reject"):not(#gemini-quick-reject)'
    ).first();

    if (rejectButton.length === 0) {
      console.log("[WazeMY] Could not find WME reject button.");
      this.showQuickRejectStatus("Could not find reject button", "error");
      return;
    }

    // Click the reject button to open the rejection dialog
    rejectButton[0].click();

    // Wait for the dialog to appear and then select the reason
    setTimeout(() => {
      this.selectRejectionReasonAndSubmit(wmeReasonValue);
    }, 300);
  }

  /**
   * Selects the rejection reason in the WME dialog and submits the rejection.
   */
  private selectRejectionReasonAndSubmit(reasonValue: string): void {
    // Find the rejection reason dropdown/select
    const reasonSelect = $(
      'wz-select[name="annotationType"], ' +
      'select[name="annotationType"], ' +
      '.rejection-reason select, ' +
      'wz-select.rejection-reason'
    ).first();

    if (reasonSelect.length > 0) {
      // Set the value on the select element
      const selectElement = reasonSelect[0] as HTMLSelectElement;
      if (selectElement.tagName.toLowerCase() === "wz-select") {
        // For wz-select custom element
        (selectElement as any).value = reasonValue;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        // For standard select element
        selectElement.value = reasonValue;
        $(selectElement).trigger("change");
      }
    }

    // Wait a moment then click the submit/confirm button
    setTimeout(() => {
      const submitButton = $(
        'wz-button:contains("Submit"), ' +
        'wz-button:contains("Confirm"), ' +
        'wz-button[color="primary"]:visible, ' +
        'button:contains("Submit"):visible'
      ).first();

      if (submitButton.length > 0) {
        submitButton[0].click();
        this.showQuickRejectStatus("Image rejected successfully", "success");
        // Clear the last evaluation since we've acted on it
        this.lastEvaluationResult = null;
        this.lastEvaluatedImageSrc = null;
      } else {
        this.showQuickRejectStatus("Could not find submit button", "error");
      }
    }, 200);
  }

  /**
   * Shows a status message for the quick reject action.
   */
  private showQuickRejectStatus(message: string, type: "success" | "error"): void {
    const color = type === "success" ? "#4CAF50" : "#f44336";
    const statusHtml = `<div id="gemini-reject-status" style="color: ${color}; margin-top: 5px; font-weight: bold;">${message}</div>`;

    $("#gemini-reject-status").remove();
    $("#gemini").append(statusHtml);

    // Auto-remove after 3 seconds
    setTimeout(() => {
      $("#gemini-reject-status").fadeOut(300, function() {
        $(this).remove();
      });
    }, 3000);
  }
}
