module.exports = function(grunt) {

  grunt.initConfig({
    // The package info.
    pkg: grunt.file.readJSON('package.json'),

    // Cleaning.
    clean: ['dist/'],

    // Browserify and React.js
    browserify: {
      options: {
        transform: ['reactify']
      },
      app: {
        src: 'js/index.js',
        dest: 'dist/index.js'
      }
    },

    // Less
    less: {
      app: {
        files: {
          'dist/index.css': 'less/index.less'
        }
      }
    },

    // Html
    copy: {
      main: {
        expand: true,
        cwd: 'html/',
        src: '**',
        dest: 'dist/'
      }
    },

    // Watch
    watch: {
      styles: {
        files: ['less/**/*.less'],
        tasks: ['less']
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['browserify']
      },
      htmls: {
        files: ['html/*'],
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
