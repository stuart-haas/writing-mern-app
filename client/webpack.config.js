var path = require('path');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000
  }
};