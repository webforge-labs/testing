# Changelog

## 1.3.x

- Previously the browser was widened in setup() to 1024 px. You need to do this yourself now
- after the feature the console.log showed errors from browser. You need to do this on your own now:

you can use this hooks in wdio.cucumber.conf.js:
``` 
    beforeFeature: function (feature) {
      browser.windowHandleSize({width:1024,height:900});
      browser.timeouts('page load', 60000);
    },

    afterFeature: function() {
      var logs = browser.log('browser');

      if (logs.state === 'success' && logs.value.length) {
        console.log('from browser:');
        console.log(logs.value);
      }
    },

    afterStep: function (stepResult) {
      if (stepResult.getStatus() == 'failed') {
        var date = new Date();
        var timestamp = date.toJSON().replace(/:/g, '-')
        var filename = `ERROR_wbfrg_testing_${timestamp}.png`;
        client.saveScreenshot(client.options.screenshotPath+'/'+filename);
      }
    }
```

- page load timeout will not be set anymore