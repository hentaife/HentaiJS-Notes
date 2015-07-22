var gulp, $;

gulp = require('gulp');
$ = require('gulp-load-plugins')();

console.log($.sourcemaps.init);

gulp.task('build', function() {
  return gulp.src([
    'src/ht/helpers.js',
    'src/ht/container.js',
    'src/ht/app.js',
    'src/ht/provider.js',
    'src/ht/core.js',
    'src/ht/compile.js',
    'src/ht/router.js',
  ])
    .pipe($.sourcemaps.init())
      .pipe($.concat('ht.js'))
      .pipe($.babel())
     .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['build']);