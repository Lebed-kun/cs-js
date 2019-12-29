import { Component } from "../core/component.js";

class TextArea extends Component {
  handleChange(e) {
    const form = this._props.form;

    const key = this._props.name;
    const value = e.currentTarget.value;

    form.setValue(key, value);
  }

  tree() {
    return {
      type: "textarea",
      attrs: {
        style: "display: block;",
        name: this._props.name
      },
      listeners: {
        change: this.handleChange.bind(this)
      }
    };
  }
}

export default TextArea;
