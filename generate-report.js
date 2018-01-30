
(function () {

  'use strict';

  const handlebars = require('handlebars');
  const _ = require('lodash');
  const fs = require('fs');
  const funkyLogger = require('./funky-logger');
  const npmRun = require('npm-run');
  const path = require('path');

  const basePath = path.join(__dirname, '..', '..');

  function generateReport(config) {
    let data = {};
    let fileListWithErrorCountArray = [];
    let fileListWithErrorCount = {};

    let cliArguments = ' --config "' + config.tslint + '"' +
      ' --format json' +
      ' --out "' + config.jsonReport + '"' +
      ' "' + config.srcFiles + '"' + ' --force';

    if (config.exclude.length > 0) {
      config.exclude.forEach(function(excludePath) {
        cliArguments = cliArguments + ' --exclude "' + path.join(basePath, excludePath) + '"';
      });
    }
    
    if (config.typeCheck) {
      cliArguments = cliArguments + ' --project ' + config.tsconfig
    }

    console.info(funkyLogger.color('cyan', 'Generating TSlint report.'));
    const result = npmRun.execSync('tslint' + cliArguments, { cwd: __dirname });
    console.info(result.toString());
    console.info(funkyLogger.color('green', 'Tslint report written to JSON'));

    console.info(funkyLogger.color('cyan', 'Reading json file...'));
    let rawData = JSON.parse(fs.readFileSync(config.jsonReport, 'utf8'));
    console.info(funkyLogger.color('green', 'File read complete.'));
    let filesCovered = [];

    console.info(funkyLogger.color('cyan', 'Mapping data...'));
    rawData.forEach((obj) => {
      if (filesCovered.includes(obj.name)) {
        fileListWithErrorCount[obj.name]++;
      } else {
        filesCovered.push(obj.name);
        fileListWithErrorCount[obj.name] = 1;
      }
    });

    Object.keys(fileListWithErrorCount).forEach((key) => {
      fileListWithErrorCountArray.push({
        name: key,
        count: fileListWithErrorCount[key],
        details: _.filter(rawData, { name: key })
      });
    });
    console.info(funkyLogger.color('green', 'Data mapping complete.'));

    fileListWithErrorCountArray.sort(function (a, b) {
      return b.count - a.count;
    });

    for (let i = 0; i < fileListWithErrorCountArray.length; i++) {
      fileListWithErrorCountArray[i].index = i + 1;
    }

    data.total = rawData.length;
    data.errors = fileListWithErrorCountArray;

    console.info(funkyLogger.color('cyan', 'Writing data...'));
    const template = fs.readFileSync(__dirname + '/html-report-template.html', 'utf8');
    const compiledTemplate = handlebars.compile(template, {});
    const html = compiledTemplate(data);
    fs.writeFileSync(config.finalReport, html, 'utf8');
    console.info(funkyLogger.color('green', 'Data write complete.'));

    console.info(funkyLogger.color('yellow', '\nTotal lint issues found: '), funkyLogger.color('red', data.total));
    console.info(funkyLogger.color('green', 'TSLint html report generated and written to file'));

    if (config.breakOnError && data.total > 0) {
      process.exit(1);
    }

  }

  module.exports = generateReport;

})();
