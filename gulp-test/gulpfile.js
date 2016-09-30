var gulp = require('gulp');
var less = require('gulp-less');
//var pkg = require('./package.json');
//console.log(pkg.name);

gulp.task('testLess',function(){
	gulp.src('src/less/index.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'));
});

gulp.task('watchw',function(){
	gulp.watch('src/less/index.less',['testLess']);
});

gulp.task('default',['watchw','testLess']);
