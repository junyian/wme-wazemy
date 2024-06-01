declare module "*.less";

interface WmeState {
  isInitialMapDataLoaded: boolean; // if `wme-map-data-loaded` has already been dispatched
  isInitialized: boolean; // if `wme-initialzied` has already been dispatched
  isReady: boolean; // if `wme-ready` has already been dispatched
}

interface RegisterSidebarTabResult {
  tabLabel: HTMLElement;
  tabPane: HTMLElement;
}

interface W {
  userscripts: {
    state: WmeState;
    registerSidebarTab(scriptId: string): RegisterSidebarTabResult;
    waitForElementConnected(el: HTMLElement): Promise<void>;
    removeSidebarTab(scriptId: string): void;
    getDataModelByMapElement(
      el: HTMLElement | SVGElement,
    ): DataModelObject | null;
    getMapElementByDataModel(
      model: DataModelObject,
    ): HTMLElement | SVGElement | null;
    getDataModelByMarkerElement(markerEl: HTMLElement): DataModelObject | null;
    getMarkerElementByDataModel(model: DataModelObject): HTMLElement | null;
    getDataModelByFeatureElement(featureEl: SVGElement): DataModelObject | null;
    getFeatureElementByDataModel(model: DataModelObject): SVGElement | null;
    toGeoJSONGeometry(
      geometry: OpenLayers.Geometry | GeoJSON.Geometry,
    ): GeoJSON.Geometry;
    toOLGeometry(
      geometry: OpenLayers.Geometry | GeoJSON.Geometry,
    ): OpenLayers.Geometry;
    convertWktToGeoJSON(geometry: GeoJSON.Geometry): string; // WKT string
    convertGeoJSONToWkt(geometry: string /* WKT string */): GeoJSON.Geometry;
  };
}

interface Interface {
  ShowScriptUpdate(
    scriptName: string,
    version: string,
    updateHTML: string,
    greasyforkLink: string,
    forumLink?: string,
  ): void;
}

interface WazeWrap {
  Interface: Interface;
}
declare var W: W;
declare var WazeWrap: WazeWrap;
