
(function () {
  
    'use strict';
  
    const colors = require('./colorMap.json');
    const foreground = colors.foreground;
    const background = colors.background;
  
    // A simple javascript solution to bring colors to the console.
  
    function color(color, text) {
      if (foreground[color]) {
        return ('\x1b[' + foreground[color] + 'm' + text + '\x1b[' + foreground.normal + 'm');
      } else {
        return (text);
      }
    }
  
    function bgColor(color, text) {
      if (background[color]) {
        return ('\x1b[' + background[color] + 'm' + text + '\x1b[' + background.normal + 'm');
      } else {
        return (text);
      }
    }
  
  
    module.exports = {
      color: color,
      bgColor: bgColor
    };
  
  }());	
  