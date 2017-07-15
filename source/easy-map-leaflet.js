import {EasyMap} from 'easy-maps';
import {map, tileLayer} from 'leaflet';

export class EasyMapLeaflet extends EasyMap {
    static engineName = 'Leaflet';
    mount(target) {
        this.map = map(target).setView([51.505, -0.09], 13);
        tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
}
