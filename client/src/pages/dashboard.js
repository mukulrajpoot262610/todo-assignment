import React, { useEffect, useState } from 'react'
import { createTodo, deleteTask, getTodos, logout, markComplete } from '../services/api'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setTodo } from '../redux/todoSlice';
import { setAuth } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth);

    const navigate = useNavigate();

    const [todoTitle, setTodoTitle] = useState();
    const [taskName, setTaskName] = useState();
    const [taskDescription, setTaskDescription] = useState();

    const { todo: todos } = useSelector(state => state.todo)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await createTodo({ name: todoTitle, tasks: [{ name: taskName, description: taskDescription }] })
            dispatch(setTodo(data))
            toast.success("Added Successfully");
        } catch (err) {
            toast.error(err.response.data.msg)
            console.log(err)
        }

    }

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const { data } = await getTodos();
                dispatch(setTodo(data))
            } catch (err) {
                console.log(err)
            }
        }

        fetchTodos()
    }, [dispatch])


    const handleMarkComplete = async (id) => {
        try {
            const { data } = await markComplete(id);
            dispatch(setTodo(data))
            toast.success("Completed")
        } catch (err) {
            console.log(err)
        }
    }

    const handleTaskDelete = async (name, taskId) => {
        try {
            const { data } = await deleteTask({ name, taskId });
            dispatch(setTodo(data))
            toast.success('Deleted Successfully')
        } catch (err) {
            console.log(err)
        }

    }
    const handleLogout = async () => {
        try {
            const { data } = await logout();
            dispatch(setAuth(data))
            toast.success('Logged Out')
            navigate(0)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='max-w-6xl mx-auto p-10 min-h-screen'>
            <div className='flex items-center justify-between'>
                <h1 className='pt-10 font-bold'>Add ToDo List</h1>
                <h1 className='pt-10 font-bold'>{user?.username} <span className='hover:underline cursor-pointer' onClick={handleLogout}>Logout?</span></h1>
            </div>
            <form onSubmit={handleSubmit} className='mt-10 w-full'>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Todo List Title?</span>
                    </label>
                    <input type="text" value={todoTitle} onChange={(e) => setTodoTitle(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Task Name?</span>
                    </label>
                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} placeholder="Type here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Task Description?</span>
                    </label>
                    <textarea type="text" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} placeholder="Type here" className="textarea textarea-bordered w-full" />
                </div>
                <button className='btn mt-5'>Add Todo</button>
            </form>

            <hr className='my-10' />

            <h1 className='font-bold mb-5'>ToDo Lists {todos.length}</h1>

            <div className='flex flex-wrap gap-4'>
                {
                    todos.length > 0 && todos.map((todo) => <div className="card card-compact w-96 bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title">Todo Title: {todo.name}!</h2>
                            <h2>Tasks</h2>
                            {
                                todo.tasks.map((task) => <div className='flex items-center justify-between gap-2'>
                                    <div className='flex items-center gap-2'>
                                        <input type="checkbox" checked={task.isCompleted} className="checkbox" onChange={() => handleMarkComplete(task._id)} />
                                        <p>{task.name}</p>
                                    </div>
                                    <span className='text-xs btn btn-sm' onClick={() => handleTaskDelete(todo.name, task._id)}>Delete</span>
                                </div>)
                            }

                        </div>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Dashboard