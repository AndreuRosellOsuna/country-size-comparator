export interface CountryShape {
  coord: [Coordinate] | undefined;
  position: Coordinate;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export const CENTER = { lat: 0, lng: 0 };
