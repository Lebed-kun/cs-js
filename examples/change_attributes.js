// success

class CSS {
    constructor(cssProps) {
        this._css = cssProps;
    }

    toString() {
        let str = '';
        const css = this._css;

        for (let prop in this._css) {
            str += `${prop}: ${css[prop].toString()};`
        }

        return str;
    }
}

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
            type : 'div',
            attrs : {
              href : 'https://example.com',  
              style : new CSS({
                    background : state.toggle ? 'green' : 'orange',
                    'text-decoration' : state.toggle ? 'none' : 'underline',
                  display : state.toggle ? 'block' : 'inline'
                })
            },
            children : {
                title : props.title,
                button : new Button({
                    props : {
                        onClick : this.handleClick.bind(this),
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
