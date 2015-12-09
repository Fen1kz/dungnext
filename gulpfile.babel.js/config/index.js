/*
 * Project configuration module index.
 * ============================================================================
 */

'use strict';

let _ = require('lodash');

let config = _.assign({
    dirs: require('./dirs')
    , globs: require('./globs')
}, require('./pluginOptions'));

module.exports = config;