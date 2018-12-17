import Base from './_base.js';
import Static from "./static.js";
import Router from './router.js';

export default class Runtime extends Base {
    _construct(config) {
        this.container = config.container;
        this.context = this.container && document.querySelector(this.container) || document.body;
        this.styles = config.styles;
        this.styles && this.decorate(this.styles());
        this.processes = {
            roots: {}
        };

        this.library = config.library;

        this.route();

        const  components = [...this.context.querySelectorAll('Component')];

        if(this.definition) {
            let shadow = document.createElement("shadow");
            this.context = this.context.appendChild(shadow);
            new this.library[this.definition]({
                context: this.context,
                origin: this,
                runtime: this,
                attributes: this.context.attributes
            });
        }

        if(components && components.length) {
            components.forEach((component, index) => {
                const definition = component.getAttribute('definition');
                const satellite = component.getAttribute('subscribe');
                if(!definition || !this.library[definition]){
                    console.warn('Found component with no definition. Skipping');
                    return;
                }
                const process = new this.library[definition]({
                    context: component,
                    origin: this,
                    runtime: this,
                    attributes: component.attributes
                });
                this.processes[process.pid] = process;
                if(satellite && this.library[satellite]) {
                    this.library[satellite].subscribe(process);
                }
            });
            return;
        }
    }
    route() {
        let RouterElement = document.querySelector('Router') || null;
        if(this.routes || RouterElement){
            console.warn('Found a router. Deferring drawing of components');
            this.routes = this.routes || {};
            if(RouterElement) {
                let routes = [...RouterElement.querySelectorAll('Route')];
                routes.forEach((route, index) => {
                    let definition = route.getAttribute('definition'),
                        path = route.getAttribute('path');
                    if(!definition || !path || !this.library[definition]) {
                        console.warn('Found route with invalid definition or path', definition, route);
                    }
                    this.routes[path] = definition; 
                });
            } else {
                RouterElement = document.createElement('Router');
                RouterElement = this.context.appendChild(RouterElement); 
            }
            this.router = new Router({routes: this.routes, runtime: this, context: RouterElement});
            return true;
        }
        return false;
    }
    terminate(process) {
        delete this.processes[process.pid];
    }
    decorate(map) {
        let sheet = document.createElement('style');
        document.body.appendChild(sheet);
        sheet.innerHTML = Static.getStyleSheetFromMap(map);
        sheet.setAttribute('belongs-to', this.pid);
    }
}
