'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var config = require('config');

var webserverTask = function () {
    return nodemon({
        script: 'dist/src/server.js',
        watch: 'src/',
        ext: 'ts json yaml',
        tasks: ['build'],
        env: {
            NODE_ENV: 'development',
            PORT: config.get('port')
        }
    });
};

gulp.task('webserver', webserverTask);
module.exports = webserverTask;
