/* eslint-disable */

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoib2NoYW5pc3NpIiwiYSI6ImNrM3lycWVmMzBvMHAzbHA2NWw4MHF5OWoifQ.jUok_FWVOlBb_7866W6pyA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/ochanissi/ck3yrv7ik0hij1cnz20qas2x6',
    scrollZoom: false
    //   center: [25.781842, -80.128473],
    //   zoom: 10,
    //   interactive: false
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom'
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 30
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p> ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend the map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100
    }
  });
};
