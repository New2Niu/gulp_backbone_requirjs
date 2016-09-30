var gulp = require('gulp');
var glp = require('gulp-load-plugins')();
var del = require('del');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

//静态服务
gulp.task('server',['dist'],function(){
	browserSync({
		notify:false,
		port:9090,
		server:{
			baseDir:['dist']
		}
	});
});
//编译less->css并压缩
gulp.task('less',function(){
	return gulp.src('less/**/*.less')
		.pipe(glp.less())
		.pipe(gulp.dest('./css'))
		.pipe(glp.minifyCss())
		.pipe(gulp.dest('./.tmp/css'));
});
//压缩js
gulp.task('uglify',function(){

});
//压缩图片
gulp.task('images',function(){
	return gulp.src('./img/**/*.*')
		.pipe(glp.cache(glp.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    	.pipe(gulp.dest('./.tmp/img'))
});

//压缩html
gulp.task('html',function(){
	return gulp.src(['./js/**/*.tpl','!./js/lib/**/*.*'])
		.pipe(glp.htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./.tmp/js'))
})

//
gulp.task('dist',['less','uglify','images','html','requirejs'],function(cb){
	gulp.src(['index.html']).pipe(gulp.dest('dist'));
	gulp.src('data/**').pipe(gulp.dest('dist/data'));
	gulp.src(['.tmp/**','!.tmp/js/app/**','!.tmp/js/app']).pipe(gulp.dest('dist'));
	gulp.src(['js/lib/requirejs/require.js']).pipe(gulp.dest('dist/js/lib/requirejs/'));
	gulp.src('js/lib/bootstrap/dist/**').pipe(gulp.dest('dist/js/lib/bootstrap/dist'));
	cb(null);
});

//
gulp.task('clean',del.bind(null,['.tmp','dist']));

//
gulp.task('requirejs',function(){
	return gulp.src('js/main.js')
		.pipe(glp.requirejsOptimize({
		    paths:{
				jquery: "lib/jquery/dist/jquery.min",
				underscore:"lib/underscore/underscore-min",
				backbone: "lib/backbone/backbone-min",
				localStorage:"lib/backbone.localStorage/backbone.localStorage-min",
				bootstrap:"lib/bootstrap/dist/js/bootstrap.min",
				text:"lib/text",
				app:"./app"
			},
			shim: {
		        
		    }
		}))
		.pipe(glp.rename({suffix: ''}))
		.pipe(glp.jshint({jshintrc:'.jshintrc'}))
		.pipe(gulp.dest('.tmp/js'));
});
