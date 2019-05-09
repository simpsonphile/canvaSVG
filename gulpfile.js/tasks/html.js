var config       = require('../config');
if(!config.tasks.html) return;

var browserSync  = require('browser-sync');
var data         = require('gulp-data');
var gulp         = require('gulp');
var gulpif       = require('gulp-if');
var handleErrors = require('../lib/handleErrors');
var htmlmin      = require('gulp-htmlmin');
var path         = require('path');
var fs           = require('fs');
var replace      = require('gulp-replace');
var twig = require('gulp-twig');

var exclude = path.normalize('!**/{' + config.tasks.html.excludeFolders.join(',') + '}/**');

var paths = {
  src: [path.join(config.root.src, config.tasks.html.src, '/*.{' + config.tasks.html.extensions + '}'), exclude],
  dest: path.join('./')
}

var getData = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.data)
  var fileName = dataPath + '/' + path.basename(file.path, '.twig') + '.json';

  if (fs.existsSync(fileName)) {
     return JSON.parse(fs.readFileSync(fileName, 'utf8'));
  }
}

var getDataOne = function(file) {
  var dataPath = path.resolve(config.root.src, config.tasks.html.src, config.tasks.html.dataFile)
  return JSON.parse(fs.readFileSync(dataPath, 'utf8'))
}

var htmlTask = function() {
  return gulp.src(paths.src)
    .pipe(data(getData))
    .pipe(data(getDataOne))
    .on('error', handleErrors)
    .pipe(twig())
    .on('error', handleErrors)
    .pipe(gulpif(global.production, replace(' <br', '&nbsp;<br')))
    .pipe(gulpif(global.production, replace('files/', '../files/')))
    //.pipe(gulpif(global.production, htmlmin(config.tasks.html.htmlmin)))
    .pipe(gulp.dest(path.join(global.production ? config.root.dist : '', paths.dest)))
    .pipe(gulpif(!global.production, browserSync.stream()))
}

gulp.task('html', htmlTask);
module.exports = htmlTask;
