module.exports = function(grunt) {

  grunt.initConfig({
    // The package info.
    pkg: grunt.file.readJSON('package.json'),

    // Cleaning.
    clean: ['dist/'],

    // Browserify and React.js
    browserify: {
      options: {
        transform: [[{es6: true}, 'reactify']],
        extensions: '.jsx'
      },
      app: {
        src: 'jsx/index.jsx',
        dest: 'dist/js/index.js'
      }
    },

    // Less
    less: {
      app: {
        files: {
          'dist/css/index.css': 'less/index.less'
        }
      }
    },

    // Html
    copy: {
      html: {
        expand: true,
        cwd: 'html/',
        src: '**',
        dest: 'dist/'
      },
      fonts: {
        expand: true,
        cwd: 'node_modules/bootstrap/fonts/',
        src: '**',
        dest: 'dist/fonts/'
      }
    },

    // Fonts

    // Watch
    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['jsx/**/*.jsx'],
        tasks: ['browserify']
      },
      htmls: {
        files: ['html/**', 'node_modules/bootstrap/fonts/**'],
        tasks: ['copy']
      },
      options: {
        nospawn: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', [
    'browserify',
    'less',
    'copy',
    'watch'
  ]);
}
