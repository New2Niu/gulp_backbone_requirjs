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
	return gulp.src('.tmp/styles/main.css')
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

gulp.task('inject',function(){
	return gulp.src('app/index.html')
		.pipe(glp.inject(gulp.src('app/js/**/template/*.tpl'),{
			starttag: '<!-- inject:body:html -->',
			transform: function (filePath, file) {
		      // return file contents as string 
		       var id = filePath.split(/\/|\./);
                        id.pop();//删除返回数组最后一个元素
                        id.shift();//删除返回数组第一个元素
                        id = id.pop();//id.join('_');
		      return '<script type="text/template7" id="template_' + id + '">\n' +
                            file.contents.toString('utf8') +
                     '\n</script>';
   			}
		}))
		.pipe(gulp.dest('.tmp'));
});	


//压缩html
gulp.task('html',['inject'],function(){
	return gulp.src('.tmp/index.html')
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
//静态服务
gulp.task('server',['styles:less','inject'],function(){
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

//requirejs压缩
gulp.task('requirejs',function(){
	return gulp.src('app/js/main.js')
		.pipe(glp.requirejsOptimize({
		    paths:{
				jquery: "lib/jquery/dist/jquery.min",
				underscore:"lib/underscore/underscore-min",
				backbone: "lib/backbone/backbone-min",
				localStorage:"lib/backbone.localStorage/backbone.localStorage-min",
				bootstrap:"lib/bootstrap/dist/js/bootstrap.min",
				Template7:'lib/Template7/dist/template7.min',
				text:"lib/text",
				app:"./app"
			},
			shim: {
		        
		    }
		}))
		.pipe(glp.rename({suffix: ''}))
		.pipe(glp.jshint({jshintrc:'.jshintrc'}))
		.pipe(gulp.dest('dist/js'));
});

//发布
gulp.task('dist',['style:minify','requirejs','html','images','extras'],function(cb){
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
//清除
gulp.task('clean',del.bind(null,['.tmp','dist']));
