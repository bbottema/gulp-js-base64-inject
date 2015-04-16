var fs = require('fs');
var path = require('path');
var through = require('through2');
var xtend = require('xtend');
var htmlMinify = require('html-minifier').minify;

module.exports = function(options) {
    var opts = xtend({
        basepath: '',
        pattern: /'@@import ([a-zA-Z0-9\-_.]+)'/g,
        debug: false
    }, options);

    if(opts.debug) console.log('Injecting resources:');

    return through.obj(
        function(file, enc, callback) {
            if(file.isNull()) callback(null, file);

            var process = function(contents) {
                return contents.replace(opts.pattern, function(match, filepath) {
                    var fp = path.join(opts.basepath, filepath);
                    var filecontents = '';
                    try {
                        filecontents = fs.readFileSync(fp, {encoding: 'utf8'});
                        filecontents = htmlMinify(filecontents, {
                            removeComments: true,
                            collapseWhitespace: true
                        });
                    } catch(e) {}
                    if(opts.debug) {
                        var status = (filecontents == '' ? 'not found' : 'OK');
                        console.log('   ', filepath, status);
                    }
                    return "'" + filecontents.replace(/'/g, "\\'") + "'";
                });
            };

            if(opts.debug) console.log(' ', file.path);

            if(file.isBuffer()) {
                file.contents = new Buffer(process(String(file.contents)));
                callback(null, file);
            } else if(file.isStream()) {
                file.contents.on('data', function(data) {
                    file.contents = new Buffer(process(data));
                    callback(null, file);
                });
            } else callback(null, file);
        }
    );
};