// Sloppy mock for component.install in tests

var
  utils   = require('../lib/utils'),
  fs      = require('fs-extra'),
  mkdirp  = require('mkdirp'),
  Emitter = require('events').EventEmitter;

function Package (repo, version, options) {
  this.repo = repo;
  this.version = version;
  this.options = options;
}

Package.prototype.__proto__ = Emitter.prototype;

Package.prototype.install = function () {
  var
    that = this,
    src  = __dirname + '/components/' + this.repo.replace('/', '-'),
    dest = utils.getInstallDir(this.repo);

  mkdirp(dest, function (err) {
    fs.copy(src, dest, function (err) {
      that.emit('end');
    });
  });
}

module.exports = {
  install : function (repo, version, options) {
    return new Package(repo, version, options);
  }
};
