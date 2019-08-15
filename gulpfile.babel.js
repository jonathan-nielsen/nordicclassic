import 'core-js/stable';
import 'regenerator-runtime/runtime';
import cleanCSS from 'gulp-clean-css';
import concat from 'gulp-concat';
import fs from 'fs-extra';
import gulp from 'gulp';
import path from 'path';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';

sass.compiler = require('node-sass');

async function css() {
	return gulp.src('src/css/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));
}

async function html() {
	try {
		await fs.copy('src/html/index.html', 'dist/index.html');
	} catch (err) {
		return console.error(err)
	}
}

async function copyStatics() {
	try {
		await fs.copy('src/css/bootstrap/', 'dist/css/bootstrap/');
		await fs.copy('src/css/viewport.css', 'dist/css/viewport.css');
		await fs.copy('src/font/', 'dist/font/');
		await fs.copy('src/img/', 'dist/img/');
	} catch (err) {
		return console.error(err)
	}
}

exports.html = html;
exports.css = css;
exports.watch = async function() {
	await copyStatics();

	gulp.watch('src/css/**/*', css);
	gulp.watch('src/html/**/*', html);
}
exports.default = gulp.parallel(css, html, copyStatics);