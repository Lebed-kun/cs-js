class Button extends Component {
    tree() {
        return {
            type : 'button',
            listeners : {
                click : this._props.onClick
            },
            children : {
                title : this._props.title
            }
        }
    }
}

class Block extends Component {
    constructor({ props = {}, hasElement = false }) {
        super({props, state : {
            toggle : false
        }, hasElement});
    }

    handleClick() {
        this.setState({
            toggle : !this._state.toggle
        })
    }

    tree() {
        const state = this._state;
        const props = this._props;

        return {
            type : state.toggle ? 'div' : 'h1',
            children : {
                text : props.text,
                button : new Button({
                    props : {
                        onClick : this.handleClick.bind(this),
                        title : props.buttonText
                    }
                })
            }
        }
    }
}

const app = new Block({
    props : {
        text : 'Hello world!',
        buttonText : 'Click me!'
    },
    hasElement : true
});
const root = document.getElementById('root');
root.appendChild(app.getElement());