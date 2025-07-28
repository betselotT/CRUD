"use client";
import { useEffect, useState } from "react";

type Task = {
  _id: string;
  title: string;
  completed: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/api/tasks");
    const data = await res.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await fetch("http://localhost:5000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id: string, completed: boolean) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    });
    fetchTasks();
  };

  const deleteTask = async (id: string) => {
    await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    fetchTasks();
  };

  const startEditing = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const saveEdit = async () => {
    if (!editingTitle.trim() || !editingId) return;
    await fetch(`http://localhost:5000/api/tasks/${editingId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: editingTitle }),
    });
    setEditingId(null);
    setEditingTitle("");
    fetchTasks();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-10 px-4 bg-white text-orange-500">
      <h1 className="text-3xl font-bold mb-6">📝 To-Do List</h1>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter a task"
          className="px-4 py-2 border border-orange-500 rounded w-64"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Add
        </button>
      </div>

      <ul className="w-full max-w-md space-y-3">
        {tasks.map((task) => (
          <li
            key={task._id}
            className="flex items-center justify-between px-4 py-2 border border-orange-300 rounded"
          >
            {editingId === task._id ? (
              <input
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                className="flex-1 px-2 py-1 border border-orange-400 rounded"
              />
            ) : (
              <span
                onClick={() => toggleTask(task._id, task.completed)}
                className={`cursor-pointer flex-1 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
            )}

            {editingId === task._id ? (
              <div className="ml-2 flex gap-1">
                <button
                  onClick={saveEdit}
                  className="text-green-600 hover:text-green-800"
                >
                  ✔️
                </button>
                <button
                  onClick={cancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✖️
                </button>
              </div>
            ) : (
              <div className="ml-2 flex gap-2">
                <button
                  onClick={() => startEditing(task._id, task.title)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  ✎
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✖️
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
