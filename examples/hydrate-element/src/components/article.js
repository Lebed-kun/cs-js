import { Component } from "../../../../core/component.js";

import Paragraph from "./paragraph.js";

class Article extends Component {
  toComponent() {
    return new Paragraph({
      props: {
        style: "border-bottom: 2px solid black;",
        text: this._props.body
      }
    });
  }
}

export default Article;
