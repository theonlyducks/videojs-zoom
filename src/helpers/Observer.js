export class Observer {

	static _instance = null;

	constructor() {
		this._listeners = [];
	}

	static getInstance() {
		if (!Observer._instance) {
			Observer._instance = new Observer();
		}
		return Observer._instance;
	}

	subscribe(event, callback) {
		this._listeners.push({ event, callback });
	}

	notify(event, data) {
		this._listeners.forEach(listener => {
			if(listener.event === event) {
				return listener.callback(data);
			}
		});
	}

}
