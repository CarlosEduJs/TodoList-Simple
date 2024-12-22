import iconCheck from "../assets/icon-check.svg";

import { useTheme } from "../Hooks/useTheme";
import { settings } from "../Constants/ThemeConstants";

import iconCross from "../assets/icon-cross.svg";

import { useTodo } from "../Hooks/useTodo";

import { useSearchParams } from "react-router-dom";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const ListTodo = () => {
  const { theme } = useTheme();
  const {
    tasks,
    tasksActiveCount,
    toggleTaskCompletion,
    deleteTask,
    uncheckAllTasks,
    reorderTasks,
  } = useTodo();

  const currentTheme = settings[theme] || settings.LightTheme;

  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const filters = ["All", "Active", "Completed"];

  const handleNewFilter = (newFilter) => {
    const filter = newFilter.toLowerCase();
    setSearchParams({ filter });
  };

  const filteredItems =
    currentFilter === "all"
      ? tasks
      : tasks.filter((task) =>
          currentFilter === "completed"
            ? task.completed
            : !task.completed && task.active
        );

  const handleOnDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    reorderTasks(source.index, destination.index);
  };

  return (
    <div className="rounded-lg">
      {filteredItems.length > 0 ? (
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 max-h-96 rounded-t-lg overflow-y-auto"
              >
                {filteredItems.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        className={`group cursor-pointer flex items-center px-5 py-3 justify-between border-b ${
                          index === 0 ? "rounded-t-lg" : ""
                        } ${index === tasks.length - 1 ? "border-b-0" : ""} ${
                          currentTheme.borderCheck
                        } ${currentTheme.bgContent}`}
                      >
                        <div
                          className="flex items-center gap-3"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          <div
                            style={{
                              background: task.completed
                                ? "linear-gradient(to right, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
                                : "transparent",
                            }}
                            onClick={() => toggleTaskCompletion(task.id)}
                            className={`w-4 h-4 cursor-pointer rounded-full border flex items-center justify-center ${
                              currentTheme.borderCheck
                            } ${task.completed ? "border-none" : ""}`}
                          >
                            {task.completed && (
                              <img src={iconCheck} className="w-2" />
                            )}
                          </div>
                          <h1
                            className={`text-sm truncate max-w-[220px] ${
                              currentTheme.titleColorTodo
                            } ${task.completed ? "line-through" : ""}`}
                          >
                            {task.title}
                          </h1>
                        </div>
                        <img
                          className="w-3 cursor-pointer hidden group-hover:block"
                          src={iconCross}
                          onClick={() => deleteTask(task.id)}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div
          className={`flex w-full h-20 justify-center items-center ${currentTheme.bgContent} rounded-t-lg`}
        >
          <h1 className={`text-sm ${currentTheme.titleColorTodo}`}>
            Empty Todo
          </h1>
        </div>
      )}
      <div
        className={`flex items-center justify-between py-3 px-5 rounded-b-lg border-t ${currentTheme.borderCheck} ${currentTheme.bgContent}`}
      >
        <h1 className="text-gray-500 text-sm">{tasksActiveCount} items left</h1>
        <div className="flex items-center gap-4 max-sm:hidden">
          {filters.map((filter, index) => (
            <h1
              className={`text-xs  cursor-pointer ${
                currentFilter === filter.toLowerCase()
                  ? "text-primary-brightBlue"
                  : `${currentTheme.titleColorTodo}`
              }`}
              key={index}
              onClick={() => handleNewFilter(filter)}
            >
              {filter}
            </h1>
          ))}
        </div>
        <button onClick={uncheckAllTasks} className={`text-gray-500 text-sm `}>
          Clear completed
        </button>
      </div>
      <div
        className={`sm:hidden flex items-center justify-center gap-4 py-3 px-5 rounded-lg mt-4 ${currentTheme.bgContent}`}
      >
        {filters.map((filter, index) => (
          <h1
            className={`text-sm cursor-pointer ${
              currentFilter === filter.toLowerCase()
                ? "text-primary-brightBlue"
                : `${currentTheme.titleColorTodo}`
            }`}
            key={index}
            onClick={() => handleNewFilter(filter)}
          >
            {filter}
          </h1>
        ))}
      </div>
      <h1 className="text-gray-500 text-sm font-medium text-center my-7">
        {" "}
        Drag and Drop to render list{" "}
      </h1>
    </div>
  );
};

export default ListTodo;
