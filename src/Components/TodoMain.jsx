import CreateNewTodo from "./CreateNewTodo";
import ListTodo from "./ListTodo";

const TodoMain = () => {
  return (
    <div className="flex flex-col w-[450px] max-sm:w-[90%] mx-auto mt-[-5rem] gap-5">
      <CreateNewTodo />
      <ListTodo/>
    </div>
  );
};

export default TodoMain;
