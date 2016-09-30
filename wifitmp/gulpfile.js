var gulp = require('gulp');
var glp = require('gulp-load-plugins')();
var del = require('del');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

//编译less
gulp.task('styles:less',function(){
	return gulp.src('app/styles/**/*.less')
		.pipe(glp.plumber())
		.pipe(glp.less())
		.pipe(glp.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
		.pipe(gulp.dest('.tmp/styles'));
});
//压缩css
gulp.task('style:minify',['styles:less'],function(){
	return gulp.src('.tmp/styles/**/*.css')
		.pipe(glp.plumber())
		.pipe(glp.sourcemaps.init())
		.pipe(glp.minifyCss())
		.pipe(glp.sourcemaps.write())
		.pipe(gulp.dest('dist/styles'));
});
//压缩js
gulp.task('scripts',function(){
	return gulp.src(['app/js/**/*.js','!app/js/lib/**/*'])
		.pipe(glp.plumber())
		.pipe(glp.sourcemaps.init())
		.pipe(glp.uglify())
		.pipe(glp.sourcemaps.write('.'))
		.pipe(gulp.dest('dist/js'));
});
//压缩html
gulp.task('html',function(){
	return gulp.src(['app/**/*.html','app/**/*.tpl'])
	    .pipe(glp.htmlmin({collapseWhitespace: true}))
	    .pipe(gulp.dest('dist'));
});
//压缩image
gulp.task('images',function(){
	return gulp.src('app/img/**/*')
		.pipe(glp.cache(glp.imagemin({
	      progressive: true,
	      interlaced: true,
	      // don't remove IDs from SVGs, they are often used
	      // as hooks for embedding and styling
	      svgoPlugins: [{cleanupIDs: false}]
	    })))
	    .pipe(gulp.dest('dist/img'));
});

gulp.task('extras',function(){
	return gulp.src('app/data/**/*').pipe(gulp.dest('dist/data'));
});
//开发静态服务
gulp.task('server',['styles:less'],function(){
	browserSync({
		notify:false,
		port:9090,
		server:{
			baseDir:['.tmp','app'],
			routes:{

			}
		}
	});

	gulp.watch(['app/**/*','.tmp/**/*']).on('change',reload);
	gulp.watch('app/styles/**/*.less',['styles:less']);
	gulp.watch('app/js/**/*.js',['scripts']);
	gulp.watch('app/img/**/*',['images']);
});
//发布
gulp.task('dist',['style:minify','scripts','html','images','extras'],function(cb){
	gulp.src('app/js/lib/**/*.+(js|css)').pipe(gulp.dest('dist/js/lib'));
	cb(null);
});

gulp.task('server:dist',['dist'],function(){
	browserSync({
		notify:false,
		port:9090,
		server:{
			baseDir:['dist'],
			routes:{

			}
		}
	});
});
gulp.task('clean',del.bind(null,['.tmp','dist']));
