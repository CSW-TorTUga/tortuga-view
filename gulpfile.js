var gulp = require('gulp');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var minifyCss = require('gulp-cssmin');
var gutil = require('gulp-util');
var replace = require('gulp-replace');
var gulpif = require('gulp-if');

var isDevelopment = gutil.env.dev === true;

var paths = {
    libraries: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-cookies/angular-cookies.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/base-64/base64.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/ui-router/release/angular-ui-router.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-resource/angular-resource.js',
        'lib/ngsweets.js'
    ],
    scripts: [
        'app.js',

        'src/management/management.js',
        'src/management/users/users.js',
        'src/management/roles/roles.js',
        'src/home/home.js',
        'src/management/booking/booking.js',
        'src/login/login.js',
        'src/profile/profile.js',

        'src/**/*.js'
    ],
    styles: [
        'node_modules/angular-material/angular-material.min.css',
        'lib/animate.css',
        'style.dev.css'
    ]
};

gulp.task('scripts', function() {
    var scripts = gulp.src(paths.libraries.concat(paths.scripts))
        .pipe(gulpif(!isDevelopment,
            gulpif(function(file) {
                return file.path.indexOf('js/lib/') == -1;
            }, uglify())
        ))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/'));

    return gulp.src('./index.dev.html')
        .pipe(inject(scripts))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('styles', function() {
    return gulp.src(paths.styles)
        .pipe(concat('style.css'))
        .pipe(gulpif(!isDevelopment, minifyCss()))
        .pipe(gulp.dest('dist/'));
});

gulp.task('set-host', ['scripts', 'styles'], function() {
    var host = process.env.BASE_HOST;

    if(host == undefined) {
        host = 'http://localhost:7081/';
    } else {
        console.log("Using " + host + " as the host");
    }

    return gulp.src('./index.html')
        .pipe(replace('$$HOST', host))
        .pipe(gulp.dest('./'));
});

gulp.task('build', ['scripts', 'styles' /*, 'set-host'*/]);

gulp.task('watch', function(){
    gulp.watch('src/**/*.js',['scripts' /*, 'set-host'*/]);
    gulp.watch('index.dev.html', ['scripts' /*, 'set-host'*/]);
    gulp.watch(['src/**/*.css', 'style.dev.css'], ['styles']);
});

gulp.task('default', ['build', 'watch']);