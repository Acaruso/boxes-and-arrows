const path = require('path');
const glob = require('glob');

const testFiles = glob
    .sync("./tests/*.spec.js")
    .filter((element) => element !== "tests/bundle.test.js");

module.exports = {
    entry: testFiles,
    output: {
        path: path.resolve(__dirname, "."),
        filename: "bundle.test.js"
    },
    mode: "none"
};
