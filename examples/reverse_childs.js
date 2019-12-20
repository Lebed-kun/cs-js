// success +++

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

class List extends Component {
    getList() {
        const paragraphs = this._props.paragraphs;

        return paragraphs.map(el => {
            return new Paragraph({
                props : {
                    text : el
                }
            })
        })
    }
    
    tree() {
        return {
            type : 'div',
            children : this.getList()
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
            paragraphs : [
                '1st text',
                '2nd text',
                '3rd text'
            ]
        }});
    }

    handleClick() {
        const paragraphs = this._state.paragraphs;
        this.setState({
            paragraphs : paragraphs.map((el, id, arr) => arr[arr.length - 1 - id])
        });
    }

    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'border: 2px solid black;'
            },
            children : {
                list : new List({
                    props : {
                        paragraphs : this._state.paragraphs
                    }
                }),
                button : new Button({
                    props : {
                        onClick : this.handleClick.bind(this),
                        title : 'Reverse'
                    }
                })
            }
        }
    }
}

const app = new App({
    hasElement : true
});

const root = document.getElementById('root');
root.appendChild(app.getElement());