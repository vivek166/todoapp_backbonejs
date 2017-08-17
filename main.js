var Task = Backbone.Model.extend({
});

var Tasks = Backbone.Collection.extend({
	model : Task
});

var TaskView = Backbone.View.extend({
	tagName : 'li',
	initialize:function(){
        this.listenTo(this.model, 'change', this.render);
    },
	render : function(){
		this.$el.html(this.model.get("title")+"<button class='edit-btn'>Edit</button>"
											 +"<button class='delete-btn'>Delete</button>");
		return this;
	},
	events : {
		"click .delete-btn": "onRemoveTask",
		"click .edit-btn": "onEditTask"
	},
	onRemoveTask : function(task){
		console.log("delete button worked!!");
		this.remove();
		this.model.trigger('delete', this.model);
	},
	onEditTask : function(task){
		console.log("edit button worked!!");
		$(".taskTitle").val(this.model.get("title"));
		this.onRemoveTask();
	}
});

var TasksView = Backbone.View.extend({
	render : function(){
		var self = this;
		this.model.each(function(task){
			var taskView = new TaskView({model: task});
			self.$el.append(taskView.render().$el);
		});
	}
});

$(document).ready(function(){
	$(".addTask").click(function(){
		var taskTitle = $(".taskTitle").val();
		var tasks =  new Tasks(new Task({title : taskTitle}));
		var tasksView = new TasksView({model : tasks , el : ".todoList"});
		tasksView.render();
		$(".taskTitle").val("");
	});
});