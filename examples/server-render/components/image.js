const Component = require("../../../core/component.js").Component;

class Image extends Component {
  tree() {
    return {
      type: "img",
      attrs: {
        style: this._props.style || "",
        src: this._props.src || ""
      }
    };
  }
}

module.exports = Image;
