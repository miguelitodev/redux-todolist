import { useId } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { checkTodo, removeTodo } from "../redux/todoSlice";
import { ITodo } from "../types/todo";

export function ToDoOption({ text, checked }: ITodo) {
  const checkboxId = useId();
  const dispatch = useDispatch();

  const handleCheck = () => {
    dispatch(checkTodo(text));
  };

  const handleRemove = () => {
    dispatch(removeTodo(text));
  };

  return (
    <li>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-center">
          <label htmlFor={checkboxId}>
            {!checked ? (
              <BiCheckbox size={40} />
            ) : (
              <BiCheckboxChecked size={40} />
            )}
          </label>

          <input
            className="hidden"
            type="checkbox"
            id={checkboxId}
            onChange={handleCheck}
            checked={checked}
          />
          <span>{text}</span>
        </div>

        <RiCloseLine color="red" size={20} onClick={handleRemove} />
      </div>
    </li>
  );
}
