//todo model
var Task = Backbone.Model.extend({
	defaults : {
		title : ''
	}
});

//todo collection
var Tasks = Backbone.Collection.extend({});

 var task1 = new Task({
 	title :'restart mysql server'
 });
 var task2 = new Task({
 	title :'restart tomcat server'
 });

 //instanciate a collection
 var tasks = new Tasks([task1, task2]);

 //views for one blog
var TaskView = Backbone.View.extend({
	model : new Task(),
	tagName : 'div',
	initialize : function() {
		this.template = _.template($('.tasks-list-template').html());
	},
	render : function(){
		this.$el.html(this.template({model:this.model.toJSON()}));
	}
});

//views for all blog
var TasksView = Backbone.View.extend({
	model:tasks,
	el:$('.tasks-list'),
	initialize: function(){
		this.model.on('add', this.render(), this);
	},
	render : function(){
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(task){
			self.$el.append((new TaskView({model:task})).render().$el);
		});
	}
});
var tasksView = new TasksView();
$(document).ready(function(){
	$('.add-task').on('click', function(){
		var task =new Task();
		title:$('.title-input').val();
	});
	console.log(task.toJSON());
	tasks.add(task);
});