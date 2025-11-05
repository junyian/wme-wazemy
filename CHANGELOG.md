# Changelog

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
