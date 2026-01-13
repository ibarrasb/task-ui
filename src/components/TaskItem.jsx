import { updateTask, deleteTask } from "../api/tasks";

export default function TaskItem({ task, onUpdated, onDeleted }) {
  async function toggleCompleted() {
    const updated = await updateTask(task.id, {
      ...task,
      completed: !task.completed,
    });
    onUpdated(updated);
  }

  async function handleDelete() {
    await deleteTask(task.id);
    onDeleted(task.id);
  }

  return (
    <li>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={toggleCompleted}
      />
      <span style={{ textDecoration: task.completed ? "line-through" : "" }}>
        {task.title}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}
