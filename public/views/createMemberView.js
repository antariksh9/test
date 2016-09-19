(function($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		CreateMemberView = BaseView.extend({

			initialize: function(options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options),
					_this.data = options;
			},

			template: $('#createMember')
				.html(),

			render: function() {
				var _this = this,
					$el = _this.$el,
					project = _this.data.project,
					data = _this.data.data,
					rendered, div;
				// $el.html(this.template)
				rendered = (Mustache.render(_this.template, {}));
				div = document.createElement('div');
				div.innerHTML = rendered;
				_this.render = rendered;
				$(div)
					.find("#add-member")
					.on("click", function(e) {
						$.getScript("/public/views/addMemberFormView.js", function(AddMemberFormView) {
							var $Item = new window.modules.AddMemberFormView({
									data: data,
									project: project
								})
								.render()
								.$el;
							e.preventDefault();
							$('body')
								.append($Item.find("#overlay-initial-member"));
						});
					})
				$el.append($(div)
					.find("#add-member"));
				$el.append($(div)
					.find(".dotted-intersection"));
				return _this;
			}
		});

	window.modules.CreateMemberView = CreateMemberView;

})(jQuery, _, Backbone, Mustache);