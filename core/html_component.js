import { Component } from './component.js';

class HTMLComponent extends Component {
    constructor({ tag = '', props = {}, children = {}, root = null, template = null }) {
        const { attrs, listeners } = this._getHTMLAttrsListeners(props);
        
        super({ props : {
            tag : tag,
            attrs : attrs,
            listeners : listeners,
            children : children
        }, root, template });
    }

    _getHTMLAttrsListeners(props) {
        const parttree = {
            attrs : {},
            listeners : {}
        }

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
            attrs : this._props.attrs,
            listeners : this._props.listeners,
            children : this._props.children
        }
    }
}

export default HTMLComponent;