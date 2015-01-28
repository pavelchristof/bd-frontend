var $ = require('jquery');

$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
  options.crossDomain ={
    crossDomain: true
  };
  options.xhrFields = {
    withCredentials: true
  };
});

var Api = {
  root: "http://localhost:3000/",

  onError: function(message) {
    alert(message);
  },

  get: function(parts, callback) {
    var url = this.root + parts.join('/');
    this._handle($.get(url), callback);
  },

  post: function(parts, data, callback) {
    var url = this.root + parts.join('/');
    this._handle($.post(url, data), callback);
  },

  delete: function(parts, callback) {
    var url = this.root + parts.join('/');
    this._handle($.ajax(url, {
      type: 'DELETE'
    }), callback);
  },

  // Horrible hack, but i don't have time to do it correctly.
  forceReload: function() {
    this.reloadsStack.forEach(r => r());
  },
  reloadsStack: [],

  _handle: function(request, callback) {
    request
      .done(function (data) {
        if (data.ok === true) {
          callback(data.value);
        } else {
          this.onError(data.message);
        }
      }.bind(this))

      .fail(function (xhr){
        var data = xhr.responseJSON;
        if (data != null && data.message != null) {
          this.onError(data.message);
        } else {
          this.onError('AJAX request failed!');
        }
      }.bind(this));
  }
};

module.exports = Api;
