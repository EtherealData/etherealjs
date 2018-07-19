import Static from './static.js';

export default class Base {
    constructor(config) {

        this.pid = Static.generatePID();
        this._onInstantiate && this._onInstantiate(config);

        if(config && Object.keys(config) && Object.keys(config).length > 0){
            for(let key in config){
                if(this[key]) {
                    console.warn(`ODComponent - passed key ${key} in config which is already bound`);
                    continue;
                }
                this[key] = config[key];
            }
        }

        this.properties = this.properties || {};
        this._onLoaded && this._onLoaded(config);
    }

    setProperty(key, value) { this.properties[key] = value; }
    
    _onInstantiate(config) { }
    
    _onLoaded(config) { }

}