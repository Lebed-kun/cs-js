class TextContent {
    constructor(text) {
        this._text = text;
    }

    _createElement() {
        const $element = document.createTextNode(this._text);
        this.$element = $element;
        return $element
    }

    _updateElement(currTree, prevTree) {
        if (currTree !== prevTree) {
            this.$element = document.createTextNode(currTree);
        }
    }

    tree() {
        return this._text;
    }
}

class Component {
    constructor({ props = {}, state = {}, hasElement = false }) {
        this._props = props;
        this._state = state;
        
        if (hasElement) {
            this._createElement();
        }
    }

    _createElement() {
        const tree = this.tree();
        const $element = document.createElement(tree.type);

        this._setAttributes($element, tree.attrs);
        this._setEventListeners($element, tree.listeners);

        const children = tree.children;
        for (let key in children) {
            const child = children[key];
            let $child = null;

            if (child && child.toComponent) {
                const childComponent = child.toComponent();
                $child = childComponent._createElement();
            } else if (child instanceof Component || child instanceof TextContent) {    
                $child = child._createElement();
            }

            if ($child) {
                $element.appendChild($child);
            }
        }

        this.$element = $element;
      
        return $element;
    }

    _setAttributes($element, attrs) {
        for (let key in attrs) {
            const value = attrs[key].toString();
            $element.setAttribute(key, value);
        }
    }

    _removeAttributes($element, attrs) {
        for (let key in attrs) {
            $element.removeAttribute(key);
        }
    }

    _setEventListeners($element, listeners) {
        for (let key in listeners) {
            const listener = listeners[key];
            $element[`on${key}`] = listener;
        }
    }


    _removeEventListeners($element, listeners) {
        for (let key in listeners) {
            $element[`on${key}`] = null;
        }
    }

    // Review of parent
    _updateElement(currTree, prevTree) {
        const $element = this.$element;
        
        if (currTree.type !== prevTree.type) {
            const $newElement = this._createElement();
            const $parent = $element.parentNode;

            $parent.replaceChild($newElement, $element);
        } else {
            this._diffAttributes($element, currTree.attrs, prevTree.attrs);
            this._diffEventListeners($element, currTree.listeners, prevTree.listeners);
            this._diffChildren(currTree.children, prevTree.children);
        }
    }

    _diffAttributes($element, currAttrs, prevAttrs) {
        if (currAttrs && !prevAttrs) {
            this._setAttributes($element, currAttrs);
            return;
        }

        if (!currAttrs && prevAttrs) {
            this._removeAttributes($element, prevAttrs);
            return;
        }
        
        if (currAttrs && prevAttrs) {
            const currKeys = Object.keys(currAttrs);
            const prevKeys = Object.keys(prevAttrs);

            for (let i = 0; i < currKeys.length || i < prevKeys.length; i++) {
                const currAttr = currKeys[i];
                const prevAttr = prevKeys[i];

                if (prevAttr && currAttrs[prevAttr] === undefined) {
                    $element.removeAttribute(prevAttr);
                } 
                
                if (currAttr && currAttrs[currAttr] !== prevAttrs[currAttr]) {
                    const currValue = currAttrs[currAttr].toString();
                    $element.setAttribute(currAttr, currValue);
                } 
            }
        }
    }

    _diffEventListeners($element, currListeners, prevListeners) {
        if (currListeners && !prevListeners) {
            this._setEventListeners($element, currListeners);
            return;
        }

        if (!currListeners && prevListeners) {
            this._removeEventListeners($element, prevListeners);
            return;
        }

        if (currListeners && prevListeners) {
            const currKeys = Object.keys(currListeners);
            const prevKeys = Object.keys(prevListeners);

            for (let i = 0; i < currKeys.length || i < prevKeys.length; i++) {
                const currHandler = currKeys[i];
                const prevHandler = prevKeys[i];

                if (prevHandler && currListeners[prevHandler] === undefined) {
                    $element[`on${prevHandler}`] = null;
                } 
                
                if (currHandler && currListeners[currHandler] !== prevListeners[currHandler]) {
                    const listener = currListeners[currHandler];
                    $element[`on${currHandler}`] = listener;
                } 
            }
        }
    }

    setState(state) {
        const prevTree = this.tree();
        this._state = Object.assign({}, this._state, state);
        const currTree = this.tree();

        this._updateElement(currTree, prevTree);
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