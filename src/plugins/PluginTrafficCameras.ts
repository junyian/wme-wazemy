import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";

export default class PluginTrafficCameras implements IPlugin {
  private trafcamLayer: any;

  constructor() {
    this.initialize();
  }

  initialize(): void {
    // Add settings into view.
    const settingsHTML = `<div>
      <input type="checkbox" id="wazemySettings_trafcam_enable" style="margin-top:0px"/>
      <label for="wazemySettings_trafcam_enable">Traffic cameras</label><br></div>`;
    const wazemySettings = document.getElementById(
      "wazemySettings_settings",
    ) as HTMLElement;
    $("#wazemySettings_settings").append(settingsHTML);
    // wazemySettings.insertAdjacentHTML("afterbegin", settingsHTML);
    const settingsEl = document.getElementById(
      `wazemySettings_trafcam_enable`,
    ) as HTMLInputElement;

    const savedSettings = SettingsStorage.instance.getSetting("trafcam");
    if (savedSettings?.enable === true) {
      settingsEl.checked = true;
    } else {
      settingsEl.checked = false;
    }

    settingsEl.onchange = (e: Event): void => {
      const target = e.target as HTMLInputElement;
      PluginManager.instance.updatePluginSettings("trafcam", {
        enable: target.checked,
      });
    };

    // Install camera icon
    if (!OpenLayers.Icon) {
      this.installIconClass();
    }
    this.trafcamLayer = new OpenLayers.Layer.Markers("wazemyTrafcamLayer");
    W.map.addLayer(this.trafcamLayer);
    this.showIcons();
    console.log("PluginTrafficCameras initialized.");
  }

  enable(): void {
    console.log("PluginTrafficCameras enabled.");
    this.trafcamLayer.setVisibility(true);
  }

  disable(): void {
    console.log("PluginTrafficCameras disabled.");
    this.trafcamLayer.setVisibility(false);
  }

  updateSettings(settings: any): void {
    if (settings.enable === true) {
      this.enable();
    } else {
      this.disable();
    }
    console.log("PluginTrafficCameras settings updated", settings);
  }

  installIconClass(): void {
    OpenLayers.Icon = OpenLayers.Class({
      url: null,
      size: null,
      offset: null,
      calculateOffset: null,
      imageDiv: null,
      px: null,
      initialize: function (
        url: string,
        size: { w: number; h: number },
        offset: { x: number; y: number },
        calculateOffset: number,
      ): void {
        this.url = url;
        this.size = size || { w: 20, h: 20 };
        this.offset = offset || {
          x: -(this.size.w / 2),
          y: -(this.size.h / 2),
        };
        this.calculateOffset = calculateOffset;
        url = OpenLayers.Util.createUniqueID("OL_Icon_");
        const div = (this.imageDiv = OpenLayers.Util.createAlphaImageDiv(url));
        $(div.firstChild).removeClass("olAlphaImg"); // LEAVE THIS LINE TO PREVENT WME-HARDHATS SCRIPT FROM TURNING ALL ICONS INTO HARDHAT WAZERS --MAPOPMATIC
      },
      destroy: function () {
        this.erase();
        OpenLayers.Event.stopObservingElement(this.imageDiv.firstChild);
        this.imageDiv.innerHTML = "";
        this.imageDiv = null;
      },
      clone: function () {
        return new OpenLayers.Icon(
          this.url,
          this.size,
          this.offset,
          this.calculateOffset,
        );
      },
      setSize: function (size: number) {
        null !== size && (this.size = size);
        this.draw();
      },
      setUrl: function (url: string) {
        null !== url && (this.url = url);
        this.draw();
      },
      draw: function (a: { x: number; y: number }) {
        OpenLayers.Util.modifyAlphaImageDiv(
          this.imageDiv,
          null,
          null,
          this.size,
          this.url,
          "absolute",
        );
        this.moveTo(a);
        return this.imageDiv;
      },
      erase: function () {
        null !== this.imageDiv &&
          null !== this.imageDiv.parentNode &&
          OpenLayers.Element.remove(this.imageDiv);
      },
      setOpacity: function (a: number) {
        OpenLayers.Util.modifyAlphaImageDiv(
          this.imageDiv,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          a,
        );
      },
      moveTo: function (a: { x: number; y: number }) {
        null !== a && (this.px = a);
        null !== this.imageDiv &&
          (null === this.px
            ? this.display(!1)
            : (this.calculateOffset &&
                (this.offset = this.calculateOffset(this.size)),
              OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, {
                x: this.px.x + this.offset.x,
                y: this.px.y + this.offset.y,
              })));
      },
      display: function (a: string) {
        this.imageDiv.style.display = a ? "" : "none";
      },
      isDrawn: function () {
        return (
          this.imageDiv &&
          this.imageDiv.parentNode &&
          11 != this.imageDiv.parentNode.nodeType
        );
      },
      CLASS_NAME: "OpenLayers.Icon",
    });
  }

  showIcons(): void {
    trafficCamsData.forEach((e: any, idx: number) => {
      this.drawCamIcon({
        idx: idx,
        desc: e.desc,
        src: e.url,
        width: 20,
        height: 20,
        lat: e.lat,
        lon: e.lon,
      });
    });
  }

  drawCamIcon(spec: any) {
    const camIcon =
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBRDNGNTkwRTYzQThFMzExQTc4MDhDNjAwODdEMzdEQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2OUI0RUEyN0IwRjcxMUUzOERFM0E1OTJCRUY3NTFBOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2OUI0RUEyNkIwRjcxMUUzOERFM0E1OTJCRUY3NTFBOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZGOEJBMzExNkZCMEUzMTFCOEY5QTU3QUQxM0M2MjI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFEM0Y1OTBFNjNBOEUzMTFBNzgwOEM2MDA4N0QzN0RBIi8+IDwvcmRmOkRlc2NyaXB0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";
    const size = new OpenLayers.Size(20, 20);
    const icon = new OpenLayers.Icon(camIcon, size);
    const epsg4326 = new OpenLayers.Projection("EPSG:4326"); // WGS 1984 projection. Malaysia uses EPSG:900913
    const projectTo = W.map.getProjectionObject();
    const lonLat = new OpenLayers.LonLat(spec.lon, spec.lat).transform(
      epsg4326,
      projectTo,
    );
    const newMarker = new OpenLayers.Marker(lonLat, icon);
    newMarker.idx = spec.idx;
    newMarker.title = spec.desc;
    newMarker.url = spec.src;
    newMarker.width = spec.width;
    newMarker.height = spec.height;
    newMarker.location = lonLat;
    newMarker.events.register("click", newMarker, this.popupCam);
    this.trafcamLayer.addMarker(newMarker);
  }

  popupCam(e: MouseEvent & { object: any }) {
    popupCam_close(); // Close existing popup if already opened.

    var popupHTML = `<div id="gmPopupContainerCam" style="margin:1;text-align:center;padding:5px;z-index:1100;position:absolute;color:white;background:rgba(0,0,0,0.5)">
            <table border=0>
                <tr>
                    <td><div id="mycamdivheader" style="min-height:20px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;word-wrap:break-word;width:380px">${e.object.title}</div></td>
                    <td align="right"><a href="#close" id="gmCloseCamDlgBtn" title="Close" style="color:red">X</a></td>
                </tr>
                <tr><td colspan=2>Select source:
                    <select id="wazemy_camSource">
                    </select>
                    <div hidden id="mycamid">${e.object.idx}</div>
                </td></tr>
                <tr><td colspan=2><img style="width:400px" id="staticimage"></td></tr>
                <tr><td colspan=2><div id="mycamstatus"></div></td></tr>
            </table></div>`;
    document.body.insertAdjacentHTML("afterbegin", popupHTML);

    // Handle cases where popup is too near the edge.
    let tw = $("#gmPopupContainerCam").width();
    let th = $("#gmPopupContainerCam").height() + 200;
    var tooltipX = e.clientX + window.scrollX + 15;
    var tooltipY = e.clientY + window.scrollY + 15;
    if (tooltipX + tw > W.map.$map.innerWidth()) {
      tooltipX -= tw + 20; // 20 = scroll bar size
      if (tooltipX < 0) tooltipX = 0;
    }
    if (tooltipY + th > W.map.$map.innerHeight()) {
      tooltipY -= th + 20;
      if (tooltipY < 0) tooltipY = 0;
    }
    $("#gmPopupContainerCam").css({ left: tooltipX });
    $("#gmPopupContainerCam").css({ top: tooltipY });

    //Add listener for popup's "Close" button
    const closeBtn: HTMLElement = document.getElementById("gmCloseCamDlgBtn");
    closeBtn.onclick = popupCam_close;

    // Allow popup to be draggable.
    const popupContainerEl = document.getElementById("gmPopupContainerCam");
    popup_dragElement(popupContainerEl);

    const camSourceEl = document.getElementById("wazemy_camSource");
    for (let urlsrc in e.object.url) {
      if (urlsrc === "LLM" && e.object.url["LLM"].split("|").length == 2) {
        popup_appendOption(urlsrc);
      } else if (urlsrc === "Jalanow") {
        popup_appendOption(urlsrc);
      }
    }

    camSourceEl.onchange = (e) => {
      console.log("PluginTrafficCameras: Camera source selection changed.");
      const camId = document.getElementById("mycamid");

      const target = e.target as HTMLSelectElement;
      switch (target.selectedOptions[0].innerText) {
        case "Jalanow":
          popup_getJalanowImage(
            trafficCamsData[camId.innerText]["url"]["Jalanow"],
          );
          break;
        case "LLM":
          popup_getLLMImage(trafficCamsData[camId.innerText]["url"]["LLM"]);
          break;
      }
    };

    // Get image for the first time when popup is displayed.
    switch (Object.keys(e.object.url)[0]) {
      case "Jalanow":
        popup_getJalanowImage(e.object.url["Jalanow"]);
        break;
      case "LLM":
        popup_getLLMImage(e.object.url["LLM"]);
        break;
    }

    function popupCam_close() {
      const popupContainerEl = document.getElementById("gmPopupContainerCam");
      if (popupContainerEl) {
        popupContainerEl.remove();
        popupContainerEl.hidden = true;
      }
    }

    function popup_dragElement(elmnt: HTMLElement) {
      var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
      if (document.getElementById("mycamdivheader")) {
        // if present, the header is where you move the DIV from:
        document.getElementById("mycamdivheader").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e: MouseEvent) {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }

      function elementDrag(e: MouseEvent) {
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        const popupContainerEl = document.getElementById("gmPopupContainerCam");
        popupContainerEl.style.top = popupContainerEl.offsetTop - pos2 + "px";
        popupContainerEl.style.left = popupContainerEl.offsetLeft - pos1 + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

    function popup_appendOption(urlsrc: string) {
      const option: HTMLOptionElement = document.createElement("option");
      option.value = urlsrc;
      option.text = urlsrc;
      camSourceEl.append(option);
    }

    function popup_getJalanowImage(url: string) {
      GM_xmlhttpRequest({
        method: "GET",
        responseType: "blob",
        headers: {
          authority: "p4.fgies.com",
          referer: "https://www.jalanow.com/",
          accept:
            "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        },
        url: url,
        onload: function (response) {
          const staticImageEl = document.getElementById(
            "staticimage",
          ) as HTMLImageElement;
          staticImageEl.src = URL.createObjectURL(response.response);
          document.getElementById("mycamstatus").innerHTML = "";
        },
        onerror: function (response) {
          document.getElementById("mycamstatus").innerHTML =
            "Error loading image.";
        },
        onprogress: function (response) {
          document.getElementById("mycamstatus").innerHTML = "Loading image...";
        },
      });
    }

    function popup_getLLMImage(url: string): void {
      let camImg = url.split("|");

      GM_xmlhttpRequest({
        method: "GET",
        responseType: "blob",
        url: camImg[0],
        onload: function (response) {
          const re = new RegExp(
            'src="data:image/png;base64, ([A-Za-z0-9/+=]*)" title="' +
              camImg[1] +
              '"',
          );
          const m = response.responseText.match(re);
          const staticImageEl = document.getElementById(
            "staticimage",
          ) as HTMLImageElement;
          staticImageEl.src = "data:image/png;base64," + m[1];
          document.getElementById("mycamstatus").innerHTML = "";
        },
        onerror: function (response) {
          document.getElementById("mycamstatus").innerHTML =
            "Error loading image.";
        },
        onprogress: function (response) {
          document.getElementById("mycamstatus").innerHTML = "Loading image...";
        },
      });
    }
  }
}
