let _ = require('lodash');
let browserifyIncremental = require('browserify-incremental');
let browserify = require('browserify');
let moduleify = require('moduleify');
let source = require('vinyl-source-stream');
let merge = require('merge-stream');

let packageJson = require('../../package.json');
let dependencies = Object.keys(packageJson && packageJson.dependencies || {});

let requireBundle = (prebundle, libs) => _.reduce(libs, (prebundle, value, key) => {
    return prebundle.require(key, {expose: value});
}, prebundle);

export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    let browserifyShimConfig = _.reduce(globs.scripts.shims, (obj, v, k) => {
        obj[k] = (typeof v === 'string' ? v.replace('global:', '') : v.exports);
        return obj;
    }, {});

    gulp.task('scripts:libs', () => {
        let node_modules = browserify(_.assign(
            {}
            , config.browserify
            , {
                noParse: dependencies
            }))
            .require(dependencies)
            //.transform({
            //    global: true
            //}, 'uglifyify')
            .bundle();

        let commonjs = requireBundle(browserify(config.browserify), globs.scripts.commonjs)
            .bundle();

        let shim = requireBundle(browserify(config.browserify), browserifyShimConfig)
            .transform('browserify-shim')
            .bundle();

        return merge(node_modules, commonjs, shim)
            .pipe(source('vendor.min.js'))
            .pipe(gulp.dest(`${dirs.dist}/js`))
    });


    //let bundler = browserify(`${dirs.src}/js/app.js`, {
    let bundler = browserifyIncremental(`${dirs.src}/js/app.js`, _.assign({}, config.browserify, {
        paths: ['./src/js/']
    }))
        .external(_.values(browserifyShimConfig))
        .external(_.values(globs.scripts.commonjs))
        .external(dependencies)
        .transform('babelify')
        //.transform('browserify-ngannotate')
        //.transform({
        //    global: true
        //}, 'uglifyify')
        .transform('stringify', config.stringify);

    gulp.task('scripts:local', () => {
        return bundler
            .bundle()
            .on('error', function handleError(err) {
                console.error(err.toString());
                this.emit('end');
            })
            .pipe(source('bundle.js'))
            .pipe(gulp.dest(`${dirs.dist}/js`))
            .pipe($.livereload());
    });

    gulp.task('scripts', ['scripts:libs', 'scripts:local']);
}