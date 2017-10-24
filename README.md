# Zedpack - Web project compiler

### Description

This project addresses a specific development situation involving an html file, a javascript file, and a css file. Whether it's for network speed reasons, or CMS restriction reasons, sometimes, you need to deliver your content as one file, not many. In this situation, you can work with one file the whole time, or work with seperate files and manually combine them when deploying. Zedpack streamlines the process of combining the files so you can keep working in a modular fashion. This command line utility takes as input an html file, a css file, and a javascript file, and outputs a new combined html file.
It works by looking through each line of the html and finding instances of the given css and js filenames. It removes those lines and replaces them with new tags filled with the given files' contents. 
If the output flag is not used, the result is passed to stdout

### Usage examples

`zedpack --css ./style.css --js ./javascript/script.js --html ./index.html --output compiled.html`

`zedpack --js ./script.js --html ./index.html` 

`zedpack --html ./index.html --output ./build/app.html --js ./app.js` 

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

To start, run `./zedpack.js` from the project folder.

To run the program from anywhere on the filesystem by calling just `zedpack`, you need to create a symbolic link in a directory found on $PATH.
To see the directories that you computer uses to run executable binaries, type `$PATH`. Use one of these directories to save the symbolic link to.
eg. `ln -s ./zedpack.js /usr/local/bin/zedpack`
This saves a link called zedpack in /usr/local/bin that points to zedpack.js

### Flags

`--css` the css file used for input

`--js` the javascript file used for input

`--html` the html file used for input

`--output` the file to write the resulting html document

All flags are optional. Without the `--html` flag present, nothing will happen.

### Sample input/output

Input HTML

*note the <\link> tag and the <script> tag*
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Zedpack test document</title>
    <link rel="stylesheet" href="./style.css"></link>
</head>
<body>
    <h1 class="heading">Here is the Heading</h1> 
    <p class="paragraph">Here is the main body. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam sequi ratione illo facere, eligendi quidem sit animi, nam excepturi nulla voluptatibus recusandae voluptatem quas, aliquid nisi! Aspernatur iure porro voluptatibus!</p>
    <script src="./script.js"></script>
</body>
</html>
```

Output HTML

*note the change from <\link> to <style>*

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Zedpack test document</title>
<style>
.heading {
    color: red;
    text-decoration: underline;
}

.paragraph {
    color: blue;
    border: 3px solid green;
}
</style>
</head>
<body>
    <h1 class="heading">Here is the Heading</h1> 
    <p class="paragraph">Here is the main body. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam sequi ratione illo facere, eligendi quidem sit animi, nam excepturi nulla voluptatibus recusandae voluptatem quas, aliquid nisi! Aspernatur iure porro voluptatibus!</p>
<script>
console.log("I've been loaded. Jolly good.")
</script>
</body>
</html>
```

### Development

Some features and ideas to be added for subsequent iterations

* A `--help` flag for commandline support
* support for multiple files of the same kind
* Improve project deployment for global use without configuration
* Add a `--watch` command so the process can run and reload on file changes

