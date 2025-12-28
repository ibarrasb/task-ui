const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchTasks() {
  const res = await fetch(`/api/tasks`);
  return res.json();
}

export async function createTask(task) {
  const res = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  return res.json();
}

export async function updateTask(id, updates) {
  const res = await fetch(`/api/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}
