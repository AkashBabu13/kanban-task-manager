import React, { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios';
import './TaskBoard.css';

const apiURL = 'https://jsonplaceholder.typicode.com/posts';

const statuses = ['To Do', 'In Progress', 'Done'];

const Task = ({ task }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'TASK',
        item: { id: task.id, status: task.status },
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() })
    }), [task]);

    return (
        <div
            ref={drag}
            className={`task ${isDragging ? 'is-dragging' : ''}`}
        >
            <h4>{task.title}</h4>
            <p>{task.description}</p>
        </div>
    );
};

const Column = ({ status, tasks, onDropTask }) => {
    const [, drop] = useDrop(() => ({
        accept: 'TASK',
        drop: (item) => onDropTask(item.id, status),
    }), [status, onDropTask]);

    return (
        <div ref={drop} className="column">
            <h2>{status}</h2>
            <div className="column-body">
                {tasks.filter(t => t.status === status).map(task => (
                    <Task key={task.id} task={task} />
                ))}
            </div>
        </div>
    );
};

const AddTaskForm = ({ onAddTask }) => {
    const [form, setForm] = useState({ title: '', description: '', status: 'To Do' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post(apiURL, form);
        onAddTask({ ...form, id: res.data.id });
        setForm({ title: '', description: '', status: 'To Do' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" required
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Description"
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <select
                value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {statuses.map(s => <option key={s}>{s}</option>)}
            </select>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default function TaskBoard() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const res = await axios.get(apiURL);
            setTasks(res.data.slice(0, 9).map((t, i) => ({
                id: t.id,
                title: t.title,
                description: t.body,
                status: statuses[i % 3]
            })));
        };
        fetchTasks();
    }, []);

    const handleAddTask = (task) => {
        setTasks([...tasks, task]);
    };

    const handleDropTask = async (id, newStatus) => {
        try {
            // Optimistically update UI first
            const updatedTasks = tasks.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            );
            setTasks(updatedTasks);

            // Make API call
            await axios.patch(`${apiURL}/${id}`, { status: newStatus });

            // If API call fails, the catch block will revert the UI
        } catch (error) {
            // Revert to previous state if API call fails
            console.error('Failed to update task status:', error);
            const originalTasks = tasks.map(task =>
                task.id === id ? { ...task, status: task.status } : task
            );
            setTasks(originalTasks);
        }
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="task-board">
                <h1>Task Management Dashboard</h1>
                <AddTaskForm onAddTask={handleAddTask} />
                <div className="kanban-board">
                    {statuses.map(status => (
                        <Column key={status} status={status} tasks={tasks} onDropTask={handleDropTask} />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
}