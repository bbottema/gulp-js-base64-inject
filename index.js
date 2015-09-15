var fs = require('fs');
var path = require('path');
var through = require('through2');
var xtend = require('xtend');
var mime = require('mime');

module.exports = function(options) {
    var opts = xtend({
        basepath: '',
        pattern: /'@@import ([a-zA-Z0-9\-_.\\/]+)'/g,
        debug: false
    }, options);

    opts.debug && console.log('Injecting resources:');

    return through.obj(
        function(file, enc, callback) {
            if (file.isNull()) callback(null, file);

            var process = function(contents) {
                return contents.replace(opts.pattern, function(match, filepath) {
                    var fp = path.join(opts.basepath, filepath);

                    try {
                        var filecontents = mime.lookup(filepath) + ';base64,' + fs.readFileSync(filepath).toString('base64');
                        opts.debug && console.log('   ', filepath, 'OK');
                        return "'" + filecontents + "'";
                    }
                    catch (e) {
                        console.error('unable to read utf8 file', fp);
                        return "''";
                    }
                });
            };

            opts.debug && console.log(' ', file.path);

            if (file.isBuffer()) {
                file.contents = new Buffer(process(String(file.contents)));
                callback(null, file);
            } else if (file.isStream()) {
                file.contents.on('data', function(data) {
                    file.contents = new Buffer(process(data));
                    callback(null, file);
                });
            } else { 
                callback(null, file);
            }
        }
    );
};