import { src, dest, watch, parallel } from 'gulp'
import gulpSass from 'gulp-sass'
import * as dartSass from 'sass'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'
import sourcemaps from 'gulp-sourcemaps'
import plumber from 'gulp-plumber'
import terser from 'gulp-terser'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import imagemin, { mozjpeg } from 'gulp-imagemin'
import webp from 'gulp-webp'

const paths = {
  styles: {
    src: 'source/styles/style.scss',
    dest: 'build/styles',
    watch: 'source/styles/**/*.scss'
  },
  scripts: {
    src: 'source/scripts/*.js',
    dest: 'build/scripts',
    watch: 'source/scripts/**/*.js'
  },
  images: {
    src: 'source/images/**/*.{jpg,jpeg,png,svg}',
    dest: 'build/images'
  }
};

export function styles() {
  const scss = gulpSass(dartSass);
  return src(paths.styles.src)
    .pipe((sourcemaps.init()))
    .pipe(scss())
    .pipe(plumber())
    .pipe(postcss([autoprefixer(), cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.styles.dest))
}

export function scripts() {
  return src(paths.scripts.src)
    .pipe((sourcemaps.init()))
    .pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(terser({ format: { comments: false } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest(paths.scripts.dest))
}

export function images() {
  return src(paths.images.src, { encoding: false })
    .pipe(imagemin([mozjpeg({ quality: 75, progressive: true })]))
    .pipe(webp({ quality: 75 }))
    .pipe(dest(paths.images.dest))
}

export function watchFiles() {
  watch(paths.styles.watch, styles)
  watch(paths.scripts.watch, scripts)
}

export default parallel(styles, scripts, watchFiles)