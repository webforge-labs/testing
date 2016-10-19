module.exports = function(prototype) {

  prototype.cli = function(parameters, execOptions) {
    if (!execOptions) execOptions = {};

    if (execOptions.extendEnv) {
      var env = {}, e;
      for (e in process.env) {
        env[e] = process.env[e];
      }
      for (e in execOptions.extendEnv) {
        env[e] = execOptions.extendEnv[e];
      }
      execOptions.env = env;
      delete execOptions.extendEnv;
    }

    return require('child-process-promise').execFile(this.options.cli, parameters, execOptions);
  };

  // options: manager
  prototype.dql = function(dql, parameters, options, execOptions) {
    if (!options) options = {};
    if (!options.manager) options.manager = 'default';

    /* globals Buffer */
    var jsonParameters = JSON.stringify(parameters);
    var encodedParameters = new Buffer(jsonParameters).toString('base64');

    return this.cli(['testing:dql', '--manager='+options.manager, '--base64', dql, encodedParameters], execOptions)
      .then(function(io) {
        var result = JSON.parse(io.stdout);

        return result;
      });
  };
}