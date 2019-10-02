import BaseDisplay from './_base-display.js';
import Static from './static.js';

export default class Component extends BaseDisplay {
    constructor(config) {
        super(config);
    }
    _construct(config) {
        this.atts = Static.getPropertiesFromAttributeList(config.attributes);
    }
    synchronize() {
        const instance = document.querySelector(
            `[component-pid="${this.pid}"]`
        );

        if (!instance) return this.terminate();

        instance.outerHTML = Static.stampPID(this.pid, this.draw());

        this.resolve();
        this.bind();
        this.decorate();
    }
    terminate() {
        this.runtime.terminate(this);
        this._onTerminate(this);
    }
    setStore(map) {
        super.setStore(map);
        this.synchronize();
        this.decorate();
    }
    setRuntimeStore(map) {
        this.runtime.setStore(map);
        for (let root in this.runtime.processes.roots) {
            this.runtime.processes.roots[root].synchronize();
        }
    }
}
