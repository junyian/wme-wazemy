// ==UserScript==
// @name        WME WazeMY
// @namespace   https://www.github.com/junyian/
// @version     2024.06.03.01
// @author      junyianl <junyian@gmail.com>
// @source      https://github.com/junyian/wme-wazemy
// @license     MIT
// @match       *://www.waze.com/editor*
// @match       *://www.waze.com/*/editor*
// @require     https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @require     https://greasyfork.org/scripts/449165-wme-wazemy-trafcamlist/code/wme-wazemy-trafcamlist.js
// @grant       GM_xmlhttpRequest
// @connect     p3.fgies.com
// @connect     p4.fgies.com
// @connect     t2.fgies.com
// @connect     jalanow.com
// @connect     llm.gov.my
// @run-at      document-end
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less":
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `.wazemySettings {
  border: 1px solid;
  padding: 8px;
  border-radius: 4px;
}
.wazemySettings legend {
  margin-bottom: 0px;
  border-bottom-style: none;
  width: auto;
}
.wazemySettings h6 {
  margin-bottom: 0px;
}
.wazemySettings input {
  margin-top: 0px;
}
#wazemyTooltip {
  height: auto;
  width: auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 4px;
  padding: 4px;
  position: absolute;
  top: 0px;
  left: 0px;
  visibility: hidden;
  z-index: 10000;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {

// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js");
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js");
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js");
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js");
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less
var main = __webpack_require__("./node_modules/css-loader/dist/cjs.js!./node_modules/less-loader/dist/cjs.js!./src/style/main.less");
;// CONCATENATED MODULE: ./src/style/main.less

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(main/* default */.A, options);




       /* harmony default export */ const style_main = (main/* default */.A && main/* default */.A.locals ? main/* default */.A.locals : undefined);

;// CONCATENATED MODULE: ./src/SettingsStorage.ts
class SettingsStorage {
    /**
     * Initializes a new instance of the SettingsStorage class with the specified storage key.
     *
     * @param {string} storageKey - The key used to store the settings in the local storage.
     */
    constructor(storageKey) {
        this.storageKey = storageKey;
    }
    /**
     * Saves the given settings to the local storage.
     *
     * @param {any} settings - The settings to be saved.
     * @return {void} This function does not return anything.
     */
    saveSettings(settings) {
        localStorage.setItem(this.storageKey, JSON.stringify(settings));
    }
    /**
     * Loads the settings from the local storage.
     *
     * @return {any} The loaded settings, or null if no settings are found.
     */
    loadSettings() {
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
    updateSetting(key, value) {
        const settings = this.loadSettings() || {};
        settings[key] = value;
        this.saveSettings(settings);
    }
    /**
     * Retrieves a specific setting from the local storage.
     *
     * @param {string} key - The key of the setting to retrieve.
     * @return {any} The value of the setting, or null if the setting is not found.
     */
    getSetting(key) {
        const settings = this.loadSettings();
        return settings ? settings[key] : null;
    }
    /**
     * Removes a specific setting from the local storage.
     *
     * @param {string} key - The key of the setting to remove.
     * @return {void} This function does not return anything.
     */
    removeSetting(key) {
        const settings = this.loadSettings();
        if (settings && key in settings) {
            delete settings[key];
            this.saveSettings(settings);
        }
    }
}
SettingsStorage.instance = new SettingsStorage("WME_wazemySettings");

;// CONCATENATED MODULE: ./src/plugins/PluginTooltip.ts


class PluginTooltip {
    constructor() {
        this.initialize();
    }
    /**
     * Initializes the plugin by adding settings into the tab pane, setting the initial state of the settings based on the last stored value, and adding a hidden tooltip window.
     *
     * @return {void} This function does not return anything.
     */
    initialize() {
        // Add settings into tab pane.
        const settingsHTML = `<input type="checkbox" id="wazemySettings_tooltip_enable"/>
<label for="wazemySettings_tooltip_enable">Enable map tooltip</label>`;
        $("#wazemySettings_settings").append(settingsHTML);
        $("#wazemySettings_tooltip_enable").on("change", () => {
            PluginManager.instance.updatePluginSettings("tooltip", {
                enable: $("#wazemySettings_tooltip_enable").prop("checked"),
            });
        });
        // Set settings according to last stored value.
        const savedSettings = SettingsStorage.instance.getSetting("tooltip");
        if (savedSettings?.enable === true) {
            $("#wazemySettings_tooltip_enable").prop("checked", true);
        }
        else {
            $("#wazemySettings_tooltip_enable").prop("checked", false);
        }
        // Add hidden tooltip window.
        const tooltipHTML = `<div id="wazemyTooltip"></div>`;
        $(document.body).append(tooltipHTML);
        console.log("[WazeMY] PluginTooltip initialized.");
    }
    /**
     * Enables the PluginTooltip by registering the "mousemove" event, showing the tooltip, and logging a message.
     *
     * @return {void} This function does not return anything.
     */
    enable() {
        WazeWrap.Events.register("mousemove", null, this.showTooltip);
        $("#wazemyTooltip").show();
        console.log("[WazeMY] PluginTooltip enabled.");
    }
    /**
     * Disables the PluginTooltip by unregistering the "mousemove" event, hiding the tooltip, and logging a message.
     *
     * @return {void} This function does not return anything.
     */
    disable() {
        WazeWrap.Events.unregister("mousemove", null, this.showTooltip);
        $("#wazemyTooltip").hide();
        console.log("[WazeMY] PluginTooltip disabled.");
    }
    /**
     * Updates the settings of the PluginTooltip based on the provided settings object.
     *
     * @param {any} settings - The new settings object.
     * @return {void} This function does not return anything.
     */
    updateSettings(settings) {
        if (settings.enable === true) {
            this.enable();
        }
        else {
            this.disable();
        }
        console.log("[WazeMY] PluginTooltip settings updated.", settings);
    }
    /**
     * Shows the tooltip at the mouse position.
     *
     * @param {MouseEvent} e - The mouse event.
     * @return {void} This function does not return anything.
     */
    showTooltip(e) {
        let output = "";
        let showTooltip = false;
        // Manual check of settings because unregistering event is not working.
        if ($("#wazemySettings_tooltip_enable").prop("checked") === true) {
            const landmark = W.map.venueLayer.getFeatureBy("renderIntent", "highlight");
            const segment = W.map.segmentLayer.getFeatureBy("renderIntent", "highlight");
            if (landmark) {
                output = `<b>${landmark.attributes.wazeFeature._wmeObject.attributes.name}</b><br>`;
                const address = landmark.attributes.wazeFeature._wmeObject.getAddress();
                try {
                    output += address.getHouseNumber()
                        ? `${address.getHouseNumber()}, `
                        : "";
                    output += address.getStreetName()
                        ? `${address.getStreetName()}<br>`
                        : `No street<br>`;
                    output += `${address.getCityName()}, `;
                    output += `${address.getStateName()}<br>`;
                }
                catch {
                    output += "No address<br>";
                }
                output += `<b>Lock:</b> ${landmark.attributes.wazeFeature._wmeObject.getLockRank() + 1}`;
                showTooltip = true;
            }
            else if (segment) {
                const segmentId = segment.attributes.wazeFeature.id;
                const address = segment.attributes.wazeFeature._wmeObject.getAddress();
                output = `<b>${address.getStreetName()}</b><br>`;
                output += `${address.getCityName()}, ${address.getStateName()}<br>`;
                output += `<b>ID:</b> ${segmentId}<br>`;
                output += `<b>Lock:</b> ${segment.attributes.wazeFeature._wmeObject.getLockRank() + 1}`;
                showTooltip = true;
            }
            const tooltipDiv = $("#wazemyTooltip");
            if (showTooltip === true) {
                const tw = tooltipDiv.innerWidth();
                const th = tooltipDiv.innerHeight();
                let tooltipX = e.clientX + window.scrollX + 15;
                let tooltipY = e.clientY + window.scrollY + 15;
                // Handle cases where tooltip is too near the edge.
                if (tooltipX + tw > W.map.$map.innerWidth()) {
                    tooltipX -= tw + 20; // 20 = scroll bar size
                    if (tooltipX < 0) {
                        tooltipX = 0;
                    }
                }
                if (tooltipY + th > W.map.$map.innerHeight()) {
                    tooltipY -= th + 20;
                    if (tooltipY < 0) {
                        tooltipY = 0;
                    }
                }
                tooltipDiv.html(output);
                tooltipDiv.css("top", `${tooltipY}px`);
                tooltipDiv.css("left", `${tooltipX}px`);
                tooltipDiv.css("visibility", "visible");
            }
            else {
                tooltipDiv.css("visibility", "hidden");
            }
        }
    }
}

;// CONCATENATED MODULE: ./src/plugins/PluginCopyLatLon.ts
class PluginCopyLatLon {
    constructor() {
        this.initialize();
    }
    /**
     * Initialize plugin.
     *
     * @return {void} This function does not return anything.
     */
    initialize() {
        const settingsHTML = `<div>Ctrl+Alt+C: <i>Copy lat/lon of mouse position to clipboard.</i></div>`;
        $("#wazemySettings_shortcuts").append(settingsHTML);
        this.enable(); // Manually enable plugin since there is no settings to trigger this.
        console.log("[WazeMY] PluginCopyLatLon initialized.");
    }
    /**
     * Enable plugin.
     *
     * @return {void} This function does not return anything.
     */
    enable() {
        new WazeWrap.Interface.Shortcut("WazeMY_latloncopy", "Copies lat/lon of mouse position to clipboard.", "wazemy", "WazeMY", "CA+c", this.copyLatLon, null).add();
        console.log("[WazeMY] PluginCopyLatLon enabled.");
    }
    /**
     * Disable plugin.
     *
     * @return {void} This function does not return anything.
     */
    disable() {
        console.log("[WazeMY] PluginCopyLatLon disabled.");
    }
    /**
     * Updates the settings of the PluginCopyLatLon based on the provided settings object.
     *
     * @return {void} This function does not return anything.
     */
    updateSettings(settings) {
        console.log("[WazeMY] PluginCopyLatLon settings updated.", settings);
    }
    /**
     * Copies lat/lon of mouse position to clipboard.
     *
     * @return {void} This function does not return anything.
     */
    copyLatLon() {
        const latlon = $(".wz-map-ol-control-span-mouse-position").text();
        navigator.clipboard.writeText(latlon);
    }
}

;// CONCATENATED MODULE: ./src/plugins/PluginTrafficCameras.ts


class PluginTrafficCameras {
    constructor() {
        this.initialize();
    }
    initialize() {
        // Add settings into view.
        const settingsHTML = `<div>
      <input type="checkbox" id="wazemySettings_trafcam_enable" style="margin-top:0px"/>
      <label for="wazemySettings_trafcam_enable">Traffic cameras</label><br></div>`;
        const wazemySettings = document.getElementById("wazemySettings_settings");
        $("#wazemySettings_settings").append(settingsHTML);
        // wazemySettings.insertAdjacentHTML("afterbegin", settingsHTML);
        const settingsEl = document.getElementById(`wazemySettings_trafcam_enable`);
        const savedSettings = SettingsStorage.instance.getSetting("trafcam");
        if (savedSettings?.enable === true) {
            settingsEl.checked = true;
        }
        else {
            settingsEl.checked = false;
        }
        settingsEl.onchange = (e) => {
            const target = e.target;
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
    enable() {
        console.log("PluginTrafficCameras enabled.");
        this.trafcamLayer.setVisibility(true);
    }
    disable() {
        console.log("PluginTrafficCameras disabled.");
        this.trafcamLayer.setVisibility(false);
    }
    updateSettings(settings) {
        if (settings.enable === true) {
            this.enable();
        }
        else {
            this.disable();
        }
        console.log("PluginTrafficCameras settings updated", settings);
    }
    installIconClass() {
        OpenLayers.Icon = OpenLayers.Class({
            url: null,
            size: null,
            offset: null,
            calculateOffset: null,
            imageDiv: null,
            px: null,
            initialize: function (url, size, offset, calculateOffset) {
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
                return new OpenLayers.Icon(this.url, this.size, this.offset, this.calculateOffset);
            },
            setSize: function (size) {
                null !== size && (this.size = size);
                this.draw();
            },
            setUrl: function (url) {
                null !== url && (this.url = url);
                this.draw();
            },
            draw: function (a) {
                OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, null, this.size, this.url, "absolute");
                this.moveTo(a);
                return this.imageDiv;
            },
            erase: function () {
                null !== this.imageDiv &&
                    null !== this.imageDiv.parentNode &&
                    OpenLayers.Element.remove(this.imageDiv);
            },
            setOpacity: function (a) {
                OpenLayers.Util.modifyAlphaImageDiv(this.imageDiv, null, null, null, null, null, null, null, a);
            },
            moveTo: function (a) {
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
            display: function (a) {
                this.imageDiv.style.display = a ? "" : "none";
            },
            isDrawn: function () {
                return (this.imageDiv &&
                    this.imageDiv.parentNode &&
                    11 != this.imageDiv.parentNode.nodeType);
            },
            CLASS_NAME: "OpenLayers.Icon",
        });
    }
    showIcons() {
        trafficCamsData.forEach((e, idx) => {
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
    drawCamIcon(spec) {
        const camIcon = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAAGXcA1uAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpBRDNGNTkwRTYzQThFMzExQTc4MDhDNjAwODdEMzdEQSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2OUI0RUEyN0IwRjcxMUUzOERFM0E1OTJCRUY3NTFBOCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2OUI0RUEyNkIwRjcxMUUzOERFM0E1OTJCRUY3NTFBOCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M1LjEgV2luZG93cyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjZGOEJBMzExNkZCMEUzMTFCOEY5QTU3QUQxM0M2MjI5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFEM0Y1OTBFNjNBOEUzMTFBNzgwOEM2MDA4N0QzN0RBIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+TV0cjwAABbhJREFUeNpiYIAAXiZGCIMPiP//f8DwnwnI+PT/HZD8y8AAEEBQVQzTwOSfuwz/u6qAyh4y/Gf8f4/hPwMnUJSZgQEggMCyzpZAmbsILMTHcAokPhPEWT8dqJoBgvetAtMMDBIiDCf/P4bqeMXwf+t8BiOAAGJAAqVA7A1iPH/+goFBT4OB8f9LJDueAzFQgOHGLoTZYEGgpJgww0+G/68ZQArAEsryEHpRN5BuK4FIcHMhjJORVTvBYG3MwPD2CkKwKAVI/3nBABBAYOcY6zKAjGSQEmP4cGkXxMlgK4BeaCll+B/lzzDh/yegmr8vIO4HGv/l/0eG/w4WDP9fnUM4Dhl/uMzwf/6CFQ4g9RUgE3ctRvgGGSvJMfw/tw3i7sY8hv8sQMGrQE8yuFoBZe8CeRwMDIKaDAyWRgwM2xYD+exA/AuIvwAV3kaE6sSPQCuBHv2vqczwf0YL0MR7SE4CsgsTGP5///aSCZQSGDRVGPJfv2dgNDNkcP30heHbB6BpyzYyMCRVMjCwqDIcOX+LgTEtioGRhfn/P4AAbJTfK0NhGMe/Z+ecpVkrScnIlCiWkoulpFyhxgXKXCGK3XGBG/4BJcoNN665tqsxo6XshiKtyQybn82vMZPF63nPOXKYi+fieU7P8z59P9/n6NlBVNrRRDFPMUlRIGhmM0gWzk5NSCFMuDE2MqAaUJGUhDgOgNmKkXmLwMRudA11diynI9lSKhEHG+oBu9q1mHkDf9AWWkM0dgHEb4H+PqqkKD51uxpJuSoDHpIfAowyohyUveJH+9pqUjigav/9UnIfzO/frkRvBxUuwcpK/gc3PkzfzynuwRoanYuStZDKaeAkwA8QEPJ/CYfpBUCmqxp1E7uXJ6u0tUNVQbvIR+DIBzgHgQMvrZ5LZWIiSuowh6N+nQ9ZYgnNcLTzdRBsz5Ot1socWCr1KipYulrJVDIQjqjwgqsESvcPQB5QWmP2nsWem5X80IeizhaadPfHQwTxnXJTDk5ZQgeOOCC0ScY0wtPdRrc4AzY7BVZuQ8bVDhcXJLyhNnwJUFj5hTQVhmH8mQ7H5nYYkRxJw8hqBWYsLIr+gisKYobdjKguClOKLiQvgrrwqogiIr1wECHdRCCjIopNiCKZIGkthysrrWSklg36M6O5fT3fzmk7C8kDL4zt2/neP8/ze01/b6XuceWsVmAJJR56gurObjSn0/DWrEY152SmIyFBNk1sxZhBZAQTyVmEDjeiy9eAQdm4FK1gLlHg8Y3CYlXzZW12A1+GYd1Yi1u1LogXQSYgmxdnjM8jsTFNZvLMxADE3h0QS8vxNNqLJWKa2ZMXBRXwaaNmL/XdoUct+hhtjF+MFBZ+zJq5Gw6ywoRyI/xs/JjJtCj38+XWo3rGdM6pI3nlqYshmmiGx7fJpLE8rAqGZQy+49o5CNeauoeplJZZPbWfztqSWurvmV/ixrCXQjRSFQE/xI8R/dK44VJae99OorWt/Xh2tZxp0Q+903zynX/q6YLwevgy28IXyiBYxCY3cXYeIvGGRL0Isc697Z5k0NRMQj8Grd92zuDALuAuIRm8CVSohe1uYZ+T74FwADjdBFBh6GgH+mm3ZuLDSb9Ocg9YLNYZOeSyUitevupFeWWVTlzjQ0dNfQJW1fOybulPWlmyZ85wpshQC43/m+9YsR2ZTn9wg5z955+z2FO3H0PRIIqcHHzgPpAgNukwOJzAwCB3NiFQxsyyjJ37J4lMXklpfnaRyidaO3xe7+6h3JmVy2CjkcInD3EO3/T1xsFn3mobX0z+RzkfNAxcpXrIjo+RkFKp0VLkk1hfwwqJr69RODxbcH05gem/wIEN62TV13XuMxNIvqYYqCT6R6x14UHsEarkwhBxJbtnC4wmS9fXDuT2stFkxIDsp4tfbZU5MCr0jnMbIMLoKy7Gc8WunU3rxHMoCmKxUaiqij/5alOWhMPoGAAAAABJRU5ErkJggg==";
        const size = new OpenLayers.Size(20, 20);
        const icon = new OpenLayers.Icon(camIcon, size);
        const epsg4326 = new OpenLayers.Projection("EPSG:4326"); // WGS 1984 projection. Malaysia uses EPSG:900913
        const projectTo = W.map.getProjectionObject();
        const lonLat = new OpenLayers.LonLat(spec.lon, spec.lat).transform(epsg4326, projectTo);
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
    popupCam(e) {
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
            if (tooltipX < 0)
                tooltipX = 0;
        }
        if (tooltipY + th > W.map.$map.innerHeight()) {
            tooltipY -= th + 20;
            if (tooltipY < 0)
                tooltipY = 0;
        }
        $("#gmPopupContainerCam").css({ left: tooltipX });
        $("#gmPopupContainerCam").css({ top: tooltipY });
        //Add listener for popup's "Close" button
        const closeBtn = document.getElementById("gmCloseCamDlgBtn");
        closeBtn.onclick = popupCam_close;
        // Allow popup to be draggable.
        const popupContainerEl = document.getElementById("gmPopupContainerCam");
        popup_dragElement(popupContainerEl);
        const camSourceEl = document.getElementById("wazemy_camSource");
        for (let urlsrc in e.object.url) {
            if (urlsrc === "LLM" && e.object.url["LLM"].split("|").length == 2) {
                popup_appendOption(urlsrc);
            }
            else if (urlsrc === "Jalanow") {
                popup_appendOption(urlsrc);
            }
        }
        camSourceEl.onchange = (e) => {
            console.log("PluginTrafficCameras: Camera source selection changed.");
            const camId = document.getElementById("mycamid");
            const target = e.target;
            switch (target.selectedOptions[0].innerText) {
                case "Jalanow":
                    popup_getJalanowImage(trafficCamsData[camId.innerText]["url"]["Jalanow"]);
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
        function popup_dragElement(elmnt) {
            var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            if (document.getElementById("mycamdivheader")) {
                // if present, the header is where you move the DIV from:
                document.getElementById("mycamdivheader").onmousedown = dragMouseDown;
            }
            else {
                // otherwise, move the DIV from anywhere inside the DIV:
                elmnt.onmousedown = dragMouseDown;
            }
            function dragMouseDown(e) {
                e.preventDefault();
                // get the mouse cursor position at startup:
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                document.onmousemove = elementDrag;
            }
            function elementDrag(e) {
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
        function popup_appendOption(urlsrc) {
            const option = document.createElement("option");
            option.value = urlsrc;
            option.text = urlsrc;
            camSourceEl.append(option);
        }
        function popup_getJalanowImage(url) {
            GM_xmlhttpRequest({
                method: "GET",
                responseType: "blob",
                headers: {
                    authority: "p4.fgies.com",
                    referer: "https://www.jalanow.com/",
                    accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                },
                url: url,
                onload: function (response) {
                    const staticImageEl = document.getElementById("staticimage");
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
        function popup_getLLMImage(url) {
            let camImg = url.split("|");
            GM_xmlhttpRequest({
                method: "GET",
                responseType: "blob",
                url: camImg[0],
                onload: function (response) {
                    const re = new RegExp('src="data:image/png;base64, ([A-Za-z0-9/+=]*)" title="' +
                        camImg[1] +
                        '"');
                    const m = response.responseText.match(re);
                    const staticImageEl = document.getElementById("staticimage");
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

;// CONCATENATED MODULE: ./src/plugins/PluginKVMR.ts


class PluginKVMR {
    constructor() {
        this.areas = [
            {
                name: "Area 1",
                geometry: "POLYGON ((101.296968 3.210365, 101.30376 3.118812, 101.327352 3.100621, 101.332475 3.083048, 101.3447571 3.0671528, 101.3475037 2.9992702, 101.4546204 2.9862417, 101.443634 3.2097608, 101.296968 3.210365))",
                color: "#ffffff",
            },
            {
                name: "Area 2a",
                geometry: "POLYGON ((101.443634 3.2097608, 101.4546204 2.9862417, 101.542797963266 2.999451622765, 101.546214771469 3.20939581928522, 101.443634 3.2097608))",
                color: "#ff0000",
            },
            {
                name: "Area 2b",
                geometry: "POLYGON ((101.546208402411 3.20940523257651, 101.545212203573 3.14955753765693, 101.640751782444 3.14826179285013, 101.6379547 3.2090753, 101.546208402411 3.20940523257651))",
                color: "#00ff00",
            },
            {
                name: "Area 2c",
                geometry: "POLYGON ((101.545226515908 3.14956187716133, 101.544049591624 3.0763653393285, 101.643784992874 3.08223941174546, 101.640750558754 3.14825692296985, 101.545226515908 3.14956187716133))",
                color: "#0000ff",
            },
            {
                name: "Area 2d",
                geometry: "POLYGON ((101.544050641663 3.07636531606873, 101.542795175242 2.99943779058738, 101.6468811 3.0150413, 101.643784373198 3.08223705403019, 101.544050641663 3.07636531606873))",
                color: "#ffff00",
            },
            {
                name: "Area 3",
                geometry: "POLYGON ((101.6379547 3.2090753, 101.6412146 3.145488, 101.7443848 3.1501147, 101.7309414 3.2090495, 101.6379547 3.2090753))",
                color: "#ff00ff",
            },
            {
                name: "Area 4",
                geometry: "POLYGON ((101.6412146 3.145488, 101.6439612 3.0796673, 101.7615509 3.0791519, 101.7443848 3.1501147, 101.6412146 3.145488))",
                color: "#00ffff",
            },
            {
                name: "Area 5",
                geometry: "POLYGON ((101.788224 3.210399, 101.7309414 3.2090495, 101.7615509 3.0791519, 101.6439612 3.0796673, 101.6468811 3.0150413, 101.8391418 3.0253266, 101.788224 3.210399))",
                color: "#40ff00",
            },
            {
                name: "Area 6",
                geometry: "POLYGON ((101.332475 3.083048, 101.262098 3.074553, 101.2335205 3.0815516, 101.208976 3.060844, 101.162394 2.989639, 101.223721 2.903504, 101.268598 2.871386, 101.284902 2.830662, 101.448138 2.72835, 101.4546204 2.9862417, 101.3475037 2.9992702, 101.3447571 3.0671528, 101.332475 3.083048))",
                color: "#ff4000",
            },
            {
                name: "Area 7",
                geometry: "POLYGON ((101.4546204 2.9862417, 101.448138 2.72835, 101.477474 2.766274, 101.559411 2.807463, 101.6578674 2.8223442, 101.6468811 3.0150413, 101.4546204 2.9862417))",
                color: "#33ff00",
            },
            {
                name: "Area 8",
                geometry: "POLYGON ((101.6578674 2.8223442, 101.725067 2.83344, 101.756459 2.866068, 101.882828 2.870563, 101.8391418 3.0253266, 101.6468811 3.0150413, 101.6578674 2.8223442))",
                color: "#ff0033",
            },
        ];
        this.initialize();
    }
    initialize() {
        // Add settings into view.
        const settingsHTML = `<div>
      <input type="checkbox" id="wazemySettings_kvmr_enable" style="margin-top:0px"/>
      <label for="wazemySettings_kvmr_enable">Klang Valley Map Raid</label><br></div>`;
        $("#wazemySettings_settings").append(settingsHTML);
        const settingsEl = document.getElementById(`wazemySettings_kvmr_enable`);
        const savedSettings = SettingsStorage.instance.getSetting("kvmr");
        if (savedSettings?.enable === true) {
            settingsEl.checked = true;
        }
        else {
            settingsEl.checked = false;
        }
        settingsEl.onchange = (e) => {
            const target = e.target;
            PluginManager.instance.updatePluginSettings("kvmr", {
                enable: target.checked,
            });
        };
        // Add MR polygon overlay.
        const mro_Map = W.map;
        const mro_OL = OpenLayers;
        // const mro_mapLayers = mro_Map.getLayersBy("uniqueName", "__KlangValley");
        this.raid_mapLayer = new mro_OL.Layer.Vector("KlangValley", {
            displayInLayerSwitcher: true,
            uniqueName: "__KlangValley",
        });
        // I18n.translations.en.layers.name["__KlangValley"] = " ";
        mro_Map.addLayer(this.raid_mapLayer);
        this.areas.forEach((area) => {
            const geometry = parseWKT(area.geometry);
            this.addRaidPolygon(this.raid_mapLayer, geometry, area.color, area.name);
        });
        this.raid_mapLayer.setVisibility(true);
        // setTimeout(function () {
        currentRaidLocation(this.raid_mapLayer);
        // }, 3000);
        mro_Map.events.register("moveend", W.map, function (e, d) {
            // setTimeout(function () {
            currentRaidLocation(this.raid_mapLayer);
            // }, 1500);
        });
        mro_Map.events.register("zoomend", W.map, function () {
            // setTimeout(function () {
            currentRaidLocation(this.raid_mapLayer);
            // }, 1500);
        });
        console.log("PluginKVMR initialized.");
        function currentRaidLocation(raid_mapLayer) {
            var mro_Map = W.map;
            const mro_mapLayers = mro_Map.getLayersBy("uniqueName", "__KlangValley")[0];
            for (let i = 0; i < mro_mapLayers.features?.length; i++) {
                var raidMapCenter = mro_Map.getCenter();
                var raidCenterPoint = new OpenLayers.Geometry.Point(raidMapCenter.lon, raidMapCenter.lat);
                raid_mapLayer = mro_Map.getLayersBy("uniqueName", "__KlangValley")[0];
                var raidCenterCheck = raid_mapLayer.features[i].geometry.components[0].containsPoint(raidCenterPoint);
                var holes = raid_mapLayer.features[i].attributes.holes;
                if (raidCenterCheck === true) {
                    var str = $("#topbar-container > div > div.location-info-region > div").text();
                    const location = str.split(" - ");
                    if (location.length > 1) {
                        location[1] =
                            "Klang Valley MapRaid " +
                                raid_mapLayer.features[i].attributes.number;
                    }
                    else {
                        location[0] =
                            "Klang Valley MapRaid " +
                                raid_mapLayer.features[i].attributes.number;
                    }
                    const raidLocationLabel = location.join(" - ");
                    // var n2 = str.indexOf(" - ");
                    // if (n2 > 0) {
                    // var n = str.length;
                    // var res = str.substring(n2 + 2, n);
                    // var rescount = res.indexOf(" - ");
                    // if (rescount > 0) {
                    // var n3 = res.length;
                    // var res2 = res.substring(rescount + 2, n3);
                    // }
                    //				var raidLocationLabel = 'Klang Valley ' + raid_mapLayer.features[i].attributes.number + ' - ' + res2;
                    /*    var raidLocationLabel =
                         "Klang Valley MapRaid " +
                         raid_mapLayer.features[i].attributes.number;
                     } else {
                       var raidLocationLabel =
                         "Klang Valley MapRaid " +
                         raid_mapLayer.features[i].attributes.number +
                         " - " +
                         $('#topbar-container > div > div.location-info-region > div').text();
                     } */
                    setTimeout(function () {
                        $("#topbar-container > div > div.location-info-region > div").text(raidLocationLabel);
                    }, 200);
                    if (holes === "false") {
                        break;
                    }
                }
            }
        }
        function parseWKT(wkt) {
            let trimmed;
            if (wkt.startsWith("POLYGON")) {
                trimmed = wkt.replace("POLYGON ((", "").replace("))", "");
            }
            const coordinatePairs = trimmed.split(", ");
            const coordinates = coordinatePairs.map((pair) => {
                const [lon, lat] = pair.split(" ");
                return { lon, lat };
            });
            return coordinates;
        }
    }
    enable() {
        this.raid_mapLayer.setVisibility(true);
        console.log("PluginKVMR enabled.");
    }
    disable() {
        this.raid_mapLayer.setVisibility(false);
        const mro_map = W.map;
        mro_map.events.unregister("moveend", W.map);
        mro_map.events.unregister("zoomend", W.map);
        console.log("PluginKVMR disabled.");
    }
    updateSettings(settings) {
        if (settings.enable === true) {
            this.enable();
        }
        else {
            this.disable();
        }
        console.log("PluginKVMR settings updated", settings);
    }
    addRaidPolygon(raidLayer, groupPoints, groupColor, groupNumber) {
        var mro_Map = W.map;
        var mro_OL = OpenLayers;
        var raidGroupLabel = "KlangValley " + groupNumber;
        var groupName = "RaidGroup " + groupNumber;
        var style = {
            strokeColor: groupColor,
            strokeOpacity: 0.8,
            strokeWidth: 3,
            fillColor: groupColor,
            fillOpacity: 0.15,
            label: raidGroupLabel,
            labelOutlineColor: "black",
            labelOutlineWidth: 3,
            fontSize: 14,
            fontColor: groupColor,
            fontOpacity: 0.85,
            fontWeight: "bold",
        };
        var attributes = {
            name: groupName,
            number: groupNumber,
        };
        var pnt = [];
        for (let i = 0; i < groupPoints.length; i++) {
            const convPoint = new OpenLayers.Geometry.Point(groupPoints[i].lon, groupPoints[i].lat).transform(new OpenLayers.Projection("EPSG:4326"), mro_Map.getProjectionObject());
            //console.log('MapRaid: ' + JSON.stringify(groupPoints[i]) + ', ' + groupPoints[i].lon + ', ' + groupPoints[i].lat);
            pnt.push(convPoint);
        }
        var ring = new mro_OL.Geometry.LinearRing(pnt);
        var polygon = new mro_OL.Geometry.Polygon([ring]);
        var feature = new mro_OL.Feature.Vector(polygon, attributes, style);
        raidLayer.addFeatures([feature]);
    }
}

;// CONCATENATED MODULE: ./src/PluginFactory.ts




class PluginFactory {
    static createPlugin(pluginName) {
        switch (pluginName) {
            case "PluginTooltip":
                return new PluginTooltip();
            case "PluginCopyLatLon":
                return new PluginCopyLatLon();
            case "PluginTrafficCameras":
                return new PluginTrafficCameras();
            case "PluginKVMR":
                if ([
                    "rickylo103",
                    "EpailXi",
                    "lufti_bihar",
                    "DINKAFTAC",
                    "dinohoo",
                    "inyshen",
                    "RapidGod",
                    "omegahawk",
                    "firman_bakti",
                    "junyianl",
                    "apis_",
                    "izuaniz",
                    "paulkok_my",
                    "CoolCityCat",
                    "Somebal",
                    "james890526",
                    "pamyskywalker",
                    "hooijack",
                    "zumaidi",
                    "godericbal",
                    "TinyWizard",
                    "bayau72",
                    "jayleongwk",
                    "jessteepy",
                    "kadyus",
                    "beliamuda",
                    "damaultz",
                    "dckj",
                    "kweeheng",
                ].includes(WazeWrap.User.Username())) {
                    return new PluginKVMR();
                }
                else {
                    console.log(`Plugin not created: ${pluginName}`);
                    return null;
                }
            default:
                throw new Error(`Unknown plugin: ${pluginName}`);
        }
    }
}

;// CONCATENATED MODULE: ./src/PluginManager.ts


class PluginManager {
    constructor(settings) {
        this.plugins = {};
        this.settingsStorage = settings;
    }
    /**
     * Adds a plugin to the PluginManager.
     *
     * @param {string} key - The key to associate the plugin with.
     * @param {string} type - The type of plugin to create.
     * @return {void} This function does not return anything.
     */
    addPlugin(key, type) {
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
    removePlugin(key) {
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
    enablePlugin(key) {
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
    disablePlugin(key) {
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
    updatePluginSettings(key, settings) {
        if (this.plugins[key]) {
            this.plugins[key].updateSettings(settings);
            this.settingsStorage.updateSetting(key, settings);
        }
    }
}
PluginManager.instance = new PluginManager(SettingsStorage.instance);

;// CONCATENATED MODULE: ./src/index.ts


const updateMessage = `Complete rewrite of the WazeMY script to TypeScript.<br>
  Bugfixes:<br>
  <ul>
    <li>Tooltip is not removed when feature is disabled via settings.</li>
  </ul>
  Improvements:<br>
  <ul>
    <li>Modernized the copy of lat/lon method.</li>
  </ul>
  Todo:<br>
  <ul>
    <li>Picture zoom in.</li>
  </ul>`;
async function src_main() {
    console.log("[WazeMY] Script started");
    document.addEventListener("wme-ready", initializeWazeMY, { once: true });
}
async function initializeWazeMY() {
    console.log("[WazeMY] WME ready");
    const { tabLabel, tabPane } = W.userscripts.registerSidebarTab("wazemy");
    tabLabel.innerHTML = "WazeMY";
    tabLabel.title = "WazeMY";
    tabPane.innerHTML = `<div>
  <h4>WazeMY</h4>
  <b>${GM_info.script.version}</b>
</div>
<fieldset class="wazemySettings">
  <legend class="wazemySettingsLegend">
    <h6>Settings</h6></legend>
  <div id="wazemySettings_settings"></div>
</fieldset>
<fieldset class="wazemySettings">
  <legend class="wazemySettingsLegend">
  <h6>Shortcuts</h6></legend>
  <div id="wazemySettings_shortcuts">
  </div>
</fieldset>`;
    WazeWrap.Interface.ShowScriptUpdate("WME WazeMY", GM_info.script.version, updateMessage, "https://greasyfork.org/en/scripts/404584-wazemy", "javascript:alert('No forum available');");
    const pluginManager = PluginManager.instance;
    pluginManager.addPlugin("copylatlon", "PluginCopyLatLon");
    pluginManager.addPlugin("tooltip", "PluginTooltip");
    pluginManager.addPlugin("trafcam", "PluginTrafficCameras");
    pluginManager.addPlugin("kvmr", "PluginKVMR");
}
src_main().catch((e) => {
    console.log(e);
});

})();

/******/ })()
;