import Base from './_base.js';

export default class Satellite extends Base {
    _construct(config) {
        this.subscribers = {};
        console.log('got config')
        this.store = config;
    }
    subscribe(component) {
        this.subscribers[component.pid] = component;
        this.subscribers[component.pid]._onTerminate = (process) => {
            this.unsubscribe(component);
        }
        console.log(component, 'just subscribed', this.subscribers)
    }
    unsubscribe(component) {
        delete this.subscribers[component.pid];
        console.log('Unsubscribed ',component, this.subscribers);
    }
    publish(map) {
        this.setStore(map);
        for(let subscriber in this.subscribers) {
            this.subscribers[subscriber].synchronize();
        }
    }
}