/*global -$ */
'use strict';
// generated on 2015-05-15 using generator-gulp-webapp 0.3.0
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var compass = require('gulp-compass');
var ngAnnotate = require('gulp-ng-annotate');
var autoprefixer = require('gulp-autoprefixer');
var karma = require('karma').server;
var merge = require('merge-stream');

gulp.task('compass', function() {
  return gulp.src('app/styles/**/*.scss')
    .pipe(compass({
      css: '.tmp/styles',
      sass: 'app/styles'
    }))
    .on('error', function(error) {
      // Would like to catch the error here 
      console.log(error);
    })
    .pipe(gulp.dest('.tmp/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('test', function (done) {
  return karma.start({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done);
});

gulp.task('jshint', function () {
  return gulp.src('app/scripts/**/*.js')
    .pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});

gulp.task('html', ['compass'], function () {
  var assets = $.useref.assets({searchPath: ['.tmp', 'app', '.']});

  return gulp.src('app/**/*.html')//limit to just html
    .pipe(assets)//use previously filtered out html files...in .tmp and app and . (as above)
    .pipe($.if('*.js', ngAnnotate()))//ngAnnotate
    .pipe($.if('*.js', $.uglify()))//minify js
    .pipe($.if('*.css', autoprefixer({browsers: ['last 2 versions'],cascade: false})))//autoprefix css
    .pipe($.if('*.css', $.csso()))//minify css
    .pipe(assets.restore())
    .pipe($.useref())//replace references to no optimised scripts/stylesheets
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))//minify html
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  var images = gulp.src('icon.png')
  // Disabled image min, breaks image includes in css
  //.pipe($.cache($.imagemin({
    //progressive: true,
    //interlaced: true,
    // don't remove IDs from SVGs, they are often used
    // as hooks for embedding and styling
    //svgoPlugins: [{cleanupIDs: false}]
  //})))
  .pipe(gulp.dest('dist/'));
  //way to merge multiple steps together
  return merge(images);
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')({
    filter: '**/*.{eot,svg,ttf,woff,woff2}'
  }).concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  var manifest = gulp.src('manifest.json', {dot: true}).pipe(gulp.dest('dist/'));
  return merge(manifest);
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['compass', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app']
    }
  });

  // watch for changes
  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    '.tmp/fonts/**/*'
  ]).on('change', reload);

  gulp.watch('app/styles/**/*.scss', ['compass']);
  gulp.watch('app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass-official'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], function () {
  //'jshint' - could add jsHint to tasks above, will break build until fixes made 
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});


// Grunt build tasks
//****************
//'clean:dist',       -> clean
// 'bower-install',   -> wiredep
//'useminPrepare',    -> html:useref
//'concurrent:dist',  -> html, fonts
//'autoprefixer',     -> html:autoprefixer
//'concat',           -> not used 
//'ngmin',            -> html:ngAnnotate
//'copy:dist',        -> html,extras
//'cdnify',           -> not used
//'cssmin',           -> html:csso
//'uglify',           -> html:uglify
//'rev',              -> not used
//'usemin',           -> html:useref
//'htmlmin'           -> html:htmlMinify
//'test'              -> Test