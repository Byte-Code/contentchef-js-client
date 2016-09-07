module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['dist/bundle.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    webpack: {
      build: {
        entry: "./src/api",
        output: {
          path: "./dist",
          filename: "bundle.js"
        },
        module: {
          loaders: [
          { 
            test: "./src/api.js", 
            loader: 'expose?ContentChef' 
          }
          ]
        }
      }
    },
    mochaTest: {
      test : {
        src: ['test/**/*.spec.js']
      }
    }
  });

  grunt.registerTask('test', ['mochaTest']);

  grunt.registerTask('default', ['webpack', 'concat', 'uglify']);

};
