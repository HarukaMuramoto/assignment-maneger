var
gulp         = require('gulp'),
browserSync  = require('browser-sync').create(),
sass         = require('gulp-sass'),
plumber      = require('gulp-plumber'),
rename       = require('gulp-rename'),
stylus       = require('gulp-stylus'),
autoprefixer = require('gulp-autoprefixer'),
spritesmith  = require('gulp.spritesmith');

// Static Server + watching html/css/js files
gulp.task('serve', ['sprite','sass'], function() {

  browserSync.init({
    ghostMode: false,
    port: 3000,
    server: './www'
  });

  gulp.watch([
    'www/**/*.html',
    'www/css/**/*.{scss,css}',
    'www/js/**/*.js',
    'www/images/_sprite/*'
  ]).on('change', browserSync.reload);
  gulp.watch('www/scss/*.scss', ['sass']);
  gulp.watch('www/img/_sprite/*', ['sprite', browserSync.reload]);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('www/scss/*.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(sass())
    .pipe(gulp.dest('www/css'))
    .pipe(browserSync.stream());
});

// CSS Sprite
gulp.task('sprite', function() {
  var spriteData = gulp.src('www/img/_sprite/*.png')
    .pipe(spritesmith({
      imgName : 'sprite.png',
      imgPath : '../img/sprite.png',
      cssName : '_sprite.scss',
      cssFormat : 'scss',
      algorithm : 'left-right',
      algorithmOpts : {
        sort : false
      },
      padding : 2
    }));
  spriteData.img.pipe(gulp.dest('www/img'));
  spriteData.css.pipe(gulp.dest('www/scss/lib'));
});

////////////////////
// compile-stylus
////////////////////
gulp.task('compile-stylus', function() {
  return gulp.src(['www/lib/onsenui/stylus/*-theme.styl'])
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        this.emit('end');
      }
    }))
    .pipe(stylus({errors: true, define: {mylighten: mylighten}}))
    .pipe(autoprefixer('> 1%', 'last 2 version', 'ff 12', 'ie 8', 'opera 12', 'chrome 12', 'safari 12', 'android 2'))
    .pipe(rename(function(path) {
      path.dirname = '.';
      path.basename = 'onsen-css-components-' + path.basename;
      path.ext = 'css';
    }))
    .pipe(gulp.dest('www/lib/onsenui/css/'));

  // needs for compile
  function mylighten(param) {
    if (param.rgba) {
      var result = param.clone();
      result.rgba.a = 0.2;
      return result;
    }
    throw new Error('mylighten() first argument must be color.');
  }
});

gulp.task('default', ['serve']);
gulp.task('build', ['compile-stylus']);
