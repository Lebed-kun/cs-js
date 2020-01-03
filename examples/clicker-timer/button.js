import { Component, TextContent } from '../../core/component.js';

class Button extends Component {
    tree() {
        return {
            type : 'button',
            attrs : {
                style : 'font-weight: bold;'
            },
            listeners : {
                click : this._props.onClick
            },
            children : [new TextContent(this._props.text)]
        }
    }
}

export default Button;