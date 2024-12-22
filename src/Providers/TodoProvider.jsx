import { useState, useEffect } from "react";
import { TodoContext } from "../Context/TodoContext";

function gerarId() {
  const base = "task_";
  const random = Math.floor(Math.random() * 1000000);
  return base + random;
}

export const TodoProvider = ({ children }) => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(savedTasks);
  const [tasksActiveCount, setTasksActiveCount] = useState(0);

  useEffect(() => {
    const activeTasks = tasks.filter((task) => task.active).length;
    setTasksActiveCount(activeTasks);
  }, [tasks]);

  const newTask = (task) => {
    const newTaskObj = {
      id: gerarId(),
      title: task.title,
      completed: false,
      active: true,
    };

    const updatedTasks = [...tasks, newTaskObj];
    setTasks(updatedTasks);

    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          completed: !task.completed,
          active: !task.active,
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const uncheckAllTasks = () => {
    const updatedTasks = tasks.map((task) => {
      if (task.completed) {
        return { ...task, completed: false, active: true };
      }
      return task;
    });

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const reorderTasks = (startIndex, endIndex) => {
    const result = Array.from(tasks)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    setTasks(result)
    localStorage.setItem("tasks", JSON.stringify(result))
  }

  return (
    <TodoContext.Provider
      value={{
        newTask,
        tasksActiveCount,
        tasks,
        toggleTaskCompletion,
        deleteTask,
        uncheckAllTasks,
        reorderTasks
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
