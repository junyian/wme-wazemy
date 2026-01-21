# Changelog

## 2026.01.21.1

*   Refactored PluginTooltip to use WME SDK layer events
    *   Replaced W. object queries (`W.map.venueLayer.getFeatureBy()` and `W.map.segmentLayer.getFeatureBy()`) with SDK layer events
    *   Implemented `wme-layer-feature-mouse-enter` and `wme-layer-feature-mouse-leave` event handlers
    *   Added proper layer event tracking for segments and venues using `sdk.Events.trackLayerEvents()`
    *   Improved efficiency by using event-driven approach instead of polling on every mouse move
    *   Fixed event unregistering issues with proper state management
    *   Reduced W. object instances from 4 to 2 (SDK adoption increased from ~80% to ~90%)

## 2026.01.19.1

*   Migrated from W. object to WME SDK equivalents
    *   Migrated PluginKVMR event system from `W.map.events` to SDK `Events.on()` and `Events.off()`
    *   Migrated map viewport dimensions from `W.map.$map.innerWidth/Height()` to SDK `Map.getMapViewportElement()`
    *   Migrated map center from `W.map.setCenter()` to SDK `Map.setMapCenter()`
    *   Refactored projection transforms to use OpenLayers.Projection directly instead of `W.map.getProjectionObject()`
    *   Implemented plugin layer registry in PluginManager for cross-plugin layer access
    *   Documented remaining W. object usage where SDK lacks equivalent APIs
    *   Reduced W. object instances from 22 to 4 (SDK adoption increased from ~20% to ~80%)

## 2026.01.13.1

*   Fixed full-size image display for Place Update Requests (PURs)
    *   PUR images lack proper MIME types from the server, causing browsers to fail to display them
    *   Now fetches images via GM_xmlhttpRequest and displays them in a draggable modal popup
    *   Added loading indicator, close button (also Escape key), and drag functionality
    *   Properly cleans up blob URLs to prevent memory leaks

## 2025.11.05.1

*   Fixed map tooltip crash when hovering over places without complete address information
    *   Added null checks for `city`, `state`, and `street` properties in venue and segment tooltips
    *   Tooltip now gracefully handles missing address data instead of throwing errors

## 2025.11.03.1

*   Migrated PluginPlaces sidebar tabs to WME SDK
    *   Replaced `W.userscripts.registerSidebarTab()` with `sdk.Sidebar.registerScriptTab()`
    *   Replaced `W.userscripts.removeSidebarTab()` with proper sidebar element cleanup
    *   Added WME SDK instance to PluginPlaces class

## 2025.10.22.1

*   Updated dependencies via `npm update`.
