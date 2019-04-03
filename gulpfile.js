const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const browserify = require('browserify');
const sourse = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const babelify = require('babelify');

// /DEV MODE///

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: './src/',
      index: 'home.html',
    },
    notify: false,
  });
});

gulp.task('sass', () => {
  return gulp.src('src/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false,
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.reload({
        stream: true,
      }));
});


gulp.task('watch', () => {
  gulp.watch('src/**/*.html').on('change', browserSync.reload);
  gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
  gulp.watch(['src/js/**/*.js', '!./src/js/bundle.js'], gulp.series('js'));
  gulp.watch('src/js/bundle.js').on('change', browserSync.reload);
});

gulp.task('js', () => {
  return browserify('./src/js/main', {
    debug: true,
  })
      .bundle()
      .pipe(sourse('./src/js/bundle.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({
        loadMaps: true,
      }))
      // .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('.'));
});

gulp.task('default', gulp.series(
    gulp.parallel('watch', 'serve')
));

// GULP BUILD //

const htmlmin = require('gulp-htmlmin');
const csso = require('gulp-csso');
const gzip = require('gulp-gzip');

gulp.task('html-build', () => {
  return gulp.src('src/**/*.html')
      .pipe(htmlmin({
        collapseWhitespace: true,
      }))
      .pipe(gulp.dest('./build'));
});


gulp.task('csso', () => {
  return gulp.src('src/scss/**/*.scss')
      .pipe(sourcemaps.init())
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false,
      }))
      .pipe(sourcemaps.write())
      .pipe(csso({
        restructure: false,
        sourceMap: true,
        debug: true,
      }))
      .pipe(gulp.dest('build/css'));
});

gulp.task('font-build', () => {
  return gulp.src('src/fonts/**/*.*')
      .pipe(gulp.dest('./build/fonts'));
});

gulp.task('favicon-build', () => {
  return gulp.src('src/favicon/**/*.*')
      .pipe(gulp.dest('./build/favicon'));
});

gulp.task('img-build', () => {
  return gulp.src('src/img/**/*.*')
      .pipe(gulp.dest('./build/img'));
});

gulp.task('js-build-lib', () => {
  return gulp.src('src/js/lib/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('build/js/lib'));
});

gulp.task('js-build', () => {
  return gulp.src(['src/js/bundle.js', 'src/js/bundle.js.map'])
      .pipe(gulp.dest('build/js/'));
});

gulp.task('gzipCssFiles', () => {
  return gulp.src('build/css/*.css')
      .pipe(gzip())
      .pipe(gulp.dest('build/css'));
});

gulp.task('gzipJSFiles', () => {
  return gulp.src('build/js/**/*.js')
      .pipe(gzip())
      .pipe(gulp.dest('build/js'));
});

gulp.task('build', gulp.series('html-build', 'csso', 'font-build', 'favicon-build', 'img-build', 'js-build-lib', 'js-build', gulp.parallel('gzipCssFiles', 'gzipJSFiles')));
