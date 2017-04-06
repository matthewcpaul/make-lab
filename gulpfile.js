var gulp         = require('gulp');
var sass         = require('gulp-sass');
var scsslint     = require('gulp-scss-lint');
var nano         = require('gulp-cssnano');
var shell        = require('gulp-shell');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync  = require('browser-sync').create();
var deploy       = require('gulp-gh-pages');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');

// Compile SCSS into CSS, sourcemaps, autoprefixer, cssnano + auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src(['_styles/scss/style-archive.scss', '_styles/scss/style-events.scss', '_styles/scss/style-involved.scss', '_styles/scss/style-about.scss'])
  .pipe(sass({
    includePaths: [
      "node_modules/ibm-design-colors",
      "node_modules/@whitewater/rapid/scss"
    ]
  }))
  .pipe(autoprefixer())
  .pipe(nano({discardComments: {removeAll: true}}))
  .pipe(gulp.dest('_site/assets/css'))
  .pipe(browserSync.stream());
});

// Icons
gulp.task("icons", () => {
  return gulp.src(["node_modules/ibm-design-icons/dist/svg/**/*.svg", 'images/**/*.svg'])
    .pipe(svgstore())
    .pipe(rename("icon-store.svg"))
    .pipe(gulp.dest("_site/images/"));
});


// Build incrementally with _config.yml + local_config.yml for development
gulp.task('local-build', shell.task(['bundle exec jekyll build --config _config.yml,local_config.yml']));

// Build once with only _config.yml for production
gulp.task('production-build', shell.task(['bundle exec jekyll build']));

// Start a local server with browser-sync + watch for changes
gulp.task('serve', ['sass', 'icons', 'local-build'], function() {
  browserSync.init({
    server: { baseDir: '_site/' }
  });

  gulp.watch('_styles/scss/**/*.scss', ['sass']);
  gulp.watch(['_includes/*.html', '_layouts/*.html', 'index.md', '**/index.md'], ['local-build']);
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// Deploy _site to gh-pages
gulp.task('deploy-gh-pages', ['icons', 'production-build', 'sass'], function () {
  return gulp.src('./_site/**/*')
    .pipe(deploy())
});

// Run sass, local-build, and serve
gulp.task('default', ['serve']);

// Run production-build, and deploy-gh-pages
gulp.task('deploy', ['deploy-gh-pages']);

// Compile SCSS for production
// gulp.task('sass-production', ['production-build'], function() {
//   return gulp.src('_styles/scss/style.scss')
//   .pipe(sass({
//     includePaths: [
//       "node_modules/ibm-design-colors",
//       "node_modules/@whitewater/rapid/scss"
//     ]
//   }))
//   .pipe(autoprefixer())
//   .pipe(nano({discardComments: {removeAll: true}}))
//   .pipe(gulp.dest('_site/assets/css'))
// });

// Production icons
// gulp.task("icons", ['sass-production'], () => {
//     return gulp.src(["node_modules/ibm-design-icons/dist/svg/**/*.svg", 'images/**/*.svg'])
//         .pipe(svgstore())
//         .pipe(rename("icon-store.svg"))
//         .pipe(gulp.dest("_site/images/"));
// });
