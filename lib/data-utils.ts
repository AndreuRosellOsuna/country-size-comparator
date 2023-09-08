import { CountryShape } from './models';

export async function getCountryCoordinates(
  countryName: string
): Promise<CountryShape> {
  const response = await fetch(
    `https://public.opendatasoft.com/api/records/1.0/search/?dataset=country_shapes&q=${countryName}&facet=iso2`
  );
  if (response.ok) {
    const countryResponse = await response.json();

    const countriesRetourned = countryResponse.records.length;
    switch (countriesRetourned) {
      case 0:
        throwError('be more precise');
      case 1:
        //OK
        break;
      default:
        throwError('too many countries');
        break;
    }

    const position = countryResponse.records[0].geometry.coordinates;
    const arrayOfCoord =
      countryResponse.records[0].fields.geo_shape.coordinates;

    let boundaryCoordinates;
    if (arrayOfCoord[0][0][0][0] !== undefined) {
      // In the case the country has two or more territories
      const biggerShapeIndex = getBiggerShapeIndex(arrayOfCoord);
      boundaryCoordinates = arrayOfCoord[biggerShapeIndex][0];
    } else {
      boundaryCoordinates = arrayOfCoord[0];
    }

    return {
      coord: boundaryCoordinates.map((coord) => {
        return {
          lat: coord[1],
          lng: coord[0],
        };
      }),
      position: {
        lat: position[1],
        lng: position[0],
      },
    };
  } else {
    return { coord: undefined, position: { lat: 0, lng: 0 } };
  }
}

function getBiggerShapeIndex(arrayOfCoord): number {
  const orderedCoordinates = arrayOfCoord
    .map((element) => {
      return element[0];
    })
    .map((shapeCoord, index) => {
      return { index, length: shapeCoord.length };
    })
    .sort((a, b) => {
      return b.length - a.length;
    });
  return orderedCoordinates[0].index;
}

function throwError(error: string) {
  alert(error);
  throw error;
}
