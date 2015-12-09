/*
 * Glob patterns
 * ============================================================================
 *
 * Information about the project assets and source code. Very specific to the
 * development tasks, telling where to read the project source code for
 * processing and compilation.
 */

'use strict';


var dirs = require('./dirs');

var globs = {
    src: [`${dirs.src}/**/*.{js,html}`]
    , index: [`${dirs.src}/index.html`]
    , assets: [`${dirs.src}/assets/**/*`]
    , scripts: {
        local: [`${dirs.src}/js/**/*.js`]
        , commonjs: {}
        , shims: {
            //'./vendor/x.js'    :  { 'exports': '$' },
            //'./vendor/x-ui.js' :  { 'depends': { '../vendor/x.js': null } },
            //'./vendor/y.js'    :  { 'exports': 'Y', 'depends': { '../vendor/x.js': '$' } },
            //'/vendor/z.js'    :  { 'exports': 'zorro', 'depends': { '../vendor/x.js': '$', '../vendor/y.js': 'YNOT' } }
        }
    }
    , styles: {
        local: [`${dirs.src}/css/**/*.{css,scss}`]
        , extension: []
        , vendor: [
            `node_modules/angular-material/angular-material.min.css`
        ]
    }
    , dist: `${dirs.dist}/**/*`
};

module.exports = globs;
