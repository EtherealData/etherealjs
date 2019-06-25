import Base from "./_base.js";
import Static from "./static.js";
import Runtime from "./runtime.js";
import Router from "./router.js";
import Satellite from "./satellite.js";

export default class BaseDisplay extends Base {
  constructor(config) {
    super(config);
  }
  _onLoaded(config) {
    this.runtime = config.runtime;
    this.context = config.context;
    this.attributes = config.attributes;
    this.origin = config.origin;
    this.children = config.children;
    this.parent = this.context.parentNode || null;
    this.cache = {
      children: []
    };

    if (!this.parent) {
      return;
    }

    this.componentWillRender && this.componentWillRender();

    this.state = Static.stampPID(this.pid, this.draw());
    this.context.outerHTML = this.state;
    this.runtime.processes[this.pid] = this;

    this.style && this.decorate(this.style());

    if (this.origin instanceof Runtime || this.origin instanceof Router) {
      this.runtime.processes.roots[this.pid] = this;
    }
    this.bind();
    this.resolve();
    this.componentDidRender && this.componentDidRender();
  }

  bind() {
    const instance = Static.getDOMInstance(this.pid);
    const components = [...instance.querySelectorAll("[e]")];

    instance.hasAttribute("e") && components.push(instance);

    components.forEach((element, index) => {
      element.removeAttribute("e");
      element.setAttribute("has-events", true);
      this.attach(element);
    });

    return this.context;
  }
  resolve() {
    const domInstance = Static.getDOMInstance(this.pid);

    if (this.children) {
      const container = document.createElement("div");
      container.innerHTML = this.children;
      domInstance.appendChild(container);
    }
    const contained = [...domInstance.querySelectorAll("Component")];

    contained.forEach((component, index) => {
      const definition = component.getAttribute("definition");
      const satellite = component.getAttribute("subscribe");
      const children = component.innerHTML;
      const properties = {};
      const attributes = component.attributes;

      if (!definition || !this.runtime.library[definition]) {
        throw new Error(`Couldn't find library definition for ${definition}`);
      }

      const instance = new this.runtime.library[definition]({
        runtime: this.runtime,
        context: component,
        origin: this,
        attributes: component.attributes,
        properties: properties,
        satellites: {},
        children
      });

      if (satellite && this.runtime.library[satellite] instanceof Satellite) {
        this.runtime.library[satellite].subscribe(instance);
        instance.satellites[satellite] = this.runtime.library[satellite];
      }

      const element = Static.getDOMInstance(instance.pid);

      [...attributes].forEach(att => {
        element.setAttribute(att.name, att.value);
      });

      this.attach(element);
    });
  }

  attach(element) {
    let scope = element.getAttribute("scope") || "instance";
    let events = Static.getEventMap();
    for (let i = 0; i < element.attributes.length; i++) {
      if (
        events[element.attributes[i]["name"]] &&
        element.attributes[i]["value"]
      ) {
        if (!this[element.attributes[i]["value"]]) {
          console.warn(
            "Trying to bind event handler to non-existent function",
            this,
            element
          );
          continue;
        }
        switch (scope) {
          case "element":
            element.addEventListener(
              events[element.attributes[i]["name"]],
              ev => this[element.attributes[i]["value"]].call(element, ev)
            );
            break;
          default:
            element.addEventListener(
              events[element.attributes[i]["name"]],
              ev => this[element.attributes[i]["value"]].call(this, ev)
            );
            break;
        }
      }
    }
  }

  decorate(map) {
    let sheet = document.createElement("style");
    document.body.appendChild(sheet);
    sheet.innerHTML = Static.getStyleSheetFromMap(map, this.pid);
    sheet.setAttribute("belongs-to", this.pid);
  }
}
