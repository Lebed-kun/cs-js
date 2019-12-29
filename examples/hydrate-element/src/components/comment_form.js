import { Component } from "../../../../core/component.js";

import TextArea from "./textarea.js";
import Button from "./button.js";

import store from "../store.js";

class CommentForm extends Component {
  constructor({ props = {}, root = null, template = null }) {
    super({ props, root, template });

    this.values = {
      message: ""
    };
  }

  setValue(key, value) {
    this.values[key] = value;
  }

  handleSubmit(e) {
    e.preventDefault();

    const store = this._props.store;
    const message = this.values.message;

    store.dispatch("add_comment", message);
  }

  tree() {
    return {
      type: "form",
      listeners: {
        submit: this.handleSubmit.bind(this) || null
      },
      children: [
        new TextArea({
          props: {
            name: "message",
            form: this
          }
        }),
        new Button({
          props: {
            type: "submit",
            text: "Submit"
          }
        })
      ]
    };
  }
}

const CommentFormConnect = store.connect(CommentForm);

export default CommentFormConnect;
