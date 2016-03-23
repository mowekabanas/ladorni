var gulp = require('gulp'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imageResize = require('gulp-image-resize'),
	tinypng = require('gulp-tinypng'),
	livereload = require('gulp-livereload'),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload;

/*
 * To use the gulp-image-resize, it needs of some dependencies:
 * https://www.npmjs.com/package/gulp-image-resize
 *
 * Or, install:
 *
 * Ubuntu:
 * apt-get install imagemagick
 * apt-get install graphicsmagick
 *
 * Mac:
 * brew install imagemagick
 * brew install graphicsmagick
 *
 * Windows & others:
 * http://www.imagemagick.org/script/binary-releases.php
 * */

var tinypngToken = 'tpY_SrTWgniTOP1mYIjhGosNcwY7ieG5';

var dist = {
	location: 'dist/'
};

dist.css = {
	location: dist.location + 'css/'
};

var css = {
	content: '*.css',
	location: 'css/'
};

css.menu = {
	content: css.content,
	location: css.location + 'menu/'
};

var images = {
	content: '*',
	location: 'img/'
};

images.src = {
	content: '*',
	location: images.location + 'src/'
};

images.largePhotos = {
	content: '*',
	location: images.location + 'largePhotos/'
};

images.verticalPhotos = {
	content: '*',
	location: images.location + 'verticalPhotos/'
};

gulp.task('distImages', function () {
	gulp.src(images.location + images.content)
		.pipe(gulp.dest(dist.location + images.location));
});

gulp.task('resizeLargePhotos', function () {
	gulp.src(images.largePhotos.location + images.largePhotos.content)
		.pipe(imageResize({
			height : 960,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.largePhotos.location));
});

gulp.task('resizeVerticalPhotos', function () {
	gulp.src(images.verticalPhotos.location + images.verticalPhotos.content)
		.pipe(imageResize({
			height : 1400,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.verticalPhotos.location));
});

gulp.task('dist', ['distImages', 'resizeLargePhotos']);

gulp.task('tinyImages', function () {
	gulp.src(images.location + images.content)
		.pipe(tinypng(tinypngToken))
		.pipe(gulp.dest(images.location));
});

gulp.task('tinyLargePhotos', function () {
	gulp.src(images.largePhotos.location + images.largePhotos.content)
		.pipe(tinypng(tinypngToken))
		.pipe(gulp.dest(images.largePhotos.location));
});

// tiny the new images at the 'src' folder
gulp.task('tinySource', function () {
	gulp.src(images.src.location + images.src.content)
		.pipe(tinypng(tinypngToken))
		.pipe(gulp.dest(images.src.location));
});

gulp.task('css-menu', function() {
	gulp.src(css.menu.location + css.menu.content)
		.pipe(concat('menu.css'))
		.pipe(gulp.dest(dist.css.location));
	gulp.src(dist.css.location + 'menu.css')
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(dist.css.location));
});

gulp.task('css-watch', ['css-menu'], function () {
	browserSync.reload();
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

	// Serve files from the root of this project
	browserSync.init({
		server: "./"
	});

	gulp.watch([css.menu.location + css.menu.content], ['css-watch']);
	gulp.watch("*.html").on("change", reload);
	gulp.watch("css/winery/*.css").on("change", reload);

});

gulp.task('default', ['serve']);