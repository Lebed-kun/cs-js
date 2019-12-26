const AboutBody = require("../templates/about.js");

const AboutPage = () => {
  const content = new AboutBody({}).template();

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>About me</title>
      </head>

      <body>
        ${content}
      </body>
    </html>
  `;
};

module.exports = AboutPage;
