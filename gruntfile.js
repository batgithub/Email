module.exports = function(grunt){

	//lancement de toutes les tâches sans avoir à les lister
    require('load-grunt-tasks')(grunt);

	//création des tâches
	grunt.initConfig({	//initialisation de l'ensemble des tâches


        sass: {                              // Task
            dev: {                            // Target
                    files: {                         // Dictionary of files
                        'dev/style.css': 'dev/sass/style.scss'
                },
                    options: {
                    update: true,
                    sourcemap: 'none',
                }
            }
        },

        autoprefixer: {
            dist :{
                files: {
                    // Target-specific file lists and/or options go here.
                    'dist/style-prefixer.css':'dev/style.css',
                }
            }
        },


       jade: {
          compile: {
            options: {
                client: false,
                pretty: true,
                data: grunt.file.readJSON("dev/data.json")
            },
            files: {
              'dev/index.html': 'dev/jade/index.jade'
            }
          }
        },

        inlinecss: {
            main: {
                options: {
                    applyWidthAttributes: true,
                    applyHeightAttributes: true,
                    applyAttributesTableElements: true,
                    webResources:{
                        images: false
                    }

                },
                files: {
                    'dist/index-inline.html': 'dev/index.html'
                }
            }
        },

    	watch: {
            options: {livereload: true	},
            sass : {
                files: ['dev/sass/**/*.scss'],
                tasks: ['jade','sass:dev'],
                options: { spawn: false }
            },

            grunt: {
                files: ['Gruntfile.js']
            },

            jade: {
                options: {livereload: true	},
                files: 'dev/**/*.jade',
                tasks: ['jade']
            }
        }

    });


    //lanceur de tâche

        //Dev - convertisseur jade->HTML et livereload
        grunt.registerTask(
            'default',
            ['watch']
        );

        //Inliner
        grunt.registerTask(
            'in',
            ['jade','sass:dev','inlinecss']
        );

        //Dist - convertisseur Jade->HTML, sass->CSS et CSS autoprefixer
        grunt.registerTask(
            'd',
            ['jade','sass:dev','autoprefixer:dist']
        );


}
