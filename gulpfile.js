var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

var paths = {
  index: 'index.html',
  vendorSource: [
    'node_modules/jquery/dist/jquery.js',
    'node_modules/p5/lib/p5.js',
    'node_modules/p5.gibber.js/dist/p5.gibber.js'
  ],
  vendors: 'js/vendor/**/*.js',
  styles: 'scss/**/*.scss',
  scripts: ['js/**/*.js', '!js/vendor/**/*.js'],
  dev: 'dev',
  prod: 'prod'
};

gulp.task('vendorUpdate', function() {
  gulp.src(paths.vendorSource)
    .pipe(gulp.dest('./js/vendor'));
});

gulp.task('index', function() {
  gulp.src(paths.index)
    .pipe(gulp.dest(paths.dev));
});

gulp.task('vendors', function() {
  gulp.src(paths.vendors)
    .pipe(gulp.dest(paths.dev));
});

gulp.task('sass', function() {
  gulp.src(paths.styles)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.dev));
});

gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dev));
});

gulp.task('watch', function() {
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.vendors, ['vendors']);
  gulp.watch(paths.styles, ['sass']);
});

gulp.task('default', ['watch', 'index', 'vendors', 'scripts', 'sass']);
gulp.task('build', ['index', 'vendors', 'scripts', 'sass']);
