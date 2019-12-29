import { Component } from "../../../../core/component.js";

import CommentForm from "./comment_form.js";
import CommentList from "./comment_list.js";

import store from "../store.js";

class CommentBlock extends Component {
  tree() {
    return {
      type: "div",
      attrs: {
        id: "comments"
      },
      children: [new CommentForm({}), new CommentList({})]
    };
  }
}

const CommentBlockConnect = store.connect(CommentBlock);

export default CommentBlockConnect;
