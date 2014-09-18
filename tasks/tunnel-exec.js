/*
 * grunt-tunnel-exec
 * https://github.com/matias.gea/grunt-tunnel-exec
 *
 * Copyright (c) 2014 Matias Gea
 * Licensed under the MIT license.
 */

'use strict';

var tunex = require('tunnel-exec');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('tunnelExec', 'Grunt wrapper for Tunnel-Exec', function() {

    var done = grunt.task.current.async();

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
        user: null,
        identityFile: null,
        localPort: null,

        // Host which is being SSH'd
        remoteHost: null,
        remotePort: 22,

        // Target host, will receive the commands executed through the tunnel
        targetHost: null,
        targetPort: null,

        // Connection timeout
        timeout: 15000,
    });

    var tunnelParams = options;
    var self = this;

    tunex(options, function(err,tunnel){
        if(err){
            console.log("\n",err);
            done(true);
            return;
        }
        var tunnelParams = tunnel;
        if(typeof self.data.exec == 'function'){
            tunnelParams.done = (function(tunnel){
                return function(){
                    tunnel.close();
                    done(true);
                }
            })(tunnel);
            self.data.exec.apply(self, [err, tunnelParams]);
        } else {
            if(tunnel && tunnel.close){
                tunnel.close();
            }
            done(true);
        }
    });

    grunt.log.write('Running task through SSH tunnel at port:' + tunnelParams.localPort);

  });

};
