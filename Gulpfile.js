var gulp = require('gulp');

var jshint = require('gulp-jshint');
var mocha = require('gulp-mocha');
var nodemon = require('gulp-nodemon');
var stylish = require('jshint-stylish');

var serverFiles = ['lib/**/*.js', 'routes/**/*.js', 'models/**/*.js', 'test/server/**/*.js', './*.js'];
var clientFiles = ['app/**/*.js'];

gulp.task('nodemon', function(){
	nodemon({
		script: 'server.js',
		ext: 'js'
	});
});

gulp.task('lint:srv', function(){
	var options = {
		node: true,
		mocha: true,
		indent: 2,
	 	globals: {
			describe: true,
			it: true,
			before: true,
			after: true,
			beforeEach: true,
			afterEach: true	
		}	
	};
	return gulp.src(serverFiles).pipe(jshint(options)).pipe(jshint.reporter(stylish));
});

gulp.task('lint:app', function(){
	var options = {
		node: true,
		jasmine: true,
		indent: 2,
		ignores: ['*bundle.js'],
		globals: {
			angular: true
		}
	};
	return gulp.src(clientFiles).pipe(jshint(options)).pipe(jshint.reporter(stylish));
});

gulp.task('test:srv', function(){
	var options = {
		read: false,
		ignoreLeaks: false,
		timeout: 3000,
		reporter: 'nyan',
		ul: 'bdd',
		globals: ['should']	
	};
	return gulp.src('test/**/*.js', options).pipe(mocha(options));
});

gulp.task('watch', function(){
	gulp.watch(serverFiles, ['lint']);
});

gulp.task('lint', ['lint:srv', 'lint:app']);
gulp.task('test', ['test:srv']);
gulp.task('default', ['lint', 'test']);
