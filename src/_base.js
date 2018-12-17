import Static from './static.js';

export default class Base {
    constructor(config) {
        this.pid = Static.generatePID();

        this._construct(config);

        this._onLoaded(config);
    }

    setStore(map) { this.store = map; }
    
    _construct(config) { }

    _onInstantiate(config) { }
    
    _onLoaded(config) { }

    _onTerminate(process) { }

}