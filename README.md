
# tslint-html-report
A small module which runs TSLint on the given source glob and generates a simple HTML report.
Works with typescrit version 2.0 and greater.

## Installation

Install tslint-html-report locally and add it to the dev dependancies
```bash
npm install tslint-html-report --save-dev
```

## Usage

Simple require the module in your script/gulp task and invoke it with the desired config

```js
const tslintHtmlReport = require('tslint-html-report');

tslintHtmlReport({/*config*/});

```

and you're done!!

##Config

The tslint-html-report takes the following config object and the default values are as below

```js
config: {
  tslint: 'node_modules/tslint-html-report/tslint.json', // path to tslint.json
  srcFiles: 'src/**/*.ts', // files to lint
  outDir: 'reports/tslint-html-report', // output folder to write the report to.
  html: 'tslint-report.html', // name of the html report generated
  breakOnError: false, // Should it throw an error in tslint errors are found.
  typeCheck: true, // enable type checking. requires tsconfig.json
  tsconfig: 'tsconfig.json' // path to tsconfig.json
}
```
