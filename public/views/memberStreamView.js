(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		MemberStreamView = BaseView.extend({

			initialize: function (options) {
				var _this = this;

				BaseView.prototype.initialize.call(_this, options);
				_this.data=options;
			},

			template: $('#memberStream').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					member = _this.data.member,
					project =  _this.data.project,
					tasks=_this.data.tasks;

				$el.append(Mustache.render(_this.template, {member : member}));
				
				return _this;
			}

			
		});

		window.modules.MemberStreamView = MemberStreamView; 

})(jQuery, _, Backbone, Mustache);








