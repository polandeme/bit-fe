var gulp = require('gulp'); 
var less = require('gulp-less');
var path = require('path');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var webserver = require('gulp-webserver');
var rev = require("gulp-rev");
var rename = require("gulp-rename");
var revReplace = require("gulp-rev-replace");
var addsrc = require('gulp-add-src');

// run a simple webserver
gulp.task('webserver', function() {
  gulp.src('')
    .pipe(webserver({
      livereload: true
    }));
});

// less to css
gulp.task('less', function() {
  return gulp.src('./public/less/*.less')
    .pipe(less({
      paths: [path.join(__dirname, 'less', 'includes')]
    }))
    .pipe(gulp.dest(path.join(__dirname) +  '/static/assets/css'));
});

// clean css
gulp.task('cleanCss', ['less'], function() {
  return gulp.src(path.join(__dirname) +  '/static/assets/css/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest(path.join(__dirname) +  '/static/assets/css'))
});

// uglify js
gulp.task('uglify-js', function() {
  return gulp.src(['./public/js/*.js', ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(path.join(__dirname) + '/static/assets/js'))
});

gulp.task('img2dist', function() {
  return gulp.src('./static/image/**/**')
    .pipe(gulp.dest('./dist/image'))
});

//dist 
gulp.task('dist', ['cleanCss', 'uglify-js', 'img2dist'], function() {
  return gulp.src(['./static/**/**/*.css', './static/**/**/*.js'])
    .pipe(rev())
    .pipe(addsrc('./*.html'))
    .pipe(revReplace())
    .pipe(gulp.dest('./dist'))
})
;