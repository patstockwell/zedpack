#! /usr/bin/env node
const R = require('ramda')
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

const getCss = getFileContents(argv.css)
const getJs = getFileContents(argv.js)
const getHtml = getFileContents(argv.html)

const createOutput = R.curry((fileName, content) => {
    fileName ? writeFile(content) : console.log(content)
})

const outputWith = createOutput(argv.output)

getCss.fork(noFileFound, outputWith)

// // // create output

// const split
// const findTag = filter(regex)
// const replaceStyleTag
// const replaceScriptTag