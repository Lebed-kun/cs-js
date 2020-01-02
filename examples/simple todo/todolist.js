import { Component, TextContent } from "../../core/component.js";
import store from "./store.js";
import Button from "./button.js";
import Form from "./form.js";

class Heading extends Component {
  tree() {
    return {
      type: "h3",
      children: {
        text: new TextContent(this._props.text)
      }
    };
  }
}

class Paragraph extends Component {
  tree() {
    return {
      type: "p",
      attrs: {
        style: this._props.style || ""
      },
      children: {
        text: new TextContent(this._props.text)
      }
    };
  }
}

class ToDo extends Component {
  edit() {
    const store = this._props.store;

    store.dispatch("open_edit", {
      id: this._props.id
    });
  }

  delete() {
    const store = this._props.store;

    store.dispatch("delete_todo", {
      id: this._props.id
    });
  }

  getDate(prop) {
    let date = this._props[`${prop}At`];
    date = new Paragraph({
      props: {
        text: date ? `${prop} at: ${date}` : "",
        style: "font-style: italic"
      }
    });

    return date;
  }

  getForm() {
    return {
      form: new Form({
        props: {
          id: this._props.id,
          title: this._props.title,
          description: this._props.description
        }
      })
    };
  }

  getCard() {
    const createdAt = this.getDate("created");
    const updatedAt = this.getDate("updated");

    return {
      heading: new Heading({
        props: {
          text: this._props.title
        }
      }),
      description: new Paragraph({
        props: {
          text: this._props.description
        }
      }),
      createdAt: createdAt,
      updatedAt: updatedAt,
      edit: new Button({
        props: {
          onClick: this.edit.bind(this),
          text: "Edit"
        }
      }),
      delete: new Button({
        props: {
          onClick: this.delete.bind(this),
          text: "Delete"
        }
      })
    };
  }

  tree() {
    return {
      type: "div",
      attrs: {
        style: "border: 2px solid black;"
      },
      children: this._props.form ? this.getForm() : this.getCard()
    };
  }
}

const ToDoConnect = store.connect(ToDo);

class ToDoList extends Component {
  constructor({ props = {}, hasElement }) {
    super({ props, hasElement });

    this.setAddToDo();
    this.setDeleteToDo();

    this.setOpenEdit();
    this.setEditToDo();
  }

  setOpenEdit() {
    const store = this._props.store;

    store.subscribe("open_edit", "todo_list", (state, payload) => {
      const todos = state.todos;
      const todoId = todos.findIndex(el => el.id === payload.id);

      if (todoId >= 0) {
        const newTodos = todos.slice();
        newTodos[todoId] = Object.assign({}, newTodos[todoId], {
          form: true
        });

        const newState = Object.assign({}, state, {
          todos: newTodos
        });

        this.setProps(null, newState);
      }
    });
  }

  setEditToDo() {
    const store = this._props.store;

    store.subscribe("edit_todo", "todo_list", (state, payload) => {
      const todos = state.todos;
      const todoId = todos.findIndex(el => el.id === payload.id);

      if (todoId >= 0) {
        const newTodos = todos.slice();
        newTodos[todoId] = Object.assign({}, newTodos[todoId], {
          form: false,
          title: payload.title,
          description: payload.description,
          updatedAt: new Date().toLocaleString()
        });

        const newState = Object.assign({}, state, {
          todos: newTodos
        });

        this.setProps(null, newState);
      }
    });
  }

  setAddToDo() {
    const store = this._props.store;

    store.subscribe("new_todo", "todo_list", (state, payload) => {
      const todos = state.todos;
      const newId = state.lastId + 1;

      const newState = Object.assign({}, state, {
        todos: todos.concat([
          {
            id: newId,
            title: payload.title,
            description: payload.description,
            createdAt: new Date().toLocaleString()
          }
        ]),
        lastId: newId
      });

      this.setProps(null, newState);
    });
  }

  setDeleteToDo() {
    const store = this._props.store;

    store.subscribe("delete_todo", "todo_list", (state, payload) => {
      const id = payload.id;

      const newState = Object.assign({}, state, {
        todos: state.todos.filter(el => el.id !== id)
      });

      this.setProps(null, newState);
    });
  }

  getContent() {
    const state = this._props.store.getState();
    const todos = state.todos;

    return todos.map(
      el =>
        new ToDoConnect({
          props: {
            form: el.form,
            id: el.id,
            title: el.title,
            description: el.description,
            createdAt: el.createdAt,
            updatedAt: el.updatedAt
          }
        })
    );
  }

  tree() {
    return {
      type: "div",
      children: this.getContent()
    };
  }
}

const ToDoListConnect = store.connect(ToDoList);

export default ToDoListConnect;
