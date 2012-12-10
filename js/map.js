"use strict";

   
(function(){  
    var canvas="map_canvas";
    var utils = jrdtest.tzm.utils;

    if (!utils){
        throw new Error("Utils not loaded");
    }
 
     var createMap = function (location, target, scale) {
        if (arguments.length < 2 || arguments[0].lat===undefined || arguments[0].lng===undefined) {
            throw new Error("Cannot create Map, parameter wrong");
        }

        if (google.maps.LatLng){
            var latlng = new google.maps.LatLng(location.lat, location.lng);
            var myOptions = {
                zoom: scale,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(target),
            myOptions);
        }
        else {
            throw new Error("Cannot load map object");
        }
    }  

    document.write('<script src="http://maps.google.com/maps/api/js?sensor=true" type="text/javascript"></script>');
	
    window.addEventListener("load", function(){createMap({lat:31.333, lng:121.544}, canvas, 10)}, false);
  })();
