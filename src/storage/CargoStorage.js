import {makeAutoObservable} from "mobx";

export default class CargoStorage {
    constructor() {
        this._types = [
            {type_name: 1, max_weight: 1, price_km: 1, probability: 1, img: 1},
            {type_name: 2, max_weight: 2, price_km: 2, probability: 2, img: 2}
        ]
        this._features = [
            {feature_name: 1, max_weight: 1, price_km: 1, impact: 1, img: 1},
            {feature_name: 2, max_weight: 2, price_km: 2, impact: 2, img: 2}
        ]
        this._cargos = [
            {weight: 1, route_from: 1, route_to: 1, km: 1, price: 1},
            {weight: 2, route_from: 2, route_to: 2, km: 2, price: 2}
        ]
        makeAutoObservable(this);
    }

    setTypes(types) {
        this._types = types;
    }
    setFeatures(features) {
        this._features = features;
    }
    setCargos(cargos) {
        this._cargos = cargos;
    }

    get types() {
        return this._types;
    }
    get features() {
        return this._features;
    }
    get cargos() {
        return this._cargos;
    }
}