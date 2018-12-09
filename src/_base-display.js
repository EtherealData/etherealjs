import Base from './_base.js';
import Static from './static.js';
import Runtime from './runtime.js'
import Router from './router.js'

export default class BaseDisplay extends Base {
    constructor(config) {
        super(config);
    }
    _onLoaded(config) {
        this.runtime = this.runtime || {};
        this.context = this.context || null;
        this.attributes = this.attributes || null;
        this.properties = this.properties || {};
        this.origin = this.origin || null;
        this.parent = this.context.parentNode || null;
        this.cache = {
            children: []
        };

        if(!this.parent) {
            return;
        }

        this.state = Static.stampPID(this.pid, this.draw());
        this.context.outerHTML = this.state;
        this.runtime.processes[this.pid] = this;

        this.style && this.decorate(this.style());

        if(this.origin instanceof Runtime || this.origin instanceof Router) {
            this.runtime.processes.roots[this.pid] = this;
        }

        this.bind();
        this.resolve();
    }


    bind() {
        const instance = Static.getDOMInstance(this.pid);
        const components = [...instance.querySelectorAll('[e]')];

        instance.hasAttribute('e') && components.push(instance);

        components.forEach((element, index) => {
            element.removeAttribute('e');
            element.setAttribute('has-events', true);
            this.attach(element);
        });

        return this.context;
    }
    resolve() {
        const children = [...Static.getDOMInstance(this.pid).querySelectorAll('Component')];

        children.forEach((component, index) => {
            const definition = component.getAttribute('definition');
            const properties = {};
            const attributes = component.attributes;

            if(!definition || !this.runtime.library[definition]){
                throw new Error(`Couldn't find library definition for ${definition}`)
            }

            const instance = new this.runtime.library[definition]({
                    runtime: this.runtime,
                    context: component,
                    origin: this,
                    attributes: component.attributes,
                    properties: properties
                });

            const element = Static.getDOMInstance(instance.pid);

            [...attributes].forEach((att)=>{
                element.setAttribute(att.name, att.value);
            });

            this.attach(element);
        });
    }

    attach(element) {
        let scope = element.getAttribute('scope') || 'instance';
        let events = Static.getEventMap();
        for(let i = 0; i < element.attributes.length; i++){
            if(events[element.attributes[i]['name']] && element.attributes[i]['value']) {
                if(!this[element.attributes[i]['value']]) {
                    console.warn('Trying to bind event handler to non-existent function', this, element);
                    continue;
                }
                switch (scope) {
                    case 'element':
                        element.addEventListener(events[element.attributes[i]['name']], 
                            (ev) => this[element.attributes[i]['value']].call(element, ev) );
                        break;
                    default:
                        element.addEventListener(events[element.attributes[i]['name']], 
                            (ev) => this[element.attributes[i]['value']].call(this, ev) );
                        break;
                }
            }
        }
    }

    decorate(map){
            let sheet = document.createElement('style');
            document.body.appendChild(sheet);   
            sheet.innerHTML = Static.getStyleSheetFromMap(map, this.pid);
            sheet.setAttribute('belongs-to', this.pid);
    }

}
