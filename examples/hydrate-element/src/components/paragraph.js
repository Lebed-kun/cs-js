import { Component, TextContent } from "../../../../core/component.js";

class Paragraph extends Component {
  tree() {
    return {
      type: "p",
      attrs: {
        style: this._props.style || ""
      },
      children: [new TextContent(this._props.text)]
    };
  }
}

export default Paragraph;
