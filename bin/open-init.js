#!/usr/bin/env node
var vfs = require('vinyl-fs');
var fs = require('fs');
var through = require('through2');
var path = require('path');
var inquirer = require('inquirer');
var join = path.join;
var basename = path.basename;

//版本
if (process.argv.length === 3 &&
    (process.argv[2] === '-v' || process.argv[2] === '--version')) {
    console.log(require('../package').version);
    return;
}
var cwd;
if(process.argv[2] === '--nomal'){
    cwd = join(__dirname, '../demo/nomal');
}else if (process.argv[2] === '--antd') {
    cwd = join(__dirname, '../demo');
}
var dest = process.cwd();

vfs.src(['**/*', '!node_modules/**/*'], {cwd: cwd, cwdbase: true, dot: true})
    .pipe(template(dest))
    .pipe(vfs.dest(dest))
    .on('end', function() {
        fs.renameSync(path.join(dest,'gitignore'),path.join(dest,'.gitignore'));
        require('../lib/install');
    })
    .resume();
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

