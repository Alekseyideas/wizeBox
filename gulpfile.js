const   gulp = require('gulp'),
        pug = require('gulp-pug'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        image = require('gulp-image'),
        notify = require('gulp-notify'),
        webpack         = require('webpack'),
        webpackStream   = require('webpack-stream'),
        webpackConfig   = require('./webpack.config.js'),
        browserSync = require('browser-sync').create();


const path = {
  public: './public/',
  pug: './src/views/',
  sass: './src/sass/',
  css: './public/css/',
  js: './public/js/',
  es6: './src/js/',
  img: './src/img/',
  img_optimized: './public/img/',
};

gulp.task('pug', function buildHTML() {
  return gulp.src(path.pug+'pages/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .on('error', notify.onError(function (error) {
      return 'An error occurred while compiling Pug.\nLook in the console for details.\n' + error;
    }))
    .pipe(gulp.dest(path.public));
});

gulp.task('rebuild', ['pug','scripts'], function () {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass','pug','scripts'], function() {
  browserSync.init({
    port: 3005,
    server: path.public
  });
});

gulp.task('sass', function () {
  return gulp.src(path.sass + '**/*.sass')
    .pipe(sass({
      includePaths: [path.sass],
      outputStyle: 'compressed'
    }))
    .on('error', sass.logError)
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {
      cascade: true
    }))
    .pipe(gulp.dest(path.css))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('scripts', function() {
  return gulp.src(path.es6 + 'index.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest(path.js))
});

gulp.task('image', function () {
  gulp.src(path.img+'**/*')
    .pipe(image())
    .pipe(gulp.dest(path.img_optimized));
});



gulp.task('watch', function () {
  gulp.watch(path.sass + '**/*.sass', ['sass']);
  gulp.watch(path.pug + '**/*.pug', ['rebuild']);
  gulp.watch(path.es6 + '**/*.js', ['rebuild']);
});

gulp.task('default', ['browser-sync', 'watch']);