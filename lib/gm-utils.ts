import { CountryShape } from './models';

export function drawCountryShape(
  map: google.maps.Map,
  countryCoordinates: CountryShape
): google.maps.Polygon {
  const countryShape = new google.maps.Polygon({
    map,
    paths: countryCoordinates.coord,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2,
    draggable: true,
  });
  countryShape.setMap(map);
  return countryShape;
}
