var
  env = process.env.NODE_ENV || 'development',
  config;

config = {
  production : {
    db : {
      URL : process.env['WAC_SERVICE_MONGODB_URL']
    },
    componentsURL : 'http://50.116.26.197/components/all',
    componentInstallDir : __dirname + '/components',
    componentBuildDir : __dirname + '/build',
    port : 80
  },
  development : {
    db : {
      URL : 'mongodb://localhost:27017/wac-service'
    },
    componentsURL : 'http://50.116.26.197/components/all',
    componentInstallDir : __dirname + '/components',
    componentBuildDir : __dirname + '/build',
    port : 8000,
    test : this.port,
    useMocks : false
  },
  test : {
    db : {
      URL : 'mongodb://localhost:27017/wac-service-test'
    },
    componentsURL : 'http://localhost:8001/mock/registry',
    componentInstallDir : __dirname + '/test/components',
    componentBuildDir : __dirname + '/test/build',
    port : 8001,
    useMocks : true
  } 
};

config = config[env];

// Helper environment methods
config.env = env;
config.isTest = env === 'test';
config.isDevelopment = env === 'development';

module.exports = config;
