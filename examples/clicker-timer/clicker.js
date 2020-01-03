import { Component, TextContent } from '../../core/component.js';

import Button from './button.js';

class Clicker extends Component {
    constructor({ props = { likes : 0 }, root = null, template = null }) {
        super({ props, root, template });
    }
    
    handleClick() {
        const { likes } = this._props;
        this.setProps({ likes : +likes + 1 });
    }
    
    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'border-top: 1px solid black;'
            },
            children : [
                new Button({
                    props : {
                        text : 'Like',
                        onClick : this.handleClick.bind(this)
                    }
                }),
                new TextContent(this._props.likes)
            ]
        }
    }
}

export default Clicker;