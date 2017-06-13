module.exports = function(that, options) {

  that.World = function() {
    var os = require('os');

    this.initCommon(options);

    this.options = {
      cli: this.path('bin')+'/cli'+(os.platform() === 'win32' ? '.bat' : '.sh')
    };

    global.expect = require('chai').expect;
    global.client = browser;

    client.timeouts('implicit', 300);
    client.timeouts('page load', 5000);

    this.screenshot = function() {


      var date = new Date();
      var timestamp = date.toJSON().replace(/:/g, '-')
      var filename = `ERROR_wbfrg_testing_${timestamp}.png`;
      client.saveScreenshot(client.options.screenshotPath+'/'+filename);
    }
  };

  require('./cli')(that.World.prototype);
  require('./common')(that.World.prototype);
  require('css-tester').inject(that.World.prototype, require('chai'));

  that.World.prototype.debug = require('debug')('cucumber-world');

  that.Before(function () {
    browser.windowHandleSize({width:1024,height:900});
  });

  that.After(function () {
    var logs = browser.log('browser');

    if (logs.state === 'success' && logs.value.length) {
      console.log('from browser:');
      console.log(logs.value);
    }
  });

};