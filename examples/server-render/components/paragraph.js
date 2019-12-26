const Component = require("../../../core/component.js").Component;
const TextContent = require("../../../core/component.js").TextContent;

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

module.exports = Paragraph;
