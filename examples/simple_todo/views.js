class Heading extends Component {
    tree() {
        return {
            type : 'h3',
            children : {
                text : new TextContent(this._props.text)
            }
        }
    }
}

class Description extends Component {
    tree() {
        return {
            type : 'p',
            children : {
                text : new TextContent(this._props.text)
            }
        }
    }
}

class ToDo extends Component {
    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'border: 2px solid black;'
            },
            children : {
                title : new Heading({ props : {
                    text : this._props.data.title
                }}),
                description : new Description({ props : {
                    text : this._props.data.description
                }})
            }
        }
    }
}

class ToDoList extends Component {
    getContent() {
        const todos = this._props.todos;

        return todos.map(el => new ToDo({
            props : {
                data : {
                    title : el.title,
                    desciption : el.desciption
                }
            }
        }))
    }

    tree() {
        return {
            type : 'div',
            children : this.getContent()
        }
    }
}
