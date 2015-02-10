module.exports = function (grunt) {
    "use strict";

    var rewriteModule = require('http-rewrite-middleware');

    var path = require('path');

    var webFiles = [];
    function webFile(src, filename) {
        webFiles.push({ src: src, dest: 'bin/web/' + (filename || path.basename(src)) });
    }
    webFile('node_modules/requirejs/require.js');
    webFile('node_modules/jquery/dist/jquery.min.js', 'jquery.js');
    webFile('node_modules/esprima/esprima.js');
    webFile('external/typescriptServices.js');
    // ['index.html', 'index.css', 'testbuilder.html'].forEach(function (fn) { webFile('web/' + fn); })

    grunt.initConfig({
        ts: {
            web: {
                options: {
                    module: 'amd'
                },
                sourcemap: false,
                src: ['src/*.ts', 'web/testbuilder.ts'],
                outDir: 'bin/web'
            }
        },

        copy: {
            'web-dependencies': {
                nonull: true,
                flatten: true,
                files: webFiles
            }
        },

        clean: ['bin']
    });

    grunt.registerTask('server', 'Run the development webserver', function () {
        this.async();
        var connect = require('connect'), serveStatic = require('serve-static');
        var app = connect();
        app.use(serveStatic('bin/web'));
        app.use(serveStatic('web'));
        app.listen(8000);
        console.log('Running at http://localhost:8000')
    });

    grunt.registerTask('website', ['ts:web', 'copy:web-dependencies']);
    grunt.registerTask('webserver', ['website', 'server']);
    // grunt.registerTask('web-dependencies', ['ts:web']);

    grunt.loadNpmTasks('grunt-ts');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('default', ['website']);
}
