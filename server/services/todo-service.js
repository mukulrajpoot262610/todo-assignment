const TodoModel = require('../models/todo-model')

class TodoService {

    async getAllTodo(filter) {
        const todos = await TodoModel.find(filter)
        return todos
    }

    async createTodo(data) {
        const todo = await TodoModel.create(data)
        return todo
    }

    async addTaskToTodo(name, data) {
        const todo = await TodoModel.findOne({ name });
        todo.tasks.push(data);
        await todo.save();
        return todo;
    }

    async deleteTasksFromTodo(name, taskId) {
        const todo = await TodoModel.findOne({ name })
        const taskIndex = todo.tasks.findIndex(task => task._id.toString() === taskId);
        todo.tasks.splice(taskIndex, 1);
        await todo.save();
        return todo;
    }

    async deleteTodo(todoId) {
        const deletedTodo = await TodoModel.findByIdAndDelete(todoId);
        return deletedTodo;
    }

    async markTaskComplete(taskId) {
        const todo = await TodoModel.findOne({ 'tasks._id': taskId });
        const taskToUpdate = todo.tasks.find(task => task._id.toString() === taskId);
        if (taskToUpdate.isCompleted) {
            taskToUpdate.isCompleted = false;
        } else {
            taskToUpdate.isCompleted = true;
        }
        await todo.save();
        return todo;
    }
}

module.exports = new TodoService()