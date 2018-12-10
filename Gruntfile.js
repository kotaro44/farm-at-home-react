'use strict';

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
