class Store {
    constructor({ initState = {}, eventHandlers }) {
        this._state = initState;
        this._eventHandlers = eventHandlers;
    }

    _dispatch({ eventName, payload }) {
        const handler = this._eventHandlers[eventName];
        const newState = handler(this._state, payload);
        this._state = newState;
    }

    connect(mapStateToProps, mapDispatchToProps) {
        return Component => {
            const store = this;

            return class StoreComponent extends Component {
                constructor({ props = {}, hasElement = false }) {
                    let newProps = props;

                    if (mapStateToProps) {
                        newProps = Object.assign({}, newProps, mapStateToProps(store._state));
                    } 

                    if (mapDispatchToProps) {
                        const dispatch = store._dispatch.bind(store); 
                        newProps = Object.assign({}, newProps, mapDispatchToProps(dispatch));
                    }

                    super({ props : newProps, hasElement })
                }
            }
        }
    }
}
