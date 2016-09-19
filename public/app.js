(function($) {
	var $body = $('.app-container'),
		initData = function() {
			var projects = [
					{
						"id": "p1",
						"name": "Publishing",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					},
					{
						"id": "p2",
						"name": "Paid",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					},
					{
						"id": "p3",
						"name": "Core",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					},
					{
						"id": "p4",
						"name": "Engagement",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					},
					{
						"id": "p5",
						"name": "Distributed",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					},
					{
						"id": "p6",
						"name": "Social Selling",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					},
					{
						"id": "p7",
						"name": "RTM",
						"desc": "It is a module which helps user to post in multiple channels at once",
						"members": ["m1", "m2", "m3"],
						"tasks": ["t1", "t2", "t3"]
					}
				],
				members = [
					{
						"id": "m1",
						"name": "Abhinav Singi"
					},
					{
						"id": "m2",
						"name": "Surbhi Gupta"
					},
					{
						"id": "m3",
						"name": "Pratibha Joshi"
					}
				],
				tasks = [
					{
						"id": "t1",
						"owner": "m1",
						"project": "p1",
						"name": "Publishing View",
						"desc": "Include all channels preview",
						"status": "Done"
					},
					{
						"id": "t2",
						"owner": "m2",
						"project": "p1",
						"name": "Icon Creation",
						"desc": "Needed a new icon set",
						"status": "On Hold"
					},
					{
						"id": "t3",
						"owner": "m3",
						"project": "p1",
						"name": "Publishing View",
						"desc": "Include all channels preview",
						"status": "Done"
					}
				];
			return {
				members: members,
				tasks: tasks,
				projects: projects
			}
		},

		renderAppView = function(url, viewKey, data) {
			$.getScript(url, function() {
				var view = new modules[viewKey]({
					data: data
				});
				$body.html(view.render()
					.$el);
			})
		};


	var AppRouter = Backbone.Router.extend({
		routes: {
			"project/:id": "projectRoute",
			"": "homeRoute"
		}
	});
	if (!window.check) {
		window.check = 0;
	}
	var modules = window.modules = {};
	if (window.check == 0) {
		window.data = initData();
	}
	window.functions = {};
	window.functions.addEventsButtons = function(e) {

		e.target.parentNode.parentNode.style.display = "none";

	};
	window.functions.addCancelEventsButtons = function(e) {

		e.target.parentNode.parentNode.parentNode.style.display = "none";

	};
	$.loadScript = function(url, callback) {
		return $.ajax({
			url: url,
			dataType: 'script',
			success: callback,
			async: true
		});
	};

	(function() {
		var appRouter = new AppRouter(),
			data = window.data;


		appRouter.on('route:projectRoute', function() {
			renderAppView('/public/views/projectLandingView.js', 'ProjectLandingView', data);
		});
		appRouter.on('route:homeRoute', function() {
			renderAppView('/public/views/taskManagerView.js', 'TaskManagerView', data);
		});
		if (window.check == 1) {
			Backbone.history.loadUrl(window.location.hash.split("#")[1]);
		}
		if (window.check == 0) {
			window.check = 1;
			Backbone.history.start({});
		}
	})()

})(jQuery);