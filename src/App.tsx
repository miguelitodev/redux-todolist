import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { ToDoOption } from "./components/ToDoOption";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "./redux/todoSlice";
import { RootState } from "./redux/store";

function App() {
  const [newToDo, setNewToDo] = useState("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();

  const handleAddToDo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      dispatch(addTodo(newToDo));
      setNewToDo("");
    },
    [newToDo, dispatch]
  );

  console.log(todos);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDo(e.target.value);
  };

  return (
    <main className="flex justify-center flex-col items-center h-screen bg-neutral-900 text-white text-left lato">
      <div className="w-[400px] text-left flex flex-col gap-2">
        <form onSubmit={handleAddToDo} className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold">To Do</h1>
          <div className="flex flex-row justify-between items-center h-[50px] gap-2">
            <input
              className="border h-full rounded w-full"
              type="text"
              name="todo"
              id="todo"
              value={newToDo}
              onChange={handleChange}
            />
            <button
              className="font-bold bg-green-700 text-white uppercase h-full p-4 rounded"
              type="submit"
            >
              <FaPlus />
            </button>
          </div>
        </form>

        {todos.length !== 0 && (
          <div className="flex flex-col gap-2">
            <span className="text-lg">List:</span>
            <ul className="list-none">
              {todos.map((todo) => (
                <ToDoOption checked={todo.checked} text={todo.text} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export default App;
