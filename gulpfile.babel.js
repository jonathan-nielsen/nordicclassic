import babel from 'gulp-babel';
import concat from 'gulp-concat';
import gulp from 'gulp';
import sourcemaps from 'gulp-sourcemaps';
import cleanCSS from 'gulp-clean-css';

function js() {
	return gulp.src('src/js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('script.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist'));
};

function css() {
	return gulp.src('src/css/**/*.{scss|css}')
		.pipe(sourcemaps.init())
		.pipe(cleanCSS())
		.pipe(concat('style.css'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('dist/css'));
}

exports.default = gulp.parallel(js, css);
exports.js = js;
exports.css = css;