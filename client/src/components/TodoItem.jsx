import { Trash2, CheckCircle, Circle } from 'lucide-react';

const TodoItem = ({ todo, onDelete, onToggle }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center gap-3 overflow-hidden">
                <button
                    onClick={() => onToggle(todo)}
                    className={`flex-shrink-0 transition-colors ${todo.completed ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                >
                    {todo.completed ? (
                        <CheckCircle className="h-6 w-6" />
                    ) : (
                        <Circle className="h-6 w-6" />
                    )}
                </button>
                <span className={`text-gray-800 truncate ${todo.completed ? 'line-through text-gray-400' : ''}`}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => onDelete(todo._id)}
                className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 p-2 rounded-md hover:bg-red-50"
                aria-label="Delete task"
            >
                <Trash2 className="h-5 w-5" />
            </button>
        </div>
    );
};

export default TodoItem;
