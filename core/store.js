class Store {
    constructor(initState = {}) {
        this._state = initState;
        this._listeners = {};
    }

    subscribe(event, key, callback) {
        const listeners = this._listeners;

        if (!listeners[event]) {
            listeners[event] = {};
        } 

        listeners[event][key] = callback;
    }

    unsubcribe(event, key) {
        const listeners = this._listeners;
        delete listeners[event][key];
    }

    dispatch(event, props = {}) {

    }
}