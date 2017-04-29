const jsdom = require("jsdom");
const { JSDOM } = jsdom;

global.window = new JSDOM('').window;
Object.keys(global.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
