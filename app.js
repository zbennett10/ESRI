
//load dojo module containing arcgis api
require(["esri/Map","esri/views/SceneView", "esri/layers/GraphicsLayer",
        "esri/Graphic", "esri/geometry/Point", "esri/geometry/Polyline",
        "esri/geometry/Polygon", "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", 
        "esri/geometry/Circle", "esri/geometry/support/webMercatorUtils", "dojo/domReady!"], 
    function(Map, SceneView, GraphicsLayer, Graphic, Point,
            Polyline, Polygon, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
            Circle, webMercatorUtils){
        let startLat;
        let startLon;
        let endLat;
        let endLon;
        
        var map = new Map({
            basemap: "streets",
            ground: "world-elevation"
        });
        var view = new SceneView({
            container: "viewDiv",     
            map: map,                 
            scale: 50000000    
            // camera: {
            //     position: {
            //         x: -0.2,
            //         y: 51.4,
            //         z: 1266.7
            //     }
            // heading: 0.34,
            // tilt: 83
            //} 
        });
        
        //create graphics layer
        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);
        

        //add marker to map -- break these into one function call
       //createMapMarker(-0.178, 51.48791);
        
        
        
        //fix markerline and rings not showing up
        //assign start and end values to a polyline connecting points
        document.getElementById('searchSubmit').onclick = function(event) {
            event.preventDefault();
            var startLat = document.getElementById('startLat').value;
            var startLon = document.getElementById('startLon').value;
            var endLat = document.getElementById('endLat').value;
            var endLon = document.getElementById('endLon').value;
            createMapMarker(startLon, startLat);
            createMapMarker(endLon, endLat);
        }
        

        function createMapMarker(lon, lat) {
            createMarkerPoint(lon, lat);
            createMarkerLine(lon, lat);
            createMarkerRings(lon, lat);
        }

        //create map point
        function createMarkerPoint(lon, lat) {
            var point = new Point({
                    x: lon,
                    y: lat,
                    z: 1010
            }),

            pointSymbol = new SimpleMarkerSymbol({
                color: [226, 40, 40],
                outline: {
                    color: [255, 255, 255],
                    width: 5
                }
            });

            var pointGraphic = new Graphic({
                geometry: point,
                symbol: pointSymbol
            });

            graphicsLayer.add(pointGraphic);
        }

        //create map line
        function createMarkerLine(lon, lat) {

            var markerLine = new Polyline([
                [lon, lat, 0],
                [lon, lat, 1000]
            ]),

            markerLineSymbol = new SimpleLineSymbol({
                color: [226, 40, 40],
                width: 10
            });

            var markerLineGraphic = new Graphic({
                geometry: markerLine,
                symbol: markerLineSymbol
            });

            graphicsLayer.add(markerLineGraphic);
        }
       
       //create map rings  -0.178, 51.48791
        function createMarkerRings(lon, lat) {
            var xOffsetTop = lon - .006;
            var xOffsetBottom = lon + .006;
            var yOffsetTop = lat - .004;
            var yOffsetBottom = lat + .003;
            var markerRings = new Polygon({
                rings: [
                    [
                        [xOffsetTop, yOffsetTop, 400],
                        [xOffsetTop, yOffsetBottom, 500],
                        [xOffsetBottom, yOffsetBottom, 500],
                        [xOffsetBottom, yOffsetTop, 400],
                        [xOffsetTop, yOffsetTop, 400]
                    ], 
                    [
                        [xOffsetTop, yOffsetTop, 200],
                        [xOffsetTop, yOffsetBottom, 300],
                        [xOffsetBottom, yOffsetBottom, 300],
                        [xOffsetBottom, yOffsetTop, 200],
                        [xOffsetTop, yOffsetTop, 200]
                    ],
                    [
                        [xOffsetTop, yOffsetTop, 600],
                        [xOffsetTop, yOffsetBottom, 700],
                        [xOffsetBottom, yOffsetBottom, 700],
                        [xOffsetBottom, yOffsetTop, 600],
                        [xOffsetTop, yOffsetTop, 600]
                    ]
                ]
            }),

            fillSymbol = new SimpleFillSymbol({
                color: [227, 40, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                color: [255, 255, 255],
                width: 1
                }
            });

            var markerRingsGraphic = new Graphic({
                geometry: markerRings,
                symbol: fillSymbol
            });

            graphicsLayer.add(markerRingsGraphic);
        }

    
});

