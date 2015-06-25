module.exports = function (grunt) {
    // Load all Grunt tasks
    require('jit-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            global: {
                files: {
                    'js/global.min.js': ['js/libs/*.js']
                }
            }
        },

        autoprefixer: {
            global: {
                files: [
                    {
                        expand: true,
                        cwd: 'css/unprefixed',
                        src: ['**/*.css'],
                        dest: 'css/',
    }]
            }
        },
        sass: {
            options: {
                style: 'compressed',
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'scss',
                        src: ['**/*.scss'],
                        dest: 'css/unprefixed',
                        ext: '.css'
    }]
            }
        },

        svgstore: {
            options: {
                prefix: 'shape-', // This will prefix each <g> ID
                svg: {
                    viewBox: '0 0 100 100',
                    xmlns: 'http://www.w3.org/2000/svg',
                    style:"display: none;",
                },
            },
                default: {
                    files: {
                        '_includes/svg-defs.svg': ['svg/defs/*.svg'],
                    }
                }
            
        },

        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },

        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            site:{
                files:["index.html", "_layouts/*.html", "_includes/*.html"],
                tasks:["shell:jekyllBuild"]
            },
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass', 'autoprefixer',"shell:jekyllBuild"],
            },
            svg: {
                files: ['svg/defs/*.svg'],
                tasks: ['svgstore',"shell:jekyllBuild"],
            },
        },


    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-svgstore');
    grunt.loadNpmTasks('grunt-jekyll');

    // Default task(s).
    grunt.registerTask('default', ['watch']);

};

//// Matches a single file
//files: 'foo.js'
//
//// Matches an array of files
//files: [ 'foo.js', 'bar.js' ]
//
//// Matches all files in the dir
//files: '*'
//
//// Matches all files with a given extension in the dir
//files: '*.js'
//
//// Matches all files with a given extension in all dirs
//files: '**/*.js'
//
//// Matches all files w/extension in this dir and one dir deeper
//files: '{,*/}*.js'
//
//// These rules can be combined with fragments of paths
//files: 'src/js/{,*/}*.js'