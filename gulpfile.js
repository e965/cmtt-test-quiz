'use strict'

let project = require('./package.json')

/* Подключение встроенных модулей к проекту */

let path = require('path')

/* Подключение Gulp к проекту */

let gulp = require('gulp')

/* Подключение сторонних плагинов Gulp к проекту */

let
	tube =			require('gulp-pipe'),
	bom =			require('gulp-bom'),
	rename =		require('gulp-rename'),
	watch =			require('gulp-watch'),
	clean =			require('gulp-clean'),
	plumber =		require('gulp-plumber'),
	cleanCSS =		require('gulp-clean-css'),
	pug =			require('gulp-pug')

/*  Подключение сторонних модулей к проекту */

let liveServer = require('browser-sync')

let stylus = {
	compile: require('gulp-stylus')
}

let uglify = {
	core:      require('terser'),
	composer:  require('gulp-uglify/composer')
}

let minifyJS = uglify.composer(uglify.core, console)

let reloadServer = () => liveServer.stream()

let getPackageDir = packageName => path.dirname(require.resolve(`${packageName}/package.json`))

let dirs = {
	dev:			'source',
	build:			'build',
	dist:			'dist',
	dist_static:	'dist_static',
	assets:			'assets'
}

let paths = {
	html: {
		dev: [`${dirs.dev}/pug/**/*.pug`, `!${dirs.dev}/pug/inc/**/*.pug`],
		prod: `${dirs.build}/`,
	},

	js: {
		dev: [`${dirs.dev}/js/**/*.js`],

		prod:          `${dirs.build}/${dirs.assets}/js/`,
		prod_vendors:  `${dirs.build}/${dirs.assets}/js/vendors/`,

		vendors: {
			kamina: `${getPackageDir('kamina-js')}/dist/kamina.min.js`,
			likely: `${getPackageDir('cmtt-likely')}/release/likely.js`,
			ceq_eq: `${getPackageDir('css-element-queries')}/src/ElementQueries.js`,
			ceq_rs: `${getPackageDir('css-element-queries')}/src/ResizeSensor.js`,
		},
	},

	css: {
		dev:   [`${dirs.dev}/styl/**/*.styl`, `!${dirs.dev}/styl/inc/**/*.styl`],
		prod:   `${dirs.build}/${dirs.assets}/css/`
	},
}

gulp.task('liveReload', () => liveServer({
	server: [dirs.build, dirs.dist_static],
	port: 8079,
	notify: false
}))

/* Сборка pug */

let pugTubes = [
	plumber(),
	pug({ locals: {
		_V:     project.version,

		PATHS: {
			js:  `./${dirs.assets}/js`,
			css: `./${dirs.assets}/css`,
			img: `./${dirs.assets}/img`,
		},
	}}),
	bom(),
	gulp.dest(paths.html.prod)
]

gulp.task('pug:build', () => tube(
	[gulp.src(paths.html.dev)]
		.concat(pugTubes)
))

gulp.task('pug:dev', () => tube(
	[watch(paths.html.dev, { ignoreInitial: false })]
		.concat(pugTubes, [reloadServer()])
))

/* Сборка JS */

let jsTubes = (dest = paths.js.prod) => [
	plumber(),
	minifyJS({}),
	rename({ suffix: '.min' }),
	bom(),
	gulp.dest(dest)
]

gulp.task('js:assets:build', () => tube(
	[gulp.src(paths.js.dev)]
		.concat(jsTubes())
))

gulp.task('js:assets:dev', () => tube(
	[watch(paths.js.dev, { ignoreInitial: false })]
		.concat(jsTubes(), [reloadServer()])
))

gulp.task('js:get-vendors', () => tube([
	gulp.src(Object.values(paths.js.vendors)),
	minifyJS({}),
	rename(path => {
		if (!path.basename.endsWith('.min')) {
			path.extname = '.min' + path.extname
		}
	}),
	bom(),
	gulp.dest(paths.js.prod_vendors)
]))


/* Сборка Stylus */

let stylusTube = [
	plumber(),
	stylus.compile({
		compress: true,
		rawDefine: {
			'$imgPath': `../img`,
			'$_V': project.version
		},
	}),
	rename({ suffix: '.min' }),
	cleanCSS(),
	bom(),
	gulp.dest(paths.css.prod)
]

gulp.task('stylus:build', () => tube(
	[gulp.src(paths.css.dev)]
		.concat(stylusTube)
))

gulp.task('stylus:dev', () => tube(
	[watch(paths.css.dev, { ignoreInitial: false })]
		.concat(stylusTube, [reloadServer()])
))

/* Копирование файлов из dirs.build и dirs.dist_static в одну общую dirs.dist */

gulp.task('dist:copy', () => tube([
	gulp.src([
		`${dirs.build}/**/*`, `${dirs.build}/**/.*`,
		`${dirs.dist_static}/**/*`, `${dirs.dist_static}/**/.*`
	]),
	gulp.dest(dirs.dist)
]))

gulp.task('dist:clean', () => tube([
	gulp.src(dirs.dist, { read: false, allowEmpty: true }),
	clean()
]))

gulp.task('dist', gulp.series('dist:clean', 'dist:copy'))

/* Команды для сборки и разработки */

gulp.task('build:clean', () => tube([
	gulp.src(dirs.build, { read: false, allowEmpty: true }),
	clean()
]))

gulp.task('build', gulp.parallel('pug:build', 'js:assets:build', 'js:get-vendors', 'stylus:build'))

gulp.task('dev', gulp.parallel('liveReload', 'pug:dev', 'js:assets:dev', 'js:get-vendors', 'stylus:dev'))

gulp.task('default', gulp.series('build:clean', 'build', 'dist'))
