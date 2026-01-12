# Changelog

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
