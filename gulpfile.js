const { src, dest, parallel } = require('gulp');

const htmlmin = require('gulp-htmlmin'); // 載入 gulp-htmlmin 套件
const cleanCSS = require('gulp-clean-css'); // 載入 gulp-clean-css 套件
const uglify = require('gulp-uglify'); // 載入 gulp-uglify 套件
const tinypng = require('gulp-tinypng-compress');
const babel = require('gulp-babel'); // 載入 gulp-babel 套件

/* --- 壓縮 HTML --- */
function minifyHtml(){
    return src('/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('/*.html'))
}


/* --- 壓縮 CSS --- */
function minifyCss () {
    return src('css/*.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(dest('css/*.css'))
}

/* --- 壓縮 JavaScript --- */
function minifyJs () {
    return src('js/*.js')
        .pipe(
            babel({
                presets: ['@babel/env'], // 使用 Babel 編譯
            })
        )
        .pipe(uglify())
        .pipe(dest('js/*.js'))
}

function minifyImg () {
    return src('image/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: '9MBtxlpzd5XhkRKrW345KWDLYQMD2dhs',
            sigFile: 'images/.tinypng-sigs',
            log: true
        }))
        .pipe(dest('image/*.{png,jpg,jpeg}'))
}


/* --- 同步執行全部任務 --- */
exports.default = parallel(minifyHtml, minifyCss, minifyJs, minifyImg)
