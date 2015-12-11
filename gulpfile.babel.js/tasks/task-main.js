export default function (gulp, $, config) {
    let dirs = config.dirs;
    let globs = config.globs;

    gulp.task('dist', $.sequence('clean:all', ['copy', 'build', 'scripts', 'styles']));

    gulp.task('build', ['scripts:local', 'styles:local']);

    gulp.task('watch', () => {
        $.livereload.listen(function (err) {
            if (err) return console.log(err);
        });
        //gulp.watch(`${dirs.src}/**/*.js`, ['build', 'reload']);
        $.watch(globs.src, {
            readDelay: 200
            , verbose: true
        }, () => {
            //$.sequence('build')();
            $.sequence(['copy:index', 'build'], 'reload')();
        });
    });

    gulp.task('reload', () => {
        $.livereload.changed();
    });
}