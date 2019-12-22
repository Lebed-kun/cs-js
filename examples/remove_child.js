// success ++

class Paragraph extends Component {
    tree() {
        return {
            type : 'p',
            attrs : {
                style : `color: ${this._props.color || 'black'};`
            },
            children : {
                text : new TextContent(this._props.text)
            }
        }
    }
}

class Block extends Component {
    getParagraphs() {
        const paragraphs = this._props.paragraphs;
        return paragraphs.map(el => {
            return new Paragraph({
                props : {
                    color : el.color,
                    text : el.text
                }
            })
        })
    } 
    
    tree() {
        return {
            type : 'div',
            children : this.getParagraphs()
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
    constructor() {
        super({ props : {
            paragraphs : [
                {
                    text : '1st paragraph',
                    color : 'red'
                },
                {
                    text : '2nd paragraph',
                    color : 'orange'
                },
                {
                    text : '3rd paragraph',
                    color : 'green'
                }
            ]
        }, hasElement : true})
    }

    handleClick() {
        const paragraphs = this._props.paragraphs;

        this.setProps({
            paragraphs : paragraphs.slice(0, paragraphs.length - 1)
        })
    }
    
    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'border: 2px solid black'
            },
            children : {
                block : new Block({
                    props : {
                        paragraphs : this._props.paragraphs
                    }
                }),
                button : new Button({
                    props : {
                        onClick : this.handleClick.bind(this),
                        title : 'Delete paragraph'
                    }
                })
            }
        }
    }
}

const app = new App();

const root = document.getElementById('root');
root.appendChild(app.getElement());