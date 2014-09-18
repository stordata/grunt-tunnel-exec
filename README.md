# grunt-tunnel-exec

> Grunt wrapper around tunnel-exec node module.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-tunnel-exec --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-tunnel-exec');
```

## The "tunnelExec" task

### Overview
In your project's Gruntfile, add a section named `tunnelExec` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  tunnelExec: {
    options: {
      // Task-specific options go here.
    }
  },
});
```

### Options

#### *options.remoteHost* (required)
Type: `String`

A string value that represents the hostname or ip of the host that will be accessed through SSH.

#### *options.targetPort* (required)
Type: `Integer`

A numeric value that represents the port forwarded through the tunnel.

#### options.user (optional)
Type: `String`
Default value: null

A string value that represents the username which will connect to the remote server. If no username given, ssh command will use the default (usually, read ~/.ssh/config file, or use current username).

#### options.identityFile (optional)
Type: `String`
Default value: null

A string value that represents the path to the identity file used to authenticate with the server (usually, `~/.ssh/id_rsa.pub`).

#### options.localPort (optional)
Type: `Integer`
Default value: (random)

A numeric value that represents the port number that will be used to create the local endpoint of the tunnel.

#### options.remotePort (optional)
Type: `Integer`
Default value: 22

A numeric value that represents the port in which the SSH client will connect to in the server.

#### options.targetHost (optional)
Type: `String`
Default value: (same as remoteHost)

A string value that represents the hostname or ip of the host that will be accessed through the tunnel (this is the remote endpoint).

#### options.timeout (optional)
Type: `Integer`
Default value: 15000

A numeric value that represents the timeout (in milliseconds) of the SSH connection/negotiation.


### Usage Examples

#### Default Options
In this example, the default options are used to start a tunnelExec tunnel. These are the required and minimal options that should be passed.

```js
grunt.initConfig({
  tunnelExec: {
    options: {
        remoteHost: 'example.com',
        targetPort: 1234
    }
  },
});
```

This would execute an SSH command like:

`ssh -p 22 example.com -L 1234:example.com:1234 -N -v`


#### Custom Options
In this example, custom options are used to start the api-mock server in port 1235 with another_api.apib as source.

```js
grunt.initConfig({
  tunnelExec: {
    options: {

        user: 'myUser',
        identityFile: '~/.ssh/id_dsa.pub',
        localPort: 1234,

        // Host which is being SSH'd
        remoteHost: 'example.com',
        remotePort: 2222,

        // Target host, will receive the commands executed through the tunnel
        targetHost: 'host2.example.com',
        targetPort: 6666,

        // Connection timeout
        timeout: 10000

    }
  },
});
```

This would execute an SSH command like:

`ssh -p 2222 myUser@example.com -i ~/.ssh/id_dsa.pub -L 1234:host2.example.com:6666 -N -v`

And will timeout after 10 seconds.


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_v0.1.0_ - Initial release
