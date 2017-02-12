var sevenSummits = [{
            name: "Mt. Everest",
            longitude: 86.925,
            latitude: 27.9878
        }, {
            name: "Mt. Aconcagua",
            longitude: -70.0109,
            latitude: -32.6532
        }, {
            name: "Mt. Denali",
            longitude: -151.0070,
            latitude: 63.0692
        }, {
            name: "Mt. Kilimanjaro",
            longitude: 37.3556,
            latitude: -3.0674
        }, {
            name: "Mt. Elbrus",
            longitude: 42.4453,
            latitude: 43.3499
        }, {
            name: "Mt. Vinson",
            longitude: -85.2135,
            latitude: -78.6341
        }, {
            name:"Mt. Kosciuszko",
            longitude: 148.2636,
            latitude: -36.4559
        }
    ];


//load dojo module containing arcgis api
require(["esri/Map","esri/views/MapView",
        "esri/layers/GraphicsLayer", "esri/Graphic",
        "esri/geometry/Polyline", "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Point", "esri/symbols/SimpleMarkerSymbol",
        "esri/geometry/Polygon", "esri/symbols/SimpleFillSymbol",
        "esri/geometry/support/webMercatorUtils", "esri/symbols/TextSymbol",
        "esri/layers/FeatureLayer",
         "dojo/domReady!"], 
    function(Map, MapView, GraphicsLayer, Graphic,
            Polyline, SimpleLineSymbol, Point, SimpleMarkerSymbol,
            Polygon, SimpleFillSymbol, webMercatorUtils, TextSymbol,
            FeatureLayer){

        var map = new Map({
            basemap: "hybrid"
        });

        
        var view = new MapView({
            container: "viewDiv",  
            map: map,
            center: [-.01, 50],
            zoom: 3     
        });

        //when map is loaded populate the seven summits
        view.then(() => {
            console.log("Map loaded");
            var summitCoords = sevenSummits.map(summit => {
                return createMapPoint(summit.latitude, summit.longitude, summit.name);
            });
            
            view.graphics.addMany(summitCoords);
            view.popup.features = summitCoords;
            view.popup.dockEnabled = true; //dock popup to upper right of map
            view.popup.visible = true;
        });


        //handle user submit coordinates to create map point
        document.getElementById('searchSubmit').onclick = function(event) {
            var lat = document.getElementById('startLat').value;
            var lon = document.getElementById('startLon').value;
            var point = createMapPoint(lat, lon);
             view.graphics.add(point);
                view.goTo({
                    target: point,
                    zoom: 13
                }, {duration: 5000});
        }
        

 
        //create a map point
        function createMapPoint(lat, lon, label) {
            console.log("creating point");
            var point = new Point ({
                longitude: lon,
                latitude: lat
            });

            var pointSymbol = new SimpleMarkerSymbol({
                    color: [226, 40, 40],
                    outline: {
                        color: [255, 255, 255],
                        width: 5
                    }
            });

            var pointAtt = {
                Name: label,
                Coords: `${lat}, ${lon}`
            }
   
            var pointGraphic = new Graphic({
                    geometry: point,
                    symbol: pointSymbol,
                    attributes: pointAtt,
                    popupTemplate: { // autocasts as new PopupTemplate()
                    title: "{Name}",
                    content: [{
                        type: "fields",
                        fieldInfos: [{
                        fieldName: "Name"
                        }, {
                        fieldName: "Coords"
                        }]
                    }]
                    }
            });
            return pointGraphic;
         }
});

