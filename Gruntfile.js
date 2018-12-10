'use strict';

/**
 * GruntFile confguration for ReactJS
 *
 * Deafult server: http://localhost:80
 *
 * All ReactJS code is written in JSX, that could produce some execution errors on certain browsers, so Grunt will
 * concat all JSX files and generate an app.js file inside public that the index.html could use instead,
 * also the livereload is listening to all JSX files so it will recompile the app.js file if any JSX files is modified,
 * for any CSS modification the livereload will apply the changes in your browser without reloading
 */
module.exports = function exports(grunt) {
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['includeFiles:app', 'wiredep:app', 'react'],
      },
      jsx: {
        files: ['public/*/*.jsx'],
        options: {
          livereload: '<%= connect.options.livereload %>',
        },
        tasks: ['includeFiles:app', 'wiredep:app', 'react'],
      },
      gruntfile: {
        files: ['Gruntfile.js'],
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>',
        },
        files: [
          'public/styles/*.css',
        ],
      },
    },
    connect: {
      options: {
        port: 80,
        hostname: '0.0.0.0',
        livereload: 35729,
      },
      app: {
        options: {
          open: false,
          middleware: (connect) => {
            return [
              connect.static('.tmp'),
              connect()
                .use(
                  '/bower_components',
                  connect.static('./bower_components')
                ),
              connect.static('public'),
            ];
          },
        },
      },
    },
    wiredep: {
      options: {},
      app: {
        src: ['public/index.html'],
        ignorePath: /\.\.\//,
      },
    },
    includeFiles: {
      options: {
        basePath: 'public',
        baseUrl: '',
        templates: {
          html: {
            jsx: '<script type="text/babel" src="{filePath}"></script>',
            css: '<link rel="stylesheet" href="{filePath}"/>',
          },
        },
      },
      app: {
        files: {
          'public/index.html': 'index.tpl.html',
        },
      },
    },
    react: {
      jsx: {
        files: {
          'public/app.js': 'public/**/*.jsx',
        },
      },
    },
  });

  grunt.loadNpmTasks('grunt-include-files');
  grunt.loadNpmTasks('grunt-react');
  grunt.registerTask('serve', [
    'includeFiles:app',
    'wiredep:app',
    'react',
    'connect:app',
    'watch',
  ]);
};
