import { Component, TextContent } from "../../../../core/component.js";

class Button extends Component {
  tree() {
    return {
      type: "button",
      attrs: {
        type: this._props.type || "",
        style: "display: block;"
      },
      listeners: {
        click: this._props.onClick
      },
      children: [new TextContent(this._props.text)]
    };
  }
}

export default Button;
