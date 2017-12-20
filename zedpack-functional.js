#! /usr/bin/env node
const R = require('ramda')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const Future = require('fluture');
const Task = require('data.task')

// const readFile = Future.of(function (done) { fs.readFile(file, 'utf8', done) })

// var getPackageName = function (file) {
//     return Future.node(function (done) { fs.readFile(file, 'utf8', done) })
//         .chain(Future.encase(JSON.parse))
//         .map(function (x) { return x.name });
// };

// getPackageName('package.json')
//     .fork(console.error, console.log);

var readFile = function (filename) {
    return Task.of(function (reject, result) {
        fs.readFile(filename, 'utf-8', function (err, data) {
            err ? reject(err) : result(data);
        });
    });
};

const readMeta = readFile('package.json')

readMeta.fork(
    error => { console.log(error, 'error') },
    page => { console.log(R.map(page), 'no error') }
)
// const readFile
// const writeFile

// // create output

// const split
// const findTag = filter(regex)
// const replaceStyleTag
// const replaceScriptTag