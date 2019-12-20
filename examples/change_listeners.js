// success +++

class Button extends Component {
    constructor({ props = {}, hasElement = false }) {
        super({props, state : {
            toggle : false
        }, hasElement})
    }

    handleClick() {
        this.setState({
            toggle : !this._state.toggle
        })
    }

    message() {
        alert('Enough clicks!')
    }
    
    tree() {
        return {
            type : 'button',
            listeners : {
                click : !this._state.toggle ? this.handleClick.bind(this) : this.message
            },
            children : {
                title : new TextContent(this._props.title)
            }
        }
    }
}

class Block extends Component {
    tree() {
        const state = this._state;
        const props = this._props;

        return {
            type : 'div',
            attrs : {
              style : 'border: 1px solid black;'
            },
            children : {
                title : new TextContent(props.title),
                button : new Button({
                    props : {
                        title : 'Click me!'
                    }
                })
            }
        }
    }
}


const app = new Block({
    props : {
        title : 'Hello world!',
    },
    hasElement : true
});
const root = document.getElementById('root');
root.appendChild(app.getElement());
