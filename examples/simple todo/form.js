import { Component, TextContent } from "../../core/component.js";
import store from "./store.js";
import Button from "./button.js";

class Input extends Component {
  handleChange(e) {
    const name = this._props.name;
    const value = e.currentTarget.value;

    this._props.form.setValue(name, value);
  }

  tree() {
    return {
      type: "input",
      attrs: {
        name: this._props.name,
        value: this._props.value || "",
        placeholder: this._props.placeholder
      },
      listeners: {
        change: this.handleChange.bind(this)
      }
    };
  }
}

class TextArea extends Input {
  tree() {
    return {
      type: "textarea",
      attrs: {
        name: this._props.name,
        placeholder: this._props.placeholder
      },
      listeners: {
        change: this.handleChange.bind(this)
      },
      children: {
        text: new TextContent(this._props.value || "")
      }
    };
  }
}

class Form extends Component {
  constructor({ props = {}, root, template }) {
    super({ props, root, template });

    this.form = {
      title: props.title || "",
      description: props.description || "",
      setValue: function(key, value) {
        this[key] = value;
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const store = this._props.store;

    if (this._props.id) {
      store.dispatch("edit_todo", {
        id: this._props.id,
        title: this.form.title,
        description: this.form.description
      });
    } else {
      store.dispatch("new_todo", {
        title: this.form.title,
        description: this.form.description
      });
    }
  }

  tree() {
    return {
      type: "form",
      attrs: {
        style: "border: 2px solid grey;"
      },
      listeners: {
        submit: this.handleSubmit.bind(this)
      },
      children: {
        title: new Input({
          props: {
            form: this.form,
            name: "title",
            placeholder: "Title",
            value: this.form.title
          }
        }),
        description: new TextArea({
          props: {
            form: this.form,
            name: "description",
            placeholder: "Task description",
            value: this.form.description
          }
        }),
        button: new Button({
          props: {
            type: "submit",
            text: this._props.id ? "Save" : "Create"
          }
        })
      }
    };
  }
}

const FormConnect = store.connect(Form);

export default FormConnect;
