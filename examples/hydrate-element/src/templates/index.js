import { Component } from "../core/component.js";

import Article from "../components/article.js";
import Comments from "../components/comment_block.js";

class IndexTemplate extends Component {
  tree() {
    return {
      type: "div",
      children: [
        new Article({
          props: {
            body:
              "This is test for hydrating components.\nIt must show that there's no need to hydrate root template."
          }
        }),
        new Comments({})
      ]
    };
  }
}

export default IndexTemplate;
