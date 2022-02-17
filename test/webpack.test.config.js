const path = require('path');
const glob = require('glob');

const testFiles = glob
    .sync("./test/*.spec.js")
    .filter((element) => element !== "test/bundle.test.js");

module.exports = {
    entry: testFiles,
    // entry: "./test/myTest.spec.js",
    output: {
        path: path.resolve(__dirname, "."),
        filename: "bundle.test.js"
    },
    mode: "none"
};
