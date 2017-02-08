
//load dojo module containing arcgis api
require(["esri/Map","esri/views/SceneView", "esri/layers/GraphicsLayer",
        "esri/Graphic", "esri/geometry/Point", "esri/geometry/Polyline",
        "esri/geometry/Polygon", "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", 
        "esri/geometry/Circle", "esri/geometry/support/webMercatorUtils", "dojo/domReady!"], 
    function(Map, SceneView, GraphicsLayer, Graphic, Point,
            Polyline, Polygon, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol,
            Circle, webMercatorUtils){
        var map = new Map({
            basemap: "streets",
            ground: "world-elevation"
        });
        var view = new SceneView({
            container: "viewDiv",     
            map: map,                 
            scale: 50000000,          
            camera: {
                position: {
                    x: -0.2,
                    y: 51.4,
                    z: 1266.7
                },
            heading: 0.34,
            tilt: 83
            } 
        });
        
        //create graphics layer
        var graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        //marker point graphic
        var marker = new Point({
            x: -0.178,
            y: 51.48791,
            z: 1010
        }),

        markerSymbol = new SimpleMarkerSymbol({
            color: [226, 40, 40],
            outline: {
                color: [255, 255, 255],
                width: 5
            }
        });

        var markerGraphic = new Graphic({
            geometry: marker,
            symbol: markerSymbol
        });

        
        //marker line graphic
        var markerLine = new Polyline([
            [-0.178, 51.48791, 0],
            [-0.178, 51.48791, 1000]
          ]),

          markerLineSymbol = new SimpleLineSymbol({
            color: [226, 40, 40],
            width: 10
          });

        var markerLineGraphic = new Graphic({
          geometry: markerLine,
          symbol: markerLineSymbol
        });

        
        //marker rings graphic
        //first and last points need to be the same
        var markerRings = new Polygon({
            rings: [
                [
                    [-0.184, 51.48391, 400],
                    [-0.184, 51.49091, 500],
                    [-0.172, 51.49091, 500],
                    [-0.172, 51.48391, 400],
                    [-0.184, 51.48391, 400]
                ], 
                [
                    [-0.184, 51.48391, 200],
                    [-0.184, 51.49091, 300],
                    [-0.172, 51.49091, 300],
                    [-0.172, 51.48391, 200],
                    [-0.184, 51.48391, 200]
                ],
                [
                    [-0.184, 51.48391, 600],
                    [-0.184, 51.49091, 700],
                    [-0.172, 51.49091, 700],
                    [-0.172, 51.48391, 600],
                    [-0.184, 51.48391, 600]
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

        //add marker rings graphic to screen
        graphicsLayer.add(markerGraphic);
        graphicsLayer.add(markerLineGraphic);
        graphicsLayer.add(markerRingsGraphic);


        //write function that translates user input (lat/lon to x/y)
        //assign start values to a map marker
        //assign end values to a map marker
        //place map markers
        //assign start and end values to a polyline connecting points
        
    
});

