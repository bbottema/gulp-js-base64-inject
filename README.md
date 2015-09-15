# gulp-js-base64-inject

This is a small Gulp plugin for injecting image files right directly into your .js code as base64 strings.

## What is it

The simplest example. JS code:

```js
var coverImg = '@@import cover.jpg';
var logoImg = '@@import logo.png';
```

...and Gulp task:

```js
var gulp = require('gulp');
var inject = require('gulp-js-text-inject');

gulp.task('js', function() {
    return gulp.src('path/to/your/js/*.js')
        .pipe(inject({
            basepath: 'path/to/your/data/'
        }))
        .pipe(gulp.dest('path/for/output'));
});
```

If we use this plugin, the resulting JS will be:

```js
var coverImg = '/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAQABADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0ZtWn8ReLbrSI76e1t7feirAxRiycFiQQfvdsgYHrzUVjqeqaB4it9Ov5Z5beeQR4mYyA7iFVkc8nkqCCe/Y1FcaLeeGfGF5rtpp817FcrIyeSC5DvyQwHOM5OQDxiqeheH9Z1rxPFrOrwzRiOQSM8ylCdpyqKp5AyAegGM9647S5763v8rHBzSvaz5r/AIH/2Q==';
var logoImg = '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';
```

## Changing the import pattern

```js
var iconImg = Loader.load('myIcon.jpg');
```

Config to match `Loader.load`:

```js
var gulp = require('gulp');
var inject = require('gulp-js-base64-inject');

gulp.task('js', function() {
    return gulp.src('path/to/your/js/*.js')
        .pipe(inject({
            basepath: 'path/to/your/js/',
            pattern: /Loader.load\(['"]([a-zA-Z0-9\-_.\\/]+)['"]\)/g
        }))
        .pipe(gulp.dest('path/for/output'));
});
```

## Options

Option | Type | Default | Details
------ | ---- | ------- | -------
basepath | string | `""` | Base path to look up referenced templates from
pattern | RegExp | `/'@@import ([a-zA-Z0-9\-_.\\/]+)'/g` | Pattern to match image references. Should have one capture group that will match template path
debug | boolean | `false` | Displays some information while working - processed files, found references, injection result
