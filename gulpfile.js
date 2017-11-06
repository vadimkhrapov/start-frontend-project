var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create();

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./src"
    });

    gulp.watch("src/sass/*.sass", ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
    gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

gulp.task('sass', function(){ 
    return gulp.src('src/sass/*.sass') 
        .pipe(sass()) 
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('build', function () {
    gulp.src('src/css/*.css').pipe(gulp.dest('dist/css'));
    gulp.src('src/js/*.js').pipe(gulp.dest('dist/js'));
    gulp.src('src/*.html').pipe(gulp.dest('dist'));
    gulp.src('src/fonts/*').pipe(gulp.dest('dist/fonts'));
    gulp.src('src/img/*').pipe(gulp.dest('dist/img'));
});

