import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import { Plus } from 'lucide-react';

const Dashboard = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const { logout } = useAuth(); // Auth is handled in Navbar mostly, but good to have access

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.get('http://localhost:5000/api/todos', config);
            setTodos(res.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const res = await axios.post('http://localhost:5000/api/todos', { text }, config);
            setTodos([...todos, res.data]);
            setText('');
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            await axios.delete(`http://localhost:5000/api/todos/${id}`, config);
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    const toggleTodo = async (todo) => {
        // Optimistic update
        const updatedTodos = todos.map((t) =>
            t._id === todo._id ? { ...t, completed: !t.completed } : t
        );
        setTodos(updatedTodos);

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            // Note: Backend might not have PUT route strictly defined for toggle in the initial plan, 
            // but we implemented updateTodo which accepts body.
            // Let's assume we send the full object or just the field.
            // Our backend updateTodo uses req.body directly to update.
            await axios.put(`http://localhost:5000/api/todos/${todo._id}`, { completed: !todo.completed }, config);
        } catch (error) {
            console.error("Error updating todo:", error);
            // Revert on error
            fetchTodos();
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">Add a new task</h2>
                    <form onSubmit={onSubmit} className="flex gap-3">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="What needs to be done?"
                            className="flex-1 appearance-none border border-gray-300 rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                        <button
                            type="submit"
                            disabled={!text.trim()}
                            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                            <Plus className="h-5 w-5" />
                            Add
                        </button>
                    </form>
                </div>

                <div className="space-y-4">
                    {todos.length > 0 ? (
                        todos.map((todo) => (
                            <TodoItem
                                key={todo._id}
                                todo={todo}
                                onDelete={deleteTodo}
                                onToggle={toggleTodo}
                            />
                        ))
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                            <p className="text-gray-500">No tasks yet. Add one to get started!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
