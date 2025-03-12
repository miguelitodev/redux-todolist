import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useId,
  useRef,
  useState,
} from "react";
import { ToDoOption } from "./ToDoOption";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import { RootState } from "../redux/store";
import { toast } from "sonner";

export function Form() {
  const [newToDo, setNewToDo] = useState("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const idTodo = useId();
  const inputTodo = useRef<HTMLInputElement>(null);

  const handleAddToDo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      console.log();

      if (newToDo === "" || !newToDo || newToDo === undefined) {
        toast.error("Precisa escrever algo antes de adicionar!");
        return;
      }

      if (todos.find((todo) => todo.text === newToDo)) {
        toast.warning(
          "Voce ja tem essa tarefa adicionada na lista! Por favor tente outra!"
        );
        return;
      }

      dispatch(addTodo({ id: `${new Date()}-${idTodo}`, text: newToDo }));
      setNewToDo("");
      inputTodo.current?.focus();
      toast.success("Tarefa adicionada!");
    },
    [newToDo, dispatch, idTodo]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDo(e.target.value);
  };

  return (
    <div className="h-[500px]">
      <div className="w-[400px] text-left flex flex-col gap-2">
        <form onSubmit={handleAddToDo} className="flex flex-col gap-2">
          <h1 className="text-6xl font-bold text-gray-800">To Do</h1>
          <div className="flex flex-row justify-between items-center h-[50px] gap-2">
            <input
              ref={inputTodo}
              className="h-full rounded w-full p-2 bg-[#EAEAEA] text-[#333333]"
              type="text"
              name="todo"
              id="todo"
              value={newToDo}
              onChange={handleChange}
            />

            <button
              className="font-bold bg-green-500 text-white uppercase h-full p-4 rounded"
              type="submit"
            >
              <FaPlus />
            </button>
          </div>
        </form>

        {todos.length !== 0 && (
          <div className="flex flex-col gap-2 max-h-[400px] overflow-auto scrollbar">
            <ul className="list-none flex flex-col gap-2">
              {todos.map((todo) => (
                <ToDoOption key={todo.id} {...todo} />
              ))}
            </ul>
          </div>
        )}

        {todos.length === 0 && (
          <span className="text-sm text-center opacity-80 text-gray-500">
            Ops... Parece que não há tarefas ainda. Adicione a primeira!
          </span>
        )}
      </div>
    </div>
  );
}
