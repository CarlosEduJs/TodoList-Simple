import { useContext } from "react";

import { TodoContext } from "../Context/TodoContext";

export const useTodo = () => {
  return useContext(TodoContext);
};
