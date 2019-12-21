class Connector {
    constructor() {
        this._listeners = {};
    }

    subscribe(event, key, callback, condition = (props, key) => true) {
        const listeners = this._listeners;

        if (!listeners[event]) {
            listeners[event].condition = condition;
            listeners[event].callbacks = {};
        }

        listeners[event].callbacks[key] = callback;
    }

    unsubscribe(event, key) {
        const listeners = this._listeners;
        delete listeners[event].callbacks[key];
    }

    dispatch(event, props) {
        const listeners = this._listeners[event];
        const callbacks = listeners.callbacks;

        for (let lis in callbacks) {
            const condition = listeners.condition(props, lis);
            const callback = callbacks[lis];
            if (condition) callback(props, lis);
        }
    }
}