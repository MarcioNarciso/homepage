const {series, src, dest, watch} = require('gulp');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');

function minifyCss() {
    return src('assets/styles/*.css') // Lê todos os arquivos CSS
        .pipe(concat('style.css')) // Concatena todos os arquivos CSS em um único arquivo
        .pipe(cleanCSS()) // Minifica o único arquivo CSS
        .pipe(dest('assets/dist/css/')); // Armazena o único arquivo CSS minificado no diretório correto
}

function watchCssFiles() {
    /**
     * A função "minifyCss" será executada sempre que ocorrer alguma alteração
     * nos arquivos de CSS.
     */
    watch('assets/styles/*.css', minifyCss);
}

/**
 * As tasks serão executadas na sequências que forem passadas pra função "series".
 */
exports.default = series(watchCssFiles);