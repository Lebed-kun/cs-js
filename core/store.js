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

            setProps(props = {}, state = null) {
                const $element = this.$element;
                const $parent = $element.parentNode;
        
                const prevTree = this.tree();

                if (state) {
                    store.setState(state);
                }
                
                if (props) {
                    this._props = Object.assign({}, this._props, props);
                }

                const currTree = this.tree();
        
                this._updateElement($parent, currTree, prevTree, $element);
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
            callback(this._state, payload);
        }
    }

    getState() {
        return this._state;
    }

    setState(state) {
        this._state = state;
    }
}

export default Store;