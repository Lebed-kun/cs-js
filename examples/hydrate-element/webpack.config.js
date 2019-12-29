const path = require("path");

module.exports = {
  entry: "./src/frontend/app.js",
  output: {
    path: path.join(__dirname, "/src/static/"),
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
