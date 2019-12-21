class Connector {
    constructor() {
        this._listeners = {};
    }

    subscribe(event, key, callback) {
        const listeners = this._listeners;

        if (!listeners[event]) listeners[event] = {};

        listeners[event][key] = callback;
    }

    unsubscribe(event, key) {
        const listeners = this._listeners;
        delete listeners[event][key];
    }

    dispatch(event, props) {
        const listeners = this._listeners[event];

        for (let lis in listeners) {
            const callback = listeners[lis];

            callback(props);
        }
    }
}