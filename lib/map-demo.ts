import { getCountryCoordinates } from './data-utils';
import { CountryShape, CENTER } from './models';
import { createMenu } from './ui-utils';
import { drawCountryShape } from './gm-utils';

export class MapDemo {
  private map_: google.maps.Map;
  private actualShape_?: google.maps.Polygon;

  constructor(map: google.maps.Map) {
    this.map_ = map;
    createMenu(map, this.searchAndDrawCountry, this.removeActualShape);
  }

  private searchAndDrawCountry = async (country: string) => {
    const countryCoordinates = (await getCountryCoordinates(
      country
    )) as CountryShape;

    if (this.actualShape_) this.removeActualShape();
    this.actualShape_ = drawCountryShape(this.map_, countryCoordinates);
    this.map_.setCenter(countryCoordinates.position);
  };

  private removeActualShape = (): void => {
    this.actualShape_?.setMap(null);
    this.actualShape_ = undefined;
    this.map_.setCenter(CENTER);
  };
}
