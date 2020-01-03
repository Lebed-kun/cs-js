import { Component } from './component.js';

class HTMLComponent extends Component {
    constructor({ tag = '', props = {}, children = {}, root = null, template = null }) {
        super({ props : Object.assign({}, props, {
            tag : tag,
            children : children
        }), root, template });
    }

    _getHTMLAttrsListeners() {
        const parttree = {
            attrs : {},
            listeners : {}
        }

        const props = this._props;

        for (let key in props) {
            const prop = props[key];
            if (key.match(/^on/)) {
                const eventName = key.slice(2).toLowerCase();
                parttree.listeners[eventName] = prop;
            } else if (key !== 'tag' && key !== 'children') {
                parttree.attrs[key] = prop;
            }
        }

        return parttree;
    }

    tree() {
        return {
            type : this._props.tag,
            ...this._getHTMLAttrsListeners(),
            children : this._props.children
        }
    }
}

export default HTMLComponent;