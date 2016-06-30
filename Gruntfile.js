/**
 * Grunt tasks.
 *
 * @author Alejandro Mostajo <http://about.me/amostajo>
 * @copyright 10Quality <http://www.10quality.com>
 * @license MIT
 * @version 1.0.0
 */
module.exports = function(grunt)
{
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: {
                    'dist/vue.social-shares.min.js': [
                        'src/vue.social-shares.js'
                    ],
                }
            },
        },
        copy: {
            dist: {
                files: [
                    {
                        src: 'src/vue.social-shares.js',
                        dest: 'dist/vue.social-shares.js'
                    },
                ],
            },
        },
    });

    // Load
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.registerTask('default', [
        'copy',
        'uglify',
    ]);
};
