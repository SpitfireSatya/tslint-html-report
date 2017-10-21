
(function () {

  'use strict';

  const validateConfig = require('./validate-config');
  const generateReport = require('./generate-report');

  function tslintHtmlReport(userConfig) {

    const config = validateConfig(userConfig);
    generateReport(config);

  }

  module.exports = tslintHtmlReport;

}());
