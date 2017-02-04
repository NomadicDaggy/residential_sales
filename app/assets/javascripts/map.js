function makeMap() {
  // initialize the map on the "map" div with a given center and zoom
  L.mapbox.accessToken = $('body').data('mapboxToken');
  var map = L.mapbox.map('map', 'mapbox.streets')
    .setView([39.045753, -76.641273], 9);

  var featureLayer = L.mapbox.featureLayer()
    .loadURL('/map/map_data.json')
    .addTo(map);

  // featureLayer.getBounds() returns the corners of the furthest-out
  // markers. map.fitBounds() makes sure the map contains these.
  featureLayer.on('ready', function(e) {
    map.fitBounds(featureLayer.getBounds());
  });
}