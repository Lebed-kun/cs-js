class Component {
    constructor({ props = {}, state = {}, hasElement = false }) {
        this._props = props;
        this._state = state;
        
        if (hasElement) {
            this._createElement();
        }
    }

    _createElement(component = null) {
        component = component || this;
        const tree = component.tree();
        const $element = document.createElement(tree.type);

        this._setAttributes($element, tree.attrs);
        this._setEventListeners($element, tree.listeners);

        const children = tree.children;
        for (let key in children) {
            const child = children[key];
            let $child = null;

            if (child instanceof Component) {
                $child = this._createElement(child);
            } else if (child && child.toComponent) {
                const childComponent = child.toComponent();
                $child = this._createElement(childComponent);
            } else if (child !== null) {
                const text = child.toString();
                $child = document.createTextNode(text);
            }

            if ($child) {
                $element.appendChild($child);
            }
        }

        component.$element = $element;

        return $element;
    }

    _setAttributes($element, attrs) {
        for (let key in attrs) {
            const value = attrs[key].toString();
            $element.setAttribute(key, value);
        }
    }

    _setEventListeners($element, listeners) {
        for (let key in listeners) {
            const listener = listeners[key];
            
            if (Array.isArray(listener)) {
                for (let id in listener) {
                    const callback = typeof listener[id] === 'function' ? listener[id] : listener[id].toFunction();
                    $element.addEventListener(key, callback);
                }
            } else {
                const callback = typeof listener === 'function' ? listener : listener.toFunction();
                $element.addEventListener(key, callback);
            }
        }
    }

    _updateElement({ currTree, prevTree, component = null }) {
        component = component || this;
        
        if (currTree.type !== prevTree.type) {
            const $element = component.$element;
            const $newElement = this._createElement(component);
            const $parent = $element.parentNode;

            $parent.replaceChild($newElement, $element);
        }
    }

    setState(state) {
        const prevTree = this.tree();
        this._state = Object.assign({}, this._state, state);
        const currTree = this.tree();

        this._updateElement({ currTree, prevTree });
    }

    getElement() {
        return this.$element;
    }
    
    tree() {
        return {
            type : '', // HTML tag name
            attrs : {}, // HTML attributes
            listeners : {}, // event listeners
            children : {} // another components and texts
        }
    }
}