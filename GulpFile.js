var gulp = require('gulp'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imageResize = require('gulp-image-resize'),
	tinypng = require('gulp-tinypng');

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

var images = {
	content: '*',
	location: 'img/'
};

images.largePhotos = {
	content: '*',
	location: images.location + 'largePhotos/'
};

gulp.task('resize', function () {
	console.log(dist.location + images.largePhotos.location);
	gulp.src(images.largePhotos.location + images.largePhotos.content)
		.pipe(imageResize({
			height : 1080,
			upscale : false
		}))
		.pipe(gulp.dest(dist.location + images.largePhotos.location));
});


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

gulp.task('tiny', ['tinyImages', 'tinyLargePhotos']);

gulp.task('default', ['resize']);