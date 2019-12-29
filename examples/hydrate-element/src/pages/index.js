import IndexTemplate from "../templates/index.js";

const IndexPage = () => {
  const template = new IndexTemplate({}).template();

  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>Home</title>
      </head>

      <body>
        ${template}

        <script src="/static/app.js"></script>
      </body>
    </html>
  `;
};

export default IndexPage;
