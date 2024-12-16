import {makeAutoObservable} from "mobx";

export default class InsurancePolicyStorage {
    constructor() {
        this._policies = [
            {coverage: 1, terms: 1, exclusions: 1, price: 1},
            {coverage: 1, terms: 1, exclusions: 1, price: 1},
        ]
        makeAutoObservable(this);
    }

    setPolicies(policies) {
        this._policies = policies;
    }

    get policies() {
        return this._policies;
    }
}