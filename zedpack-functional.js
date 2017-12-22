#! /usr/bin/env node
const S = require('sanctuary')
const R = require('ramda')
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const Future = require('fluture')

const nonMatcher = /$a/ // a RegExp that matches nothing.
const getFileContents = file => (Future.node(done => { fs.readFile(file, 'utf8', done) }))
const writeFile = contents => (fs.writeFile(argv.output, contents, writeFileSuccess))
const errorMessage = () => console.log('Sorry, looks like we ran into a problem.')
const writeFileSuccess = err => err ? (
    console.log('Could not write to file.')
) : (
    console.log('Jolly good, all saved.')
)
// A function which knows what kind of output is expected
const createOutput = argv.output ? x => writeFile(x) : x => console.log(x)

const getHtml = getFileContents(argv.html ? argv.html : '')
// getHtml.fork(console.log, console.log)
const splitOnNewline = R.lift(str => typeof str === 'String' ? str.split('\n') : null)
const splitHtml = splitOnNewline(getHtml)

// Wraps Futures in an 'Either' type
// const stabalizedFuture = R.map(Future.fold(S.Left, S.Right))

// console.log(stabalizedFuture(getCss))
// Runs all Futures in parallel 
// Future.parallel(3, stabalizedFutures).fork(errorMessage, createOutput);

// console.log('here', R.map(splitHtml))
splitHtml.fork(console.log, console.log)


const getCss = getFileContents(argv.css ? argv.css : '')
const getJs = getFileContents(argv.js ? argv.js : '')
const hasFileName = R.curry((regexObj, str) => regexObj.test(str))
const hasCssFileName = hasFileName(new RegExp(argv.css))
const checkForLine = R.curry((booleanFunc, replacement, line) => booleanFunc(line) ? replacement : line)
const updateCssLine = checkForLine(hasCssFileName, R.map(getCss))