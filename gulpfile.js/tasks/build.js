'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(done) {
  runSequence('clean', 'copy', 'tslint', 'typescript', done);
});
