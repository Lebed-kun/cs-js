import { Component, TextContent } from '../../core/component.js';
import store from './store.js';
import Button from './button.js';

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
                        onClick : this.handleClick.bind(this),
                        text : 'Delete'
                    }
                })
            }
        }
    }
}

const ToDoConnect = store.connect(ToDo);

class ToDoList extends Component {
    constructor({ props = {}, hasElement }) {
        super({ props, hasElement });

        const store = props.store;
        const component = this;

        store.subscribe('new_todo', 'todo_list', (state, payload) => {
            const todos = state.todos;
            const newId = todos[todos.length - 1].id + 1;
            
            const newState = Object.assign({}, state, {
                todos : todos.concat([{
                    id : newId,
                    title : payload.title,
                    description : payload.description
                }])
            });

            component.setProps(null, newState);
        });

        store.subscribe('delete_todo', 'todo_list', (state, payload) => {
            const id = payload.id;

            const newState = Object.assign({}, state, {
                todos : state.todos.filter(el => el.id !== id)
            });

            component.setProps(null, newState);
        });
    }
    
    getContent() {
        const state = this._props.store.getState();
        const todos = state.todos;

        return todos.map(el => new ToDoConnect({
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