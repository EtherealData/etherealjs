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
        let instance = document.querySelector(`[component-pid="${this.pid}"]`),
            parent = instance.parentNode;
        instance.outerHTML = Static.stampPID(this.pid, this.draw());
        let newInstance = document.querySelector(`[component-pid="${this.pid}"]`)
        let components = [...newInstance.querySelectorAll('Component')];
        components.forEach((component, index) => {
            let pid = this.cache.children[index].pid;
            component.outerHTML = Static.stampPID(pid, this.cache.children[index].draw());
            this.cache.children[index].bind();
        });
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
