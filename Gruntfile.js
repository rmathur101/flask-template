module.exports = function (grunt) {
  var _ = require ('lodash');
  var _str = require ('underscore.string');
  var bowerOverride = function (name) {
    return grunt.file.readJSON ('./bower.json').overrides[name];
  };

  // Project configuration
  grunt.initConfig ({
    conf: {
      src: 'app/src',
      public: 'app/public',
      dist: 'app/public/dist',
      lib: 'app/public/lib',
      app: 'app/src/app.js',
      index: 'app/index.html',
      bower: 'app/public/lib',
      js: '<%= conf.src %>/**/*.js',
      css: '<%= conf.src %>/**/*.css',
      less: '<%= conf.src %>/**/*.less',
      jade: '<%= conf.src %>/**/*.jade',
      html: '<%= conf.src %>/**/*.html',
      python: 'app/**/*.py'
    },
    pkg: grunt.file.readJSON ('package.json'),
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          '<%= conf.dist %>/built.min.js': ['<%= conf.dist %>/built.js']
        }
      }
    },
    concat: {
      options: {
        separator: '\n',
      },
      dist: {
        src: ['<%= conf.app %>', 
              '<%= conf.js %>'],
        dest: '<%= conf.dist %>/built.js'
      }
    },
    watch: {
       other: {
        files: [
                '<%= conf.css %>', 
                '<%= conf.jade %>', 
                '<%= conf.less %>', 
                '<%= conf.index %>',
                '<%= conf.html %>', 
                'bower.json'],
        tasks: ['concat', 'uglify', 'concat_css', 'jade', 'wiredep'],
        options: {
          spawn: false
        }
      },
      nose: {
        files: ['<%= conf.python %>'],
        tasks: ['shell:nosetest'],
        options: {
          spawn: false
        }
      },
      py_tests: {
        files: 'tests/nose/**/*.py',
        tasks: ['shell:nosetest']
      }
    },
    shell: {
      nosetest: {
        command: 'nosetests --rednose --force-color -v tests/nose'
      },
      virtualenv: {
        command: '. venv/bin/activate',
      },
    },
    concat_css: {
      options: {
      },
      all: {
        src: ['<%= conf.css %>'],
        dest: '<%= conf.dist %>/styles.css'
      },
    },
    jade: {
      html: {
        files: [{
          expand: true,
          cwd: '<%= conf.src %>/views',
          src: ['*.jade', '*.html'],
          dest: '<%= conf.dist %>/views',
          ext: '.html'
        }]
      }
    },
    wiredep: {
      target: {
        src: ['<%= conf.index %>']
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-wiredep');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bower-concat');

  // Default tasks.

  grunt.registerTask('dev', ['watch']);

  grunt.registerTask('default', ['concat', 'uglify', 
      'concat_css', 'jade', 'wiredep']);
};


  
