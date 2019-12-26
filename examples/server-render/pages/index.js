const IndexBody = require("../templates/index.js");

const IndexPage = () => {
  const content = new IndexBody({}).template();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Home</title>
      </head>

      <body>
        ${content}
      </body>
    </html>
  `;
};

module.exports = IndexPage;
