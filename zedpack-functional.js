#! /usr/bin/env node
const S = require('sanctuary')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const Future = require('fluture')

const getFileContents = file => (Future.node(done => { fs.readFile(file, 'utf8', done) }))
const writeFile = contents => (fs.writeFile(argv.output, contents, writeFileSuccess))

const noFileFound = x => {}
const writeFileSuccess = err => err ? (
    console.log('Could not write to file.')
) : (
    console.log('jolly good, all saved.')
)

const getCss = getFileContents(argv.css ? argv.css : '')
const getJs = getFileContents(argv.js ? argv.js : '')
const getHtml = getFileContents(argv.html ? argv.html : '')

// A function which knows what kind of output is expected
const createOutput = argv.output ? x => writeFile(x) : x => console.log(x)

// Wraps Futures in an 'Either' type
const stabalizedFutures = [getCss, getJs, getHtml].map(Future.fold(S.Left, S.Right));
// Runs all Futures in parallel 
Future.parallel(3, stabalizedFutures).fork(createOutput, createOutput);

// // // create output

// const split
// const findTag = filter(regex)
// const replaceStyleTag
// const replaceScriptTag