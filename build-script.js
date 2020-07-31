const fs = require('fs-extra');
const concat = require('concat');

(async function build() {

    const files =[
        './dist/mohan-trading-chart/runtime.js',
        './dist/mohan-trading-chart/polyfills.js',
        './dist/mohan-trading-chart/main.js',
    ]
    const data = [
      './src/app/data.js'
    ]

    await fs.ensureDir('elements')

    await concat(files, 'elements/ng-greet-element.js')
    await concat(data,'elements/data.js')
    console.info('Angular Elements created successfully!')

})()
