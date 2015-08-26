var gulp = require('gulp');
var nodeDebug = require('gulp-node-debug');

var $ = require('gulp-load-plugins')({
  replaceString: /^gulp(-|\.)([0-9]+)?/
});

const fs          = require('fs');
const del         = require('del');
const path        = require('path');
const mkdirp      = require('mkdirp');
const isparta     = require('isparta');
const esperanto   = require('esperanto');

const manifest          = require('./package.json');
const config            = manifest.to5BoilerplateOptions;
const mainFile          = manifest.main;
const destinationFolder = path.dirname(mainFile);
const exportFileName    = path.basename(mainFile, path.extname(mainFile));

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

function test() {
  return gulp.src(['test/setup/node.js', 'test/unit/**/*.js', 'test/integration/**/*.js'], {read: false})
    .pipe($.plumber())
    .pipe($.mocha({reporter: 'spec', globals: config.mochaGlobals}).on("error", handleError));
}

gulp.task('debugTest', function() {
  var mochaScript = path.join(__dirname, 'node_modules/mocha/bin/_mocha');

  gulp.src(['test/setup/node.js', 'test/unit/**/*.js'])
    .pipe(nodeDebug({
      debugBrk: true,
      script: ['--watch'],
    }));

});

// Remove the build files
gulp.task('clean', function(cb) {
  del([destinationFolder], cb);
});

// Remove our temporary files
gulp.task('clean-tmp', function(cb) {
  del(['tmp'], cb);
});

// Lint our source code
gulp.task('lint-src', function() {
  return gulp.src(['src/**/*.js'])
    .pipe($.plumber())
    .pipe($.eslint({
      configFile: './.eslintrc',
      envs: [
        'node'
      ]
    }))
    .pipe($.eslint.formatEach('stylish', process.stderr))
    .pipe($.eslint.failOnError());
});

// Lint our test code
gulp.task('lint-test', function() {
  return gulp.src(['test/unit/**/*.js'])
    .pipe($.plumber())
    .pipe($.eslint({
      configFile: './test/.eslintrc',
      envs: [
        'node'
      ]
    }))
    .pipe($.eslint.formatEach('stylish', process.stderr))
    .pipe($.eslint.failOnError());
});

// Build two versions of the library
gulp.task('build', ['lint-src', 'clean'], function(done) {
  esperanto.bundle({
    base: 'src',
    entry: config.entryFileName
  }).then(function(bundle) {
    var res = bundle.toUmd({
      sourceMap: true,
      sourceMapSource: config.entryFileName + '.js',
      sourceMapFile: exportFileName + '.js',
      name: config.exportVarName
    });

    // Write the generated sourcemap
    mkdirp.sync(destinationFolder);
    var sourceFile = path.join(destinationFolder, exportFileName + '.js');
    fs.writeFileSync(sourceFile, res.map.toString());

    $.file(exportFileName + '.js', res.code, { src: true })
      .pipe($.plumber())
      .pipe($.sourcemaps.init({ loadMaps: true }))
      .pipe($.babel({ blacklist: ['useStrict'] }))
      .pipe($.sourcemaps.write('./', {addComment: false}))
      .pipe(gulp.dest(destinationFolder))
      .pipe($.filter(['*', '!**/*.js.map']))
      .pipe($.rename(exportFileName + '.min.js'))
      .pipe($.uglifyjs({
        outSourceMap: true,
        inSourceMap: destinationFolder + '/' + exportFileName + '.js.map'
      }))
      .pipe(gulp.dest(destinationFolder))
      .on('end', done);
  });
});

gulp.task('coverage', ['lint-src', 'lint-test'], function(done) {
  require('babel/register')({ modules: 'common' });
  gulp.src(['src/*.js'])
    .pipe($.plumber())
    .pipe($.istanbul({ instrumenter: isparta.Instrumenter }))
    .pipe($.istanbul.hookRequire())
    .on('finish', function() {
      return test()
      .pipe($.istanbul.writeReports())
      .on('end', done);
    });
});

// Lint and run our tests
gulp.task('test', ['lint-src', 'lint-test'], function() {
  require('babel/register')({ modules: 'common' });
  return test();
});

gulp.task('live', ['test'], function() {
  gulp.watch(['src/*.js', 'test/*.js'], function() {
    gulp.run('test');
  });
});

gulp.task('default', ['test']);
