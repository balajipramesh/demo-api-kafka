'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// require all task files
requireDir('./tasks', { recurse: true });

// default task for development
gulp.task('default', function(done) {
    runSequence('build', 'webserver');
});
