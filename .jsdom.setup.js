const jsdom = require("jsdom");
const { JSDOM } = jsdom;

global.window = new JSDOM('');
global.document = window.document;
Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

global.window.location = { "host": "localhost", "protocol": "http"};
