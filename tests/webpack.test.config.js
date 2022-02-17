const path = require('path');
const glob = require('glob');

// Our entry point's path is relative to where we are running Webpack,
// but our output path is relative to where the Webpack configuration lives

const testFiles = glob
    .sync("./tests/*.spec.js")
    .filter(x => x !== "tests/bundle.test.js");

module.exports = {
    entry: testFiles,
    output: {
        path: path.resolve(__dirname, "."),
        filename: "bundle.test.js"
    },
    mode: "none"
};
