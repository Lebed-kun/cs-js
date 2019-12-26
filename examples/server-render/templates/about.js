const Component = require("../../../core/component.js").Component;
const Paragraph = require("../components/paragraph.js");

class AboutBody extends Component {
  tree() {
    return {
      type: "div",
      children: {
        text: new Paragraph({
          props: {
            text: "Make cute things"
          }
        })
      }
    };
  }
}

module.exports = AboutBody;
