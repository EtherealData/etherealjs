import Base from './_base.js';

export default class Router extends Base {
	constructor(config) {
		super(config);
	}
	_onLoaded(){
		if(!this.routes || !this.runtime) {
			throw new Error('Config missing routes or runtime')
        }
        console.log('got pathname', window.location.pathname);
		this.path = window.location.pathname;
		if(this.routes[this.path]) {
			new this.runtime.library[this.routes[this.path]]({
				origin: this, 
				context: this.context, 
				attributes: this.context.attributes, 
				runtime: this.runtime
			});
		}
		super._onLoaded();
	}

}