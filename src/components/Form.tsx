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
import { useReward } from "react-rewards";
import { motion } from "framer-motion";

export function Form() {
  const [newToDo, setNewToDo] = useState("");
  const todos = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const idTodo = useId();
  const { reward } = useReward("todoCreated", "confetti");
  const inputTodo = useRef<HTMLInputElement>(null);

  const handleAddToDo = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

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

      dispatch(addTodo({ id: `${Date.now()}-${idTodo}`, text: newToDo }));

      reward();
      toast.success("Tarefa adicionada!");

      setNewToDo("");
      inputTodo.current?.focus();
    },
    [newToDo, dispatch, idTodo, todos, reward]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewToDo(e.target.value);
  };

  return (
    <div className="h-[500px]">
      <div className="w-[400px] text-left flex flex-col gap-6">
        <form onSubmit={handleAddToDo} className="flex flex-col gap-2">
          <div className="flex justify-between items-baseline">
            <h1 className="text-6xl font-bold text-gray-800 flex gap-2">
              <motion.div
                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 70,
                  damping: 10,
                }}
              >
                tuh
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  delay: 0.5,
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 10,
                }}
              >
                doo
              </motion.div>
            </h1>
            <span className="text-sm opacity-50 font-bold align-baseline">
              {todos.length > 0
                ? `Completas: ${
                    todos.filter((todo) => todo.checked).length
                  } / ${todos.length}`
                : ""}
            </span>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-row justify-between items-center h-[50px] gap-2"
          >
            <input
              ref={inputTodo}
              className="h-full rounded w-full p-2 bg-[#EAEAEA] text-[#333333]"
              placeholder="Digite aqui..."
              type="text"
              name="todo"
              id="todo"
              value={newToDo}
              onChange={handleChange}
            />
            <button
              className="font-bold bg-blue-500 disabled:bg-gray-300 text-white uppercase h-full p-4 rounded cursor-pointer"
              disabled={newToDo === ""}
              type="submit"
            >
              <span id="todoCreated" />
              <FaPlus />
            </button>
          </motion.div>
        </form>

        {todos.length !== 0 && (
          <div className="flex flex-col gap-2 max-h-[400px] overflow-y-visible scrollbar">
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
