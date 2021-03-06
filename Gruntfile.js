module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat_sourcemap: {
      options: {
        // Task-specific options go here.
      },
      your_target: {
        // Target-specific file lists and/or options go here.
        files: {
          'client/dist/app.js': ['client/app/components/**/*.js', 'client/app/shared/**/*.js']
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/server/*.js']
      }
    },

    concurrent: {
      dev: {
        tasks: ['nodemon:dev', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    uglify: {
      options: {
        preserveComments: false,
        beautify: true // for debugging purposes
      },
      dev: {
        files: {
          'client/dist/app.min.js': ['client/dist/app.js']
        }
      }
    },

    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['client/app/components/**/*.js', 'client/app/shared/**/*.js'],
        dest: 'client/dist/app.js',
      },
    },

    watch: {
      scripts: {
        files: ['client/app/components/**/*.js', 'client/app/shared/**/*.js'],
        tasks: ['build'],
        options: {
          spawn: false,
        },
      }
    }

  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-concat-sourcemap');

  //gets run on server deployment
  grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('default', ['build', 'concurrent:dev']);

};
