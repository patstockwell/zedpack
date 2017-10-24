#! /usr/bin/env node
const argv = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const strings = {
    css: "",
    js: "",
    html: "",
    regex: {}
}

function zedpack() {
    getCSS()
}

function getCSS() {
    getTextFromFile(argv.css, getJS, "css")
}

function getJS() {
    getTextFromFile(argv.js, getHTML, "js")
}

function getHTML() {
    getTextFromFile(argv.html, createOutput, "html")
}

function createOutput() {
    const htmlLines = strings.html.split('\n')
    for(let x = 0; x < htmlLines.length; x++) {
        if(htmlLines[x].indexOf(strings.regex.css) !== -1) {
            htmlLines[x] = `<style>${strings.css}</style>`
        }
        else if(htmlLines[x].indexOf(strings.regex.js) !== -1) {
            htmlLines[x] = `<script>${strings.js}</script>`
        }
    }
    if(argv.output) {
        writeToFile(htmlLines)
    }
    else {
        console.log(htmlLines.join('\n'))
    }
}

function writeToFile(data) {
	fs.writeFile(argv.output, data.join('\n'), function (err) {
        if (err) {
			throw err
			console.log('Could not write to file. Try another filename, or leave out the filename and pipe from stdout')
		}
    })
}

function getTextFromFile(filename, nextFunction, string) {
    if(filename) {
        fs.readFile(filename, { encoding: 'UTF-8' },  (err, data) => {
            if (err) {
                console.log("Could not find ", filename)
                process.exit(1)
            }
            strings[string] += "\n" + data
            // strip the filepath and create a RegExp with the filename
            strings.regex[string] = argv[string].substring(argv[string].lastIndexOf('/') + 1)
            nextFunction()
        })
    }
    else nextFunction()
}

// Start packing!
zedpack()
