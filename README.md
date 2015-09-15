# gulp-js-html-inject

This is a small Gulp plugin for injecting referenced HTML files right into JS code as strings.

## What is it

The simplest example. JS code:

```js
var template = '@@import template.txt';
var fragment = '@@import src/fragments/fragment.html';
var jsonConfig = '@@import config.json';
```

...and Gulp task:

```js
var gulp = require('gulp');
var inject = require('gulp-js-text-inject');

gulp.task('js', function() {
    return gulp.src('path/to/your/js/*.js')
        .pipe(inject({
            basepath: 'path/to/your/templates/'
        }))
        .pipe(gulp.dest('path/for/output'));
});
```

If we use this plugin, the resulting JS will be:

```js
var template = 'Hello World!\n\nHow are you!';
var fragment = '<div>\n   <p>Hello World!</p>\n   <p>How are you!</p>\n</div>';
var template = '{\n   "config": true,\n   "moreConfig": false\n}';
```

## Changing the import pattern

```js
var myLog = Loader.load('myLog.log');
```

Config to match `Loader.load`:

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
});
```

## Options

Option | Type | Default | Details
------ | ---- | ------- | -------
basepath | string | `""` | Base path to look up referenced templates from
pattern | RegExp | `/'@@import ([a-zA-Z0-9\-_.\\/]+)'/g` | Pattern to match template references. Should have one capture group that will match template path
debug | boolean | `false` | Displays some information while working - processed files, found references, injection result