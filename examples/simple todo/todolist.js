import { Component, TextContent } from '../../core/component.js';
import store from './store.js';

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
                text : new TextContent(this._props.text)
            }
        }
    }
}

class ToDo extends Component {
    handleClick() {
        const store = this._props.store;

        store.dispatch('delete_todo', {
            id : this._props.id
        })
    }
    
    tree() {
        return {
            type : 'div',
            attrs : {
                style : 'border: 2px solid black;'
            },
            children : {
                heading : new Heading({ props : {
                    text : this._props.title
                }}),
                description : new Paragraph({ props : {
                    text : this._props.description
                }}),
                delete : new Button({
                    props : {
                        onClick : this.handleClick.bind(this)
                    }
                })
            }
        }
    }
}

class ToDoList extends Component {
    constructor({ props = {}, hasElement }) {
        super({ props, hasElement });

        const store = props.store;

        store.subscribe('new_todo', 'todo_list', (state, payload) => {
            const newTodo = payload;

            const newState = Object.assign({}, state, {
                todos : state.todos.concat([newTodo])
            });

            return newState;
        });

        store.subscribe('delete_todo', 'todo_list', (state, payload) => {
            const id = payload.id;

            const newState = Object.assign({}, state, {
                todos : state.todos.filter(el => el.id !== id)
            });

            return newState;
        });
    }
    
    getContent(state) {
        const todos = this._props.store.getState('todos');

        return todos.map(el => new ToDo({
            props : {
                id : el.id,
                title : el.title,
                description : el.description
            }
        }))
    }
    
    tree() {
        return {
            type : 'div',
            children : {
                todos : this.getContent()
            }
        }
    }
}

const ToDoListConnect = store.connect(ToDoList);

export default ToDoListConnect;