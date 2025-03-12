import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { BiCheckbox, BiCheckboxChecked } from "react-icons/bi";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { checkTodo, editTodo, removeTodo } from "../redux/todoSlice";
import { ITodo } from "../types/todo";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";

export function ToDoOption({ id, text, checked }: ITodo) {
  const checkboxId = useId();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCheck = () => {
    dispatch(checkTodo(id));
  };

  const handleRemove = () => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(editTodo({ id, newText: e.target.value }));
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <li>
      <div className="flex items-start justify-between">
        <div className="flex flex-row items-start gap-2 ml-1">
          <label htmlFor={checkboxId}>
            {!checked ? (
              <ImCheckboxUnchecked
                size={25}
                className="opacity-50 cursor-pointer"
              />
            ) : (
              <ImCheckboxChecked
                size={25}
                className="text-green-500 cursor-pointer"
              />
            )}
          </label>

          <input
            className="hidden"
            type="checkbox"
            id={checkboxId}
            onChange={handleCheck}
            checked={checked}
          />

          <div
            className="w-72 "
            onClick={() => {
              setIsEditing(true);
            }}
            onBlur={() => {
              setIsEditing(false);
            }}
          >
            {isEditing && (
              <input
                ref={inputRef}
                className="w-72 outline-0 break-words"
                value={text}
                type="text"
                onChange={handleEditTodo}
              />
            )}

            {!isEditing && <span className="break-all ">{text}</span>}
          </div>
        </div>

        <RiCloseLine
          className="mr-1"
          color="red"
          size={20}
          onClick={handleRemove}
        />
      </div>
    </li>
  );
}
