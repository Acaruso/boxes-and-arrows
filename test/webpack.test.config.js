// const path = require("path");

// Our entry point's path is relative to where we are running Webpack,
// but our output path is relative to where the Webpack configuration lives

// module.exports = {
//   entry: "./test/canary.test.js",
//   output: {
//     path: path.resolve(__dirname, "."),
//     filename: "bundle.test.js",
//   },
//   mode: "none",
// };


const path = require('path');
const glob = require('glob');

const testFiles = glob
    .sync("./test/*.spec.js")
    .filter(function(element) {
        return element !== "test/bundle.test.js";
    })
    // .map(function(element) {
    //     return "./" + element;
    // });

console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!')
console.log(testFiles);

module.exports = {
    entry: testFiles,
    // entry: "./test/myTest.spec.js",
    output: {
        path: path.resolve(__dirname, "."),
        filename: "bundle.test.js"
    },
    mode: "none"
};
