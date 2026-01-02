const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ""; 
// If you're using Vite proxy or same-origin, BASE_URL can be "".
// If your API is hosted elsewhere, set VITE_API_BASE_URL="https://your-api.com"

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Handle empty responses (like DELETE sometimes)
  if (res.status === 204) return null;

  // If backend sends errors, surface them nicely
  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body?.message || body?.error || message;
    } catch {
      // ignore json parse errors
    }
    throw new Error(message);
  }

  // Some endpoints might not return JSON
  const contentType = res.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return null;

  return res.json();
}

export function fetchTasks() {
  return request("/api/tasks", { method: "GET" });
}

export function createTask(task) {
  return request("/api/tasks", {
    method: "POST",
    body: JSON.stringify(task),
  });
}

export function updateTask(id, updates) {
  return request(`/api/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export function deleteTask(id) {
  return request(`/api/tasks/${id}`, { method: "DELETE" });
}
