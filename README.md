# gulp-js-html-inject

This is a small Gulp plugin for injecting referenced HTML files right into JS code as strings.

## What is it

The simplest example. JS code:

```js
var template = '@@import template.html';
```

...corresponding HTML template:

```html
<div>Hello, world!</div>
```

...and Gulp task:

```js
var gulp = require('gulp');
var inject = require('gulp-js-html-inject');

gulp.task('js', function() {
    return gulp.src('path/to/your/js/*.js')
        .pipe(inject({
            basepath: 'path/to/your/js/'
        }))
        .pipe(gulp.dest('path/for/output'));
});
```

If we use this plugin, the resulting JS will be:

```js
var template = '<div>Hello, world!</div>';
```

## Goal

The main goal is to embed used templates into JS code - something similar like you can embed images into CSS
stylesheets. This reduce the number of HTTP requests and traffic needed to boot up your application - embedded templates
are ready to work when script loaded and can be gzipped with it.

## More real example

Simple example is not so useful - you need to build your application every time you change something and want to test
it, because it cannot load template without injector. But you can modify placeholder to make something like this:

```js
var template = Loader.load('template.html');
```

Next, we need to tweak Gulp task a bit:

```js
var gulp = require('gulp');
var inject = require('gulp-js-html-inject');

gulp.task('js', function() {
    return gulp.src('path/to/your/js/*.js')
        .pipe(inject({
            basepath: 'path/to/your/js/',
            pattern: /Loader.load\(['"]([a-zA-Z0-9\-_.]+)['"]\)/g
        }))
        .pipe(gulp.dest('path/for/output'));
```

Final JS output after Gulp task will be the same as in first example. This allow to load templates dynamically with any
comfortable method and embed them statically by replacing that method call with a string.

## Note

Template paths are not relative to JS file - they are relative to some selected `basepath`. Optimal decision is to build
them from web root so your JS loader can request them dynamically. Then you just need to set injector `basepath` to that
dir to embed all referenced templates.

## Options

Option | Type | Default | Details
------ | ---- | ------- | -------
basepath | string | `""` | Base path to look up referenced templates from
pattern | RegExp | `/'@@import ([a-zA-Z0-9\-_.]+)'/g` | Pattern to match template references. Should have one capture group that will match template path
debug | boolean | `false` | Displays some information while working - processed files, found references, injection result