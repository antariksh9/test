(function ($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		TaskManagerView = BaseView.extend({

			initialize: function (options) {
				var _this = this;

				BaseView.prototype.initialize.call(_this, options);

				_this.data = options.data;
			},

			events: {
				'click .mainProjectItem': 'onProjectClick'
			},

			template: $('#taskManager').html(),

			render: function () {
				var _this = this,
					$el = _this.$el,
					data = _this.data;
					// $items = $();
				$el.append(Mustache.render(_this.template, {"head": "Task Management"}));

				// $.when(
				// 		$.getScript('/public/views/projectItemView.js'),
				// 		$.getScript('/public/views/createProjectView.js')
				// 	).then(
				$.getScript('/public/views/projectItemView.js',function(){
						$.getScript('/public/views/createProjectView.js',
							function (ProjectItemView, CreateProjectView) {

							_.each(data.projects, function (project) {
								var $Item = new window.modules.ProjectItemView({
								project: project
							}).render().$el;
							// $items = $items.add($Item);
							$el.append($Item);
						});

						$el.append(new window.modules.CreateProjectView({}).render().$el);
					})});

				return _this;
			},

			onProjectClick: function (e) {
				var projectId = $(e.target).data('id');

				window.history.pushState("", "", "/#/project/" + projectId);
			}
		});

		window.modules.TaskManagerView = TaskManagerView; 
	return TaskManagerView;
})(jQuery, _, Backbone, Mustache);







