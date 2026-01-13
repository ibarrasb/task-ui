import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onUpdated, onDeleted }) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdated={onUpdated}
          onDeleted={onDeleted}
        />
      ))}
    </ul>
  );
}
