(function($, _, Backbone, Mustache) {

	var BaseView = Backbone.View,

		ProjectLandingView = BaseView.extend({

			initialize: function(options) {
				var _this = this;

				BaseView.prototype.initialize.call(_this, options);

				_this.data = options.data;
			},

			template: $('#projectLanding')
				.html(),

			events: {

				'click div#cross-head': 'goToHome'
			},

			render: function() {
				var _this = this,
					$el = _this.$el,
					data = _this.data,
					projectItem, url;
				url = window.location.href.split("/");
				url = url[url.length - 1];
				_.each(data.projects, function(project) {
					if (project.id == url) {
						projectItem = project;
					}
				})

				$el.append(Mustache.render(_this.template, {
					head: projectItem.name
				}));

				$.when($.loadScript('/public/views/memberStreamView.js'), $.loadScript('/public/views/createMemberView.js'))
					.then(
						function(MemberStreamView, CreateMemberView) {

							_.each(data.members, function(member) {

								if (_.contains(projectItem.members, member.id)) {
									var $Item = new window.modules.MemberStreamView({
											member: member,
											project: projectItem,
											tasks: data.tasks
										})
										.render()
										.$el;
									$el.find("#main-task-container")
										.append($Item.find(".member-div"));
									$el.find("#main-task-container")
										.append($Item.find(".dotted-intersection"));
								}
							});
							var $createMember = new window.modules.CreateMemberView({
									project: projectItem,
									data: data
								})
								.render()
								.$el;
							$el.find("#main-task-container")
								.append($createMember.find("#add-member"));
							$el.find("#main-task-container")
								.append($createMember.find(".dotted-intersection"));
							$.when($.getScript('/public/views/taskItemView.js'), $.getScript('/public/views/addTaskItemView.js'))
								.then(
									function(TaskItemView, addTaskItemView) {
										_.each(data.tasks, function(task) {
											_.each(projectItem.members, function(member) {
												if (task.project == projectItem.id && task.owner == member) {
													var $item = new window.modules.TaskItemView({
															task: task
														})
														.render()
														.$el;
													memberId = "#" + member;
													$el.find(memberId)
														.append($item.find(".task-box"));
												}

											})
										});

										_.each(projectItem.members, function(member) {
											var $addTaskItem = new window.modules.AddTaskItemView({
													member: member,
													data: data,
													project: projectItem
												})
												.render()
												.$el;
											memberId = "#" + member;
											$el.find(memberId)
												.append($addTaskItem.find('.addtask-box'));
										});
									});
						});
				return _this;
			},

			goToHome: function() {
				window.history.pushState("", "", "/");
				Backbone.history.loadUrl("");
			}


		});

	window.modules.ProjectLandingView = ProjectLandingView;
	return ProjectLandingView;
})(jQuery, _, Backbone, Mustache);