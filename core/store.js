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

        const oldState = this._state;
        const newStates = [];

        for (let lis in listeners) {
            const callback = listeners[lis];
            const newState = callback(oldState, payload);
            if (newState) newStates.push(newState);
        }

        this._state = Object.assign.apply(null, [{}, oldState].concat(newStates));
    }

    getState(prop = '') {
        if (prop) {
            return this._state[prop];
        } else {
            return this._state;
        }
    }
}

export default Store;