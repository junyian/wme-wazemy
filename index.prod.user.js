// ==UserScript==
// @name        WME WazeMY
// @namespace   https://www.github.com/junyian/
// @version     2024.05.31
// @author      junyianl <junyian@gmail.com>
// @source      https://github.com/junyian/wme-wazemy
// @license     MIT
// @match       *://www.waze.com/editor*
// @match       *://www.waze.com/*/editor*
// @require     https://greasyfork.org/scripts/24851-wazewrap/code/WazeWrap.js
// @grant       GM.xmlHttpRequest
// @connect     httpbin.org
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

;// CONCATENATED MODULE: ./src/PluginFactory.ts


class PluginFactory {
    static createPlugin(pluginName) {
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
}
src_main().catch((e) => {
    console.log(e);
});

})();

/******/ })()
;