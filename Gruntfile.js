module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({
        assemble: {
            options: {
                data: ['src/hbs/data/*.{json,yml}'],
                assets: './dist/',
                partials: ['src/hbs/includes/**/*.{hbs,md}'],
                layoutdir: 'src/hbs/layouts',
                layout: 'default.hbs',
                helpers: ['helper-prettify', 'handlebars-helpers'],
                prettify: {
                    indent: 2,
                    condense: true,
                    padcomments: true
                }
            },
            dist: {
                expand: true,
                cwd: 'src/hbs/pages',
                src: '*.hbs',
                dest: 'dist/'
            }
        },
        // inline: {
        //     dist: {
        //         src: '_tmp/index.html',
        //         dest: '_tmp/index-inline.html'
        //     }
        // },
        // htmlmin: {
        //     dist: {
        //         options: {
        //             removeComments: true,
        //             collapseWhitespace: true
        //         },
        //         files: {
        //             'dist/index.html': '_tmp/index-inline.html'
        //         }
        //     }
        // },
        uglify: {
            options:{
                // beautify: true,
                // mangle: false
            },
            build: {
                src: [
                    'src/js/vendor/jquery.min.js',
                    'src/js/main.js'
                ],
                dest: 'dist/js/main.min.js'
            }
        },
        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "dist/css/styles.min.css": "src/less/main.less"
                }
            }
        },
        clean: {
            all: ['dist/**/*.*']
        },
        copy:{
            images: {
                expand: true,
                cwd: 'src/img',
                src: '**/*.*',
                dest: 'dist/img/'
            },
            fonts: {
                expand: true,
                cwd: 'src/fonts',
                src: '**/*.*',
                dest: 'dist/fonts/'
            }
        },
        watch: {
            all: {
                options: {
                    spawn: false
                },
                files: [
                    'src/hbs/**/*.hbs',
                    'src/less/**/*.less',
                    'src/js/**/*.js'
                ],
                tasks: [
                    'clean:all',
                    'copy:images',
                    'copy:fonts',
                    'uglify',
                    'less',
                    'assemble'
                ]
            }
        }
    });

    grunt.registerTask('default',
        [
            'clean:all',
            'copy:images',
            'copy:fonts',
            'uglify',
            'less',
            'assemble',
            'watch'
        ]
    );
};