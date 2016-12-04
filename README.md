# testing

## install with npm

```
npm install --save-dev webforge-testing
```

## setup webdriver io with cucumber

tests/js/webdriverio/setup.js
```js
module.exports = function(that) {

  require('webforge-testing').setup(that, {
    root: [__dirname, '..', '..', '..']
  });

};
```

tests/js/webdriverio/step-definitions.js
```js
module.exports = function() {

  require('./setup')(this);

  //this.Given(....)
  //this.Then(....)

};
```

cucumber.bat
```
@echo off

IF EXIST node_modules\webforge-testing\node_modules\.bin\wdio.cmd (
  node_modules\webforge-testing\node_modules\.bin\wdio tests\js\webdriverio\wdio.cucumber.conf.js %*
) ELSE (
  node_modules\.bin\wdio tests\js\webdriverio\wdio.cucumber.conf.js %*
)

```

wdio.cucumber.conf.js
```js
var hostname = require('os').hostname();

exports.config = {
    /**
     * server configurations
     */
    host: '127.0.0.1',
    port: 4444,

    /**
     * specify test files
     */
    specs: [
        './features/*.feature'
    ],
    exclude: [
    ],

    maxInstances: 1,

    /**
     * capabilities
     */
    capabilities: [
        {
            browserName: 'phantomjs'
        }
    ],
    /*
     {
        browserName: 'chrome'
    }, {
        browserName: 'firefox'
    }
    */

    /**
     * test configurations
     */
    baseUrl: 'host-dependend',

    logLevel: 'silent',
    coloredLogs: true,
    screenshotPath: '.screenshots',
    waitforTimeout: 10000,
    framework: 'cucumber',

    reporters: ['spec'],
    reporterOptions: {
        outputDir: './reports'
    },

    cucumberOpts: {
        failFast: true,
        require: ['./tests/js/webdriverio/step-definitions.js']
    }
};

if (hostname === 'psc-laptop') {
  exports.config.baseUrl = 'http://sprotten-stories.laptop.ps-webforge.net';
} else if (hostname === 'psc-desktop') {
  exports.config.baseUrl = 'http://sprotten-stories.desktop.ps-webforge.net';
} else if (hostname === 'draco') {
  exports.config.baseUrl = 'http://staging.sprotten-stories.com';
  exports.config.reporters = ['spec', 'junit'];
  exports.config.cucumberOpts.failFast = false;
  exports.config.services = ['selenium-standalone'];
} else {
  throw new Error('configure for your host ('+hostname+') the baseUrl');
}

```
