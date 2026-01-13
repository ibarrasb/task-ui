import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      setError("");
      setLoading(true);
      const data = await fetchTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e?.message || "Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      setError("");
      await createTask({ title, description });
      setTitle("");
      setDescription("");
      await loadTasks();
    } catch (e) {
      setError(e?.message || "Failed to create task");
    }
  };

  const toggleTask = async (task) => {
    try {
      setError("");
      await updateTask(task.id, { completed: !task.completed });
      await loadTasks();
    } catch (e) {
      setError(e?.message || "Failed to update task");
    }
  };

  const removeTask = async (id) => {
    try {
      setError("");
      await deleteTask(id);
      await loadTasks();
    } catch (e) {
      setError(e?.message || "Failed to delete task");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-900">Task Manager</h1>
        <p className="text-gray-600 mt-1">React + Spring Boot + Docker + AWS</p>

        {/* Error */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Add Task */}
        <div className="bg-white rounded-xl shadow p-4 mt-6">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              className="w-full sm:flex-1 min-w-0 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full sm:flex-1 min-w-0 border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              onClick={addTask}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* Tasks */}
        <div className="mt-6 space-y-4">
          {loading ? (
            <div className="text-gray-600">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="text-gray-600">No tasks yet.</div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow p-4 flex justify-between items-start hover:shadow-md transition"
              >
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-gray-800 break-words">
                    {task.title}
                  </h3>

                  {task.description && (
                    <p className="text-gray-600 text-sm mt-1 break-words">
                      {task.description}
                    </p>
                  )}

                  {task.createdAt && (
                    <p className="text-xs text-gray-400 mt-2">
                      Created {new Date(task.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-end gap-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.completed
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </span>

                  <button
                    onClick={() => toggleTask(task)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Toggle
                  </button>

                  <button
                    onClick={() => removeTask(task.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
