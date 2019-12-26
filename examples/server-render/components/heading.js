const Component = require("../../../core/component.js").Component;
const TextContent = require("../../../core/component.js").TextContent;

class Heading extends Component {
  tree() {
    return {
      type: "h1",
      attrs: {
        style: this._props.style || ""
      },
      children: {
        text: new TextContent(this._props.text)
      }
    };
  }
}

module.exports = Heading;
