var path = require('path');

module.exports = function(prototype) {

  prototype.initCommon = function(options) {
    this.root = path.resolve(path.join.apply(this, options.root));
  };

  prototype.path = function(relative) {
    return path.resolve(this.root+'/'+relative);
  };

}