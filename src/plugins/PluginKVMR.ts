import IPlugin from "../IPlugin";
import PluginManager from "../PluginManager";
import SettingsStorage from "../SettingsStorage";

export default class PluginKVMR implements IPlugin {
  private raid_mapLayer: any;

  private areas = [
    {
      name: "Area 1",
      geometry:
        "POLYGON ((101.296968 3.210365, 101.30376 3.118812, 101.327352 3.100621, 101.332475 3.083048, 101.3447571 3.0671528, 101.3475037 2.9992702, 101.4546204 2.9862417, 101.443634 3.2097608, 101.296968 3.210365))",
      color: "#ffffff",
    },
    {
      name: "Area 2a",
      geometry:
        "POLYGON ((101.443634 3.2097608, 101.4546204 2.9862417, 101.542797963266 2.999451622765, 101.546214771469 3.20939581928522, 101.443634 3.2097608))",
      color: "#ff0000",
    },
    {
      name: "Area 2b",
      geometry:
        "POLYGON ((101.546208402411 3.20940523257651, 101.545212203573 3.14955753765693, 101.640751782444 3.14826179285013, 101.6379547 3.2090753, 101.546208402411 3.20940523257651))",
      color: "#00ff00",
    },
    {
      name: "Area 2c",
      geometry:
        "POLYGON ((101.545226515908 3.14956187716133, 101.544049591624 3.0763653393285, 101.643784992874 3.08223941174546, 101.640750558754 3.14825692296985, 101.545226515908 3.14956187716133))",
      color: "#0000ff",
    },
    {
      name: "Area 2d",
      geometry:
        "POLYGON ((101.544050641663 3.07636531606873, 101.542795175242 2.99943779058738, 101.6468811 3.0150413, 101.643784373198 3.08223705403019, 101.544050641663 3.07636531606873))",
      color: "#ffff00",
    },
    {
      name: "Area 3",
      geometry:
        "POLYGON ((101.6379547 3.2090753, 101.6412146 3.145488, 101.7443848 3.1501147, 101.7309414 3.2090495, 101.6379547 3.2090753))",
      color: "#ff00ff",
    },
    {
      name: "Area 4",
      geometry:
        "POLYGON ((101.6412146 3.145488, 101.6439612 3.0796673, 101.7615509 3.0791519, 101.7443848 3.1501147, 101.6412146 3.145488))",
      color: "#00ffff",
    },
    {
      name: "Area 5",
      geometry:
        "POLYGON ((101.788224 3.210399, 101.7309414 3.2090495, 101.7615509 3.0791519, 101.6439612 3.0796673, 101.6468811 3.0150413, 101.8391418 3.0253266, 101.788224 3.210399))",
      color: "#40ff00",
    },
    {
      name: "Area 6",
      geometry:
        "POLYGON ((101.332475 3.083048, 101.262098 3.074553, 101.2335205 3.0815516, 101.208976 3.060844, 101.162394 2.989639, 101.223721 2.903504, 101.268598 2.871386, 101.284902 2.830662, 101.448138 2.72835, 101.4546204 2.9862417, 101.3475037 2.9992702, 101.3447571 3.0671528, 101.332475 3.083048))",
      color: "#ff4000",
    },
    {
      name: "Area 7",
      geometry:
        "POLYGON ((101.4546204 2.9862417, 101.448138 2.72835, 101.477474 2.766274, 101.559411 2.807463, 101.6578674 2.8223442, 101.6468811 3.0150413, 101.4546204 2.9862417))",
      color: "#33ff00",
    },
    {
      name: "Area 8",
      geometry:
        "POLYGON ((101.6578674 2.8223442, 101.725067 2.83344, 101.756459 2.866068, 101.882828 2.870563, 101.8391418 3.0253266, 101.6468811 3.0150413, 101.6578674 2.8223442))",
      color: "#ff0033",
    },
  ];
  constructor() {
    this.initialize();
  }

  initialize(): void {
    // Add settings into view.
    const settingsHTML = `<div>
      <input type="checkbox" id="wazemySettings_kvmr_enable" style="margin-top:0px"/>
      <label for="wazemySettings_kvmr_enable">Klang Valley Map Raid</label><br></div>`;
    $("#wazemySettings_settings").append(settingsHTML);

    const settingsEl = document.getElementById(
      `wazemySettings_kvmr_enable`,
    ) as HTMLInputElement;

    const savedSettings = SettingsStorage.instance.getSetting("kvmr");
    if (savedSettings?.enable === true) {
      settingsEl.checked = true;
    } else {
      settingsEl.checked = false;
    }

    settingsEl.onchange = (e: Event): void => {
      const target = e.target as HTMLInputElement;
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

    mro_Map.addLayer(this.raid_mapLayer);

    this.areas.forEach((area) => {
      const geometry = parseWKT(area.geometry);
      this.addRaidPolygon(this.raid_mapLayer, geometry, area.color, area.name);
    });

    mro_Map.events.register("moveend", W.map, function () {
      currentRaidLocation();
    });
    mro_Map.events.register("zoomend", W.map, function () {
      currentRaidLocation();
    });

    console.log("PluginKVMR initialized.");

    /**
     * Updates the current raid location on the map based on the user's current location.
     *
     * @return {void} This function does not return anything.
     */
    function currentRaidLocation(): void {
      // Only run if the plugin is enabled. Workaround because unregistering events doesn't work.
      if ($("#wazemySettings_kvmr_enable").is(":checked") === false) {
        return;
      }

      var mro_Map = W.map;

      const mro_mapLayers = mro_Map.getLayersBy(
        "uniqueName",
        "__KlangValley",
      )[0];

      for (let i = 0; i < mro_mapLayers.features?.length; i++) {
        var raidMapCenter = mro_Map.getCenter();
        var raidCenterPoint = new OpenLayers.Geometry.Point(
          raidMapCenter.lon,
          raidMapCenter.lat,
        );
        const raid_mapLayer = mro_Map.getLayersBy(
          "uniqueName",
          "__KlangValley",
        )[0];
        var raidCenterCheck =
          raid_mapLayer.features[i].geometry.components[0].containsPoint(
            raidCenterPoint,
          );
        var holes = raid_mapLayer.features[i].attributes.holes;

        if (raidCenterCheck === true) {
          var str = $(
            "#topbar-container > div > div.location-info-region > div",
          ).text();

          const location: string[] = str.split(" - ");
          if (location.length > 1) {
            location[1] =
              "Klang Valley MapRaid " +
              raid_mapLayer.features[i].attributes.number;
          } else {
            location.push(
              "Klang Valley MapRaid " +
                raid_mapLayer.features[i].attributes.number,
            );
          }
          const raidLocationLabel = location.join(" - ");

          setTimeout(function () {
            $("#topbar-container > div > div.location-info-region > div").text(
              raidLocationLabel,
            );
          }, 200);
          if (holes === "false") {
            break;
          }
        }
      }
    }

    function parseWKT(wkt: string): { lon: string; lat: string }[] {
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

  enable(): void {
    this.raid_mapLayer.setVisibility(true);
    console.log("PluginKVMR enabled.");
  }

  disable(): void {
    this.raid_mapLayer.setVisibility(false);
    const mro_map = W.map;
    mro_map.events.unregister("moveend", W.map);
    mro_map.events.unregister("zoomend", W.map);

    console.log("PluginKVMR disabled.");
  }

  updateSettings(settings: any): void {
    if (settings.enable === true) {
      this.enable();
    } else {
      this.disable();
    }
    console.log("PluginKVMR settings updated", settings);
  }

  addRaidPolygon(
    raidLayer: any,
    groupPoints: any,
    groupColor: any,
    groupNumber: any,
  ): void {
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
      const convPoint = new OpenLayers.Geometry.Point(
        groupPoints[i].lon,
        groupPoints[i].lat,
      ).transform(
        new OpenLayers.Projection("EPSG:4326"),
        mro_Map.getProjectionObject(),
      );
      //console.log('MapRaid: ' + JSON.stringify(groupPoints[i]) + ', ' + groupPoints[i].lon + ', ' + groupPoints[i].lat);
      pnt.push(convPoint);
    }

    var ring = new mro_OL.Geometry.LinearRing(pnt);
    var polygon = new mro_OL.Geometry.Polygon([ring]);

    var feature = new mro_OL.Feature.Vector(polygon, attributes, style);
    raidLayer.addFeatures([feature]);
  }
}
