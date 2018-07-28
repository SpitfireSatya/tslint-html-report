
(function () {

  'use strict';

  const validateConfig = require('./validate-config');
  const generateReport = require('./generate-report');

  function tslintHtmlReport(userConfig, done) {

    const config = validateConfig(userConfig);
    generateReport(config, () => {
      if (done) {
        done(); 
      }
    });

  }

  module.exports = tslintHtmlReport;

}());
