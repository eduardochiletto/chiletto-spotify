$(document).ready(function () {
    'use strict';

    function initialize() {
        $(".google-map").each(function (index) {

            //Taking data attribute from map wrapper
            var mapLat = parseFloat($(this).data('lat'));
            var mapLng = parseFloat($(this).data('lng'));
            var mapZoom = parseInt($(this).data('zoom'));

            //Processing wrapper data attribute to coordinate
            var mapOptions = {
                center: {
                    lat: mapLat,
                    lng: mapLng
                },
                zoom: mapZoom,
                scrollwheel: false,
                styles: [
                    {
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#b6ebff"
      }
    ]
  },
                    {
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#579db7"
      }
    ]
  },
                    {
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
      }
    ]
  },
                    {
                        "featureType": "administrative",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#9fe5ff"
      }
    ]
  },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#2990b6"
      }
    ]
  },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#2990b6"
      }
    ]
  },
                    {
                        "featureType": "administrative.locality",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
      }
    ]
  },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#b6ebff"
      }
    ]
  },
                    {
                        "featureType": "poi",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#d9f4ff"
      }
    ]
  },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#317791"
      }
    ]
  },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#317791"
      }
    ]
  },
                    {
                        "featureType": "poi",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
      }
    ]
  },
                    {
                        "featureType": "road",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#b8ecff"
      }
    ]
  },
                    {
                        "featureType": "road",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#317791"
      }
    ]
  },
                    {
                        "featureType": "road",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#317791"
      }
    ]
  },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#317791"
      }
    ]
  },
                    {
                        "featureType": "road",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
      }
    ]
  },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#b5e8fb"
      }
    ]
  },
                    {
                        "featureType": "road.highway",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#387e98"
      }
    ]
  },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text",
                        "stylers": [
                            {
                                "color": "#387e98"
      }
    ]
  },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.fill",
                        "stylers": [
                            {
                                "color": "#387e98"
      }
    ]
  },
                    {
                        "featureType": "road.highway",
                        "elementType": "labels.text.stroke",
                        "stylers": [
                            {
                                "color": "#ffffff"
      }
    ]
  },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#ffffff"
      }
    ]
  },
                    {
                        "featureType": "road.local",
                        "elementType": "geometry.stroke",
                        "stylers": [
                            {
                                "color": "#4ea9cb"
      },
                            {
                                "weight": 1
      }
    ]
  },
                    {
                        "featureType": "water",
                        "elementType": "geometry.fill",
                        "stylers": [
                            {
                                "color": "#97ddf7"
      }
    ]
  }
]
            };

            //Initiating map
            var map = new google.maps.Map(this, mapOptions);

            //Map Marker
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(mapLat, mapLng),
                map: map,
                icon: 'images/map-marker.png'
            });
        });
    }
    google.maps.event.addDomListener(window, 'load', initialize);
});
