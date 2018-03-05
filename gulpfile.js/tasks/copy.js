'use strict';

var gulp = require('gulp');

const STATIC_APP_GLOB = ['src/**/*.yaml'];

const BUILD_PATH = 'dist';
const APP_BUILD_PATH = BUILD_PATH + '/src';

var copyTask = function () {
  gulp.src(STATIC_APP_GLOB)
    .pipe(gulp.dest(APP_BUILD_PATH));
};

gulp.task('copy', copyTask);
module.exports = copyTask;
