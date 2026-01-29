# Changelog

## 2026.01.29.1

*   Improved Gemini image evaluation performance
    *   Added debounced click handler to prevent redundant evaluations on rapid clicks
    *   Added image URL caching to skip re-evaluation when the same image is already displayed
    *   Fixed binary-to-base64 conversion to use ArrayBuffer instead of responseText for correct and efficient encoding
    *   Disabled Gemini thinking mode (`thinkingBudget: 0`) for faster image evaluation responses
    *   Enabled structured JSON output via `responseMimeType` to eliminate markdown code fence parsing
    *   Simplified prompt to reduce input token count

## 2026.01.25.1

*   Added reverse-chronological sorting for URs and PURs
    *   New PluginURs: Sidebar panel displaying editable Update Requests sorted newest first
    *   Filter URs to only show editable ones using `isEditable` property
    *   URs display type, severity (color-coded), relative date, and status
    *   Click any UR row to center map on that location
    *   Auto-refresh on map data loaded event
    *   Enhanced PluginPlaces: PURs now sorted newest first with new "Date" column
    *   Added shared date utilities for relative time formatting (e.g., "2 hours ago")

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
