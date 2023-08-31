const APIResponse = require("../helpers/APIResponse");
const TodoService = require("../services/todo-service");


class TodoController {
    async createTodo(req, res) {
        const { name, tasks } = req.body;
        const { _id: user } = req.user;

        if (!name || !tasks) {
            return APIResponse.validationError(res);
        }

        try {

            let todo = await TodoService.getAllTodo({ name });

            if (todo.length > 0) {
                todo = await TodoService.addTaskToTodo(name, ...tasks);
            } else {
                todo = await TodoService.createTodo({ name, tasks, user });
            }

            return APIResponse.successResponseWithData(res, todo);

        } catch (error) {
            console.log(error);
            return APIResponse.errorResponse(res);
        }
    }

    async getAllTodo(req, res) {

        const { _id: user } = req.user;

        try {
            const todos = await TodoService.getAllTodo({ user });
            return APIResponse.successResponseWithData(res, todos);
        } catch (error) {
            console.log(error);
            return APIResponse.errorResponse(res);
        }
    }

    async deleteTask(req, res) {
        const { name, taskId } = req.body;

        try {
            const todo = await TodoService.deleteTasksFromTodo(name, taskId);
            return APIResponse.successResponseWithData(res, todo);
        } catch (error) {
            console.log(error);
            return APIResponse.errorResponse(res);
        }
    }

    async deleteTodo(req, res) {

        const { todoId } = req.params;

        try {
            const todo = await TodoService.deleteTodo(todoId);
            return APIResponse.successResponseWithData(res, todo);
        } catch (error) {
            console.log(error);
            return APIResponse.errorResponse(res);
        }
    }

    async markTaskComplete(req, res) {
        const { taskId } = req.params;

        try {
            const todo = await TodoService.markTaskComplete(taskId);
            return APIResponse.successResponseWithData(res, todo);
        } catch (error) {
            console.log(error);
            return APIResponse.errorResponse(res);
        }

    }
}

module.exports = new TodoController();