class Store {
    constructor(initState = {}) {
        this._state = initState;
        this._listeners = {};
    }

    connect(Component) {
        const store = this;
        
        return class StoreComponent extends Component {
            constructor({ props = {}, hasElement = false }) {
                super({ props : Object.assign({}, props, {
                    store : store
                }), hasElement })
            }
        }
    }

    subscribe(event, key, callback) {
        const listeners = this._listeners;

        if (!listeners[event]) {
            listeners[event] = {};
        }

        listeners[event][key] = callback;
    }

    unsubscribe(event, key) {
        const listeners = this._listeners;
        delete listeners[event][key];
    }

    dispatch(event, payload) {
        const listeners = this._listeners[event];

        for (let lis in listeners) {
            const callback = listeners[lis];
            callback(payload);
        }
    }
}
