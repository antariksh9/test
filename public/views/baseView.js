'use strict';

define([
  'backbone',
  'underscore'
], function (Backbone, _) {
  return Backbone.View.extend({
    initialize: function (options) {
      var that = this;

      _.extend(that, options);
    },

    getLabel: function (label) {
      if (this.user) {
        return this.user.getLabel(label);
      } else {
        return label;
      }
    }
  });
});
