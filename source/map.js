import {EasyMap} from 'easy-maps';
import {map, tileLayer} from 'leaflet';

export class LeafletMap extends EasyMap {
    mount(target) {
        this.map = map(target).setView([41.383333, 2.183333], 13);
        tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }
    get isMounted() {
        return Boolean(this.map);
    }
}
