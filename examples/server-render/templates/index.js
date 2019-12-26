const Component = require("../../../core/component.js").Component;

const Heading = require("../components/heading.js");
const Image = require("../components/image.js");
const Paragraph = require("../components/paragraph.js");

class IndexBody extends Component {
  tree() {
    return {
      type: "div",
      children: {
        heading: new Heading({
          props: {
            text: "My name is Anna",
            style: "color: purple;"
          }
        }),
        image: new Image({
          props: {
            src:
              "https://image.winudf.com/v2/image/Y29tLnN1YWRhaDA2MTEuYW5pbWVnaXJsa2F3YWlpYXBwX3NjcmVlbl8yXzE1MjM4OTA0OTRfMDI0/screen-2.jpg?fakeurl=1&type=.jpg",
            style: "border: 1px solid pink; width: 320px; height: auto;"
          }
        }),
        text: new Paragraph({
          props: {
            text: "I'm JS programmer who's making this pretty lib :3"
          }
        })
      }
    };
  }
}

module.exports = IndexBody;
