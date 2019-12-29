import { Component } from "../../../../core/component.js";

import Paragraph from "./paragraph.js";
import Button from "./button.js";

import store from "../store.js";

class Comment extends Component {
  handleClick() {
    const store = this._props.store;
    const id = this._props.id;

    store.dispatch("delete_comment", id);
  }

  tree() {
    return {
      type: "div",
      attrs: {
        style: "border: 1px solid purple; margin: 16px 0; padding: 16px;"
      },
      children: [
        new Paragraph({
          props: {
            text: this._props.message
          }
        }),
        new Paragraph({
          props: {
            style: "font-style: italic;",
            text: this._props.created
          }
        }),
        new Button({
          props: {
            onClick: this.handleClick.bind(this),
            text: "Delete"
          }
        })
      ]
    };
  }
}

const CommentConnect = store.connect(Comment);

export default CommentConnect;
