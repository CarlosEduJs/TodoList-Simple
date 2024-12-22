import { useState } from "react";
import { useTheme } from "../Hooks/useTheme";
import { settings } from "../Constants/ThemeConstants";

import { useTodo } from "../Hooks/useTodo";

const CreateNewTodo = () => {
  const { newTask } = useTodo();
  const [newTodo, setNewTodo] = useState("");

  const { theme } = useTheme();

  const currentTheme = settings[theme] || settings.LightTheme;

  const handleNewTask = () => {
    if (newTodo.length > 1) {
      newTask({ title: newTodo });
      setNewTodo("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNewTask();
    }
  };

  return (
    <div
      className={`flex items-center px-5 py-3 rounded-lg gap-3 ${currentTheme.bgContent}`}
    >
      <div
        onClick={handleNewTask}
        className={`w-4 h-4 cursor-pointer rounded-full border ${currentTheme.borderCheck}`}
      ></div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        type="text"
        onKeyDown={handleKeyDown}
        className={`text-gray-500 bg-transparent w-full outline-none text-sm`}
        placeholder="Create a new todo..."
      />
    </div>
  );
};

export default CreateNewTodo;
