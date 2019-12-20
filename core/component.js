class TextContent {
    constructor(text) {
        this._text = text;
    }

    _createElement() {
        const $element = document.createTextNode(this._text);
        this.$element = $element;
        return $element
    }

    _updateElement($parent, currTree, prevTree, index = 0) {
        const $children = $parent.childNodes;
        const $element = $children[index];
        
        if (!prevTree) {
            const $newElement = this._createElement();
            $parent.insertBefore($newElement, $element);
            return;
        }

        if (!currTree) {
            $parent.removeChild($element);
            return;
        }
        
        if (currTree !== prevTree) {
            const $newElement = this._createElement();
            $parent.replaceChild($newElement, $children[index]); 
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

    _updateElement($parent, currTree, prevTree, index = 0, prevIndex = null) {
        const $children = $parent.childNodes;
        const $element = typeof index === 'number' ? $children[index] : index;
        const $prevElement = prevIndex ? $children[prevIndex] : null;

        if (!prevTree) {
            const $newElement = this._createElement();
            $parent.insertBefore($newElement, $element);
            return;
        }

        if (!currTree) {
            $parent.removeChild($element);
            return;
        }
        
        if (currTree.type !== prevTree.type) {
            const $newElement = this._createElement();
            $parent.replaceChild($newElement, $element);
            return;
        } else {
            if ($prevElement) {
                this._diffAttributes($prevElement, currTree.attrs, prevTree.attrs);
                this._diffEventListeners($prevElement, currTree.listeners, prevTree.listeners);
                this._diffChildren($prevElement, currTree.children, prevTree.children);
            }

            this._diffAttributes($element, currTree.attrs, prevTree.attrs);
            this._diffEventListeners($element, currTree.listeners, prevTree.listeners);
            this._diffChildren($element, currTree.children, prevTree.children);
        }

        if ($prevElement) {
            const $prevElementCopy = $prevElement.cloneNode(true);
            const $elementCopy = $element.cloneNode(true);

            $parent.replaceChild($prevElementCopy, $element);
            $parent.replaceChild($elementCopy, $prevElement);
        }
    }

    _diffChildren($parent, currChildren, prevChildren) {
        const currKeys = Object.keys(currChildren);
        const prevKeys = Object.keys(prevChildren);

        for (let i = 0; i < currKeys.length; i++) {
            const currComponent = currChildren[currKeys[i]];
            const currTree = currComponent.tree();
            
            if (currKeys[i] !== prevKeys[i] && prevChildren[currKeys[i]]) {
                const prevComponent = prevChildren[currKeys[i]];
                const prevTree = prevComponent.tree();

                const j = prevKeys.findIndex(el => el === currKeys[i]);

                currComponent._updateElement($parent, currTree, prevTree, i, j);
            } else {
                const prevComponent = prevChildren[prevKeys[i]];
                const prevTree = prevComponent ? prevComponent.tree() : null;
                currComponent._updateElement($parent, currTree, prevTree, i);
            }
        }

        for (let i = currKeys.length; i < prevKeys.length; i++) {
            const prevComponent = prevChildren[prevKeys[i]];
            const prevTree = prevComponent.tree();

            prevComponent._updateElement($parent, null, prevTree, i);
        }

        /*
        for (let i = 0; i < currKeys.length || i < prevKeys.length; i++) {
            const currComponent = currChildren[currKeys[i]];
            const prevComponent = prevChildren[prevKeys[i]];

            const currTree = currComponent ? currComponent.tree() : null;
            const prevTree = prevComponent ? prevComponent.tree() : null;

            if (currComponent) {
                currComponent._updateElement($parent, currTree, prevTree, i);
            } else {
                prevComponent._updateElement($parent, currTree, prevTree, i);
            }
        }
        */
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
        const $parent = this.$element.parentNode;

        const prevTree = this.tree();
        this._state = Object.assign({}, this._state, state);
        const currTree = this.tree();

        this._updateElement($parent, currTree, prevTree, this.$element);
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