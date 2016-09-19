#!/usr/bin/env node
var vfs = require('vinyl-fs');
var fs = require('fs');
var through = require('through2');
var path = require('path');
var inquirer = require('inquirer');
var join = path.join;
var basename = path.basename;
var program = require('commander');
program
    .allowUnknownOption()
    .version(require('../package').version)
    .usage('开放平台脚手架！[options] <package>')
    .option('-n, --nomal', '普通React+Redux项目')
    .on('--help', function () {
        console.log('  开放平台脚手架help，等我写完:')
    })
    .parse(process.argv);

if (process.argv.length === 1||process.argv.length === 2) {
    program.outputHelp();
}

if (program.nomal){
    init('nomal');
}
//版本
if (process.argv.length === 3 &&
    (process.argv[2] === '-v' || process.argv[2] === '--version')) {
    console.log(require('../package').version);
    return;
}


function init(type) {
    var cwd = join(__dirname, '../demo/'+type);
    var dest = process.cwd();
    vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
        .pipe(template(dest))
        .pipe(vfs.dest(dest))
        .on('end', function() {
            fs.renameSync(path.join(dest,'gitignore'),path.join(dest,'.gitignore'));
            require('../lib/install');
        })
        .resume();
}

function template(dest) {
    return through.obj(function (file, enc, cb) {
        if (!file.stat.isFile()) {
            return cb();
        }

        console.log('Write %s', simplifyFilename(join(dest, basename(file.path))));
        this.push(file);
        cb();
    });
}

function simplifyFilename(filename) {
    return filename.replace(process.cwd(), ".");
}

