# Zedpack - Web project compiler

### Description

This project addresses a specific development situation involving an html file, a javascript file, and a css file. Whether it's for network speed reasons, or CMS restriction reasons, sometimes, you need to deliver your content as one file, not many. In this situation, you can work with one file the whole time, or work with seperate files and manually combine them when deploying. Zedpack streamlines the process of combining the files so you can keep working in a modular fashion. This command line utility takes as input an html file, a css file, and a javascript file, and outputs a new combined html file.
It works by looking through each line of the html and finding instances of the given css and js filenames. It removes those lines and replaces them with new tags filled with the given files' contents. 
If the output flag is not used, the result is passed to stdout

### Usage examples

zedpack --css ./style.css --js ./javascript/script.js --html ./index.html --output compiled.html
zedpack --js ./script.js --html ./index.html 
zedpack --html ./index.html --output ./build/app.html --js ./app.js 

### Bugs

If more than one css or js flag is passed as an argument, only the first will be recognised. The next version of this project will include support for multiple files of the same type. 


### Author

Patrick Stockwell
stockwellpatrick@gmail.com

### Getting Started

This project uses NodeJS and yarn (npm). 
Node - 6.11.4
Yarn - 1.2.1

Run `yarn install`

To run the program from anywhere on the filesystem, you need to create a symbolic link in a directory found on $PATH.
To see the directories that you computer uses to save executable binaries, type `$PATH`. Use one of these directories to save the symbolic link to.
eg. `ln -s ./zedpack.js /usr/local/bin/zedpack`
This saves a link to zedpack.js called simply 'zedpack' in /usr/local/bin
