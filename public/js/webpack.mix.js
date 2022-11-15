let mix = require('laravel-mix');
require('laravel-mix-polyfill')
require('laravel-mix-eslint')

const ESLintPlugin = require('eslint-webpack-plugin');

mix.autoload({
    jquery: ['$', 'window.jQuery', 'jQuery']
});


mix.js('src/battle.js', 'prod/js/battle.js')
    .extract(['react'])
    .eslint({
        fix: true,
        extensions: ['js']
    })
    .sourceMaps();

mix.sass('src/sass/index.scss', 'prod/css/index.css')

mix.disableNotifications();
