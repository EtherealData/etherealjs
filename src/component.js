import BaseDisplay from './_base-display.js';
import Static from './static.js'

export default class Component extends BaseDisplay {
    constructor(config) {
        super(config);
    }
    _onLoaded() {
        let properties = Static.getPropertiesFromAttributeList(this.attributes);
        this.properties = Object.assign(this.properties, properties);
        super._onLoaded();
    }
    synchronize() {
        const instance = document.querySelector(`[component-pid="${this.pid}"]`);

        instance.outerHTML = Static.stampPID(this.pid, this.draw());

        this.resolve();
        this.bind()
    }
    destroy(entirety) {
        let instance = Static.getDOMInstance(this.pid),
            root = Static.getDOMInstance(this.runtime.pid);
        if(!instance) {
            return;
        }
        instance.parentNode.removeChild(instance);
        entirety && root && root.parentNode.removeChild(root);
    }
    setProperty(key, value) {
        super.setProperty(key, value);
        this.synchronize();
    }
    setRuntimeProperty(key, value) {
        this.runtime.setProperty(key, value);
        for(let root in this.runtime.processes.roots){
            this.runtime.processes.roots[root].synchronize();
        }
    }
}
