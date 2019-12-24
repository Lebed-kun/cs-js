import { Component, TextContent } from '../../core/component.js';

class Button extends Component {
    tree() {
        const handleClick = this._props.onClick;
        
        return {
            type : 'button',
            attrs : {
                type : this._props.type || ''
            },
            listeners : {
                click : handleClick || null
            },
            children : {
                text : new TextContent(this._props.text)
            }
        }
    }
}

export default Button;