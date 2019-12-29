import { Component } from "../../../../core/component.js";

import Comment from "./comment.js";

import store from "../store.js";

class CommentList extends Component {
  constructor({ props = {}, root = null, template = null }) {
    super({ props, root, template });

    if (typeof document !== undefined) {
      this.setAddComment();
      this.setDeleteComment();
    }
  }

  setAddComment() {
    const store = this._props.store;

    store.subscribe("add_comment", "comments", (state, message) => {
      const { comments, lastId } = state;

      const nextId = lastId + 1;
      const newState = Object.assign({}, state, {
        comments: comments.concat([
          {
            id: nextId,
            message: message,
            created: new Date().toLocaleString()
          }
        ]),
        lastId: nextId
      });

      this.setProps(null, newState);
    });
  }

  setDeleteComment() {
    const store = this._props.store;

    store.subscribe("delete_comment", "comments", (state, id) => {
      const { comments } = state;

      const newState = Object.assign({}, state, {
        comments: comments.filter(el => el.id !== id)
      });

      this.setProps(null, newState);
    });
  }

  tree() {
    const store = this._props.store;
    const comments = store.getState().comments;

    return {
      type: "div",
      children: comments.map(
        el =>
          new Comment({
            props: {
              id: el.id,
              message: el.message,
              created: el.created
            }
          })
      )
    };
  }
}

const CommentListConnect = store.connect(CommentList);

export default CommentListConnect;
