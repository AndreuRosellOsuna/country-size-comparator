import { CENTER } from './lib/models';
import { MapDemo } from './lib/map-demo';

async function initMap(): Promise<void> {
  const map = new google.maps.Map(
    document.getElementById('map') as HTMLElement,
    {
      disableDefaultUI: true,
      zoom: 3,
      center: CENTER,
      mapTypeId: 'terrain',
    }
  );
  new MapDemo(map);
}

declare global {
  interface Window {
    initMap: () => void;
  }
}
window.initMap = initMap;
export {};
