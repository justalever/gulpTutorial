var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var connect = require('gulp-connect');

var jsInput = {
  js: 'assets/js/dev/**/*.js'
};
var jsOutput = 'assets/js/dist/';

gulp.task('server', function() {
	connect.server({
		livereload: true
	});
});

gulp.task('sass', function() {
	return gulp.src('assets/sass/**/*.scss')
	.pipe(sourcemaps.init())
	.pipe(autoprefixer({
		browsers: ['last 2 version'],
		cascade: false
	}))
	.pipe(sass({
		outputStyle: 'compressed'
	})
	.on('error', sass.logError ))
	.pipe(sourcemaps.write('./maps'))
	.pipe(gulp.dest('./'))
	.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('./*html')
	.pipe(connect.reload());
});

gulp.task('livereload', function() {
  gulp.src(['./style.css', 'assets/js/dist/*.js'])
  .pipe(connect.reload());
});

gulp.task('js', function() {
	return gulp.src(jsInput.js)
	.pipe(concat('app.mins.js'))
	.pipe(uglify())
	.pipe(gulp.dest('./assets/js/dist'))
	.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch('assets/sass/**/*.scss', ['sass']);
	gulp.watch('assets/js/**/*.js', ['js']);
	gulp.watch('./*.html', ['html']);
});

gulp.task('default', ['sass', 'server', 'watch', 'livereload', 'js']);