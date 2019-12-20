class Heading extends Component {
    tree() {
        return {
            type : 'h1',
            children : {
                text : new TextContent(this._props.text)
            }
        }
    }
}

class Paragraph extends Component {
    tree() {
        return {
            type : 'p',
            children : {
                text : new TextContent(this._props.text)
            }
        }
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
                title : new TextContent(this._props.title)
            }
        }
    }
}

class App extends Component {
    constructor({ props, hasElement }) {
        super({props, hasElement, state : {
            toggle : false
        }});
    }

    handleClick() {
        const toggle = this._state.toggle;
        this.setState({
            toggle : !this._state.toggle
        });
    }

    getContent() {
        if (this._state.toggle) {
            return {
                p : new Paragraph({
                    props : {
                        text : 'JohnByte'
                    }
                }),
                button : new Button({
                    props : {
                        onClick : this.handleClick.bind(this),
                        title : 'Reverse'
                    }
                }),
                h1 : new Heading({
                    props : {
                        text : 'Hello world!'
                    }
                })
            }
        } else {
            return {
                h1 : new Heading({
                    props : {
                        text : 'Hello world!'
                    }
                }),
                button : new Button({
                    props : {
                        onClick : this.handleClick.bind(this),
                        title : 'Reverse'
                    }
                }),
                p : new Paragraph({
                    props : {
                        text : 'JohnByte'
                    }
                })
            }
        }
    }

    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'border: 2px solid black;'
            },
            children : this.getContent()
        }
    }
}

const app = new App({
    hasElement : true
});

const root = document.getElementById('root');
root.appendChild(app.getElement());