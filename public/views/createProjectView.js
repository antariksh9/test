(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		CreateProjectView = BaseView.extend({

			initialize: function (options) {
				var _this = this;
				BaseView.prototype.initialize.call(_this, options),
				_this.data=options;
			},

			events: {
				'click .clickAddForm': 'onAddClick'
			},

			template: $('#createProjectItemTile').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					data=_this.data;

				$el.append(Mustache.render(_this.template, {}));
				return _this;

			},

			onAddClick: function (e) {
				data=this.data.data;
				$.getScript("/public/views/addProjectFormView.js",function(AddProjectFormView){
					var $Item=new window.modules.AddProjectFormView({data:data}).render().$el;
					e.preventDefault();
					$('body').append($Item.find("#overlay-initial"));
					//console.log($("body"));
				});
			}
			
		});

		window.modules.CreateProjectView = CreateProjectView; 

})(jQuery, _, Backbone, Mustache);







