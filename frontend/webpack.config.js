const path = require('path');

module.exports = {
  // ... otras configuraciones ...
  resolve: {
    fallback: { 
      "console": require.resolve("console-browserify") 
    }
  }
};