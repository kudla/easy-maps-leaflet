import {EasyView} from 'easy-maps';

export class LeafletView extends EasyView {
    set rotation(valueIgnored) {
        // eslint-disable-next-line no-console
        console.warn('Leaflet does not support map rotation');
    }
    set center({value: [lng, lat], transition}) {
        let {map: {map}} = this;
        let mapCenter = map.getCenter();
        let center = [lat, lng];
        if (!mapCenter.equals(center)) {
            if (transition) {
                this.animate({center}, {animate:true, duration: transition / 1000});
            } else {
                this.panTo(center, {animate: false});
            }
        }
    }
    set zoom({value: zoom, transition}) {
        let {map: {map}} = this;
        let mapZoom = map.getZoom();
        if (zoom !== mapZoom) {
            if (transition) {
                if (transition) {
                    this.animate({zoom}, {animate:true});
                } else {
                    this.setZoom(zoom, {animate: false});
                }
            }
        }
    }
    animate(props, options) {
        let {_animation} = this;
        if (_animation) {
            this._animation = {
                props: {
                    ..._animation.props,
                    ...props
                },
                options: {
                    ..._animation.options,
                    ...options
                }
            };
        } else {
            let {map:{map}} = this;
            this._animation = {
                props, options
            };
            setTimeout(() => {
                let {_animation: {props: {center, zoom}, options}} = this;
                delete this._animation;
                map.setView(center || map.getCenter(), zoom, options);
            });
        }
    }
}
