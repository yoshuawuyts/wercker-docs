/*eslint no-console: 0 camelcase: 0*/

var templates   = require('metalsmith-templates');
var highlight   = require('metalsmith-metallic');
var markdown    = require('metalsmith-markdown');
var source      = require('vinyl-source-stream');
var spawn       = require('child_process').spawn;
var dtj         = require('directory-to-json');
var frontMatter = require('gulp-front-matter');
var livereload  = require('gulp-livereload');
var envify      = require('envify/custom');
var assign      = require('object-assign');
var flatten     = require('gulp-flatten');
var concat      = require('gulp-concat');
var browserify  = require('browserify');
var gulpsmith   = require('gulpsmith');
var sass        = require('gulp-sass');
var myth        = require('gulp-myth');
var assert      = require('assert');
var gulp        = require('gulp');
var path        = require('path');

module.exports = gulp;

/**
 * Paths.
 */
var jsFiles = [
  '*.js*',
  'local_modules/**/*.js*',
  '!local_modules/**/node_modules/*.js*'
];

var moduleEntryPoint = [
  path.join(__dirname, 'index.js')
];

var docs = {
  docs: [
    'lib/docs/**/*.md',
    'lib/docs/*.md'
  ],
  faq: [
    'lib/faq/**/*.md',
    'lib/faq/*.md'
  ],
  index: [
    'lib/index/**/*.md',
    'lib/index/*.md'
  ],
  learn: [
    'lib/learn/**/*.md',
    'lib/learn/*.md'
  ]
};

var styleFiles = [
  'node_modules/css-wipe/index.css',
  'node_modules/@local/wercker-animations/index.css',
  'node_modules/@local/wercker-colors/index.css',
  'node_modules/@local/wercker-typography/index.css',
  'local_modules/**/*.css'
];

var imageFiles = [
  'local_modules/**/*.jpg',
  'local_modules/**/*.png',
  'local_modules/**/*.gif',
  'local_modules/**/*.svg'
];

/**
 * Compile CSS
 */
gulp.task('styles', function() {
  gulp
    .src(styleFiles)
    .pipe(concat('build.css'))
    .pipe(myth())
    .pipe(sass())
    .pipe(gulp.dest(path.join(__dirname, '/build/')));
});

/**
 * Build a template.
 * TODO: move to module.
 *
 * @param {String} tn
 * @api private
 */
function buildTemplate(tn) {
  assert('string' == typeof tn, 'TemplateName should be a string');

  var outDir = 'index' == tn ? '' : tn;
  var templateDir = 'lib/' + tn;

  gulp.src(docs[tn])
    .pipe(frontMatter())
    .on('data', parseFile)
    .pipe(metalPipe())
    .pipe(gulp.dest('./build/' + outDir));

  function metalPipe() {
    return gulpsmith()
      .use(highlight())
      .use(markdown({smartypants: true, gfm: true}))
      .use(templates({engine: 'mustache', directory: templateDir}));
  }

  function parseFile(file) {
    assign(file, {template: 'index.html'});
    console.log(Object.keys(file.toJSON()))
    delete file.frontMatter;
  }

}

/**
 * Compile JS
 */
gulp.task('modules', function() {
  var env = process.env.NODE_ENV || 'development';
  var debug = (env !== 'production');

  dtj(path.resolve('./lib'), './build/db.json', function(err) {
    if (err) return console.log(err);
    bundle()
  });

  function bundle() {
    browserify(moduleEntryPoint, {debug: debug})
      .transform('brfs')
      .transform(envify({NODE_ENV: env}))
      .bundle()
      .pipe(source('build.js'))
      .pipe(gulp.dest(path.join(__dirname, '/build/')));
  }
});

/**
 * Compile docs.
 */
gulp.task('docs', function() {
  Object.keys(docs).forEach(function(key) {
    buildTemplate(key);
  });
});

/**
 * Copy assets
 */
gulp.task('assets', function() {
  gulp
    .src(imageFiles)
    .pipe(flatten())
    .pipe(gulp.dest(path.join(__dirname, '/build/images')));
});

/**
 * Lint files
 */
gulp.task('lint', function() {
  var childProcess = Object.create(process);
  childProcess.env.NODE_ENV = 'test';
  var args = [
    path.join(__dirname, './node_modules/.bin/eslint'),
    '.'

  ];
  spawn(process.argv[0], args, {stdio: [0,1,2], env: childProcess.env});
});

/**
 * Watch for file changes
 */
gulp.task('watch', function() {

  // determine which folders to watch for doc changes.
  var watchDocs = [];
  Object.keys(docs).forEach(function(key) {
    watchDocs.push('lib/' + key + '/*.md');
    watchDocs.push('lib/' + key + '/**/*.md');
    watchDocs.push('lib/' + key + '/index.html');
  });

  gulp.watch(['/build/**']).on('change', livereload.changed);
  gulp.watch(jsFiles, ['modules']);
  gulp.watch([watchDocs], ['docs']);
  gulp.watch(styleFiles, ['styles']);
  livereload.listen();
});

/**
 * build
 */
gulp.task('build', [
  'docs',
  'modules',
  'styles',
  'assets'
]);

/**
 * Default
 */
gulp.task('default', [
  'build',
  'watch'
]);
