import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { checkTodo, editTodo, removeTodo } from "../redux/todoSlice";
import { ITodo } from "../types/todo";
import { ImCheckboxChecked, ImCheckboxUnchecked } from "react-icons/im";
import { motion } from "framer-motion";
import { useReward } from "react-rewards";

export function ToDoOption({ id, text, checked }: ITodo) {
  const checkboxId = useId();
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRemoved, setIsRemoved] = useState(false);
  const { reward } = useReward("swipeDelete", "balloons", {
    elementCount: 1,
    position: "absolute",
  });

  const handleCheck = () => {
    dispatch(checkTodo(id));
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x > 100 || info.offset.x < -100) {
      setIsRemoved(true);
      dispatch(removeTodo(id));
      reward();
    }
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
    <motion.li
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1 }}
      className="overflow-x-hidden"
    >
      <motion.div
        className="flex items-start justify-between"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={{ opacity: isRemoved ? 0 : 1, x: isRemoved ? 200 : 0 }}
        transition={{ duration: 0.5 }}
      >
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
            className="w-72 max-lg:w-full"
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
                className="w-72 max-lg:w-full outline-0"
                value={text}
                type="text"
                onChange={handleEditTodo}
              />
            )}

            {!isEditing && <span className="break-all">{text}</span>}
          </div>
        </div>
      </motion.div>
      <span id="swipeDelete" />
    </motion.li>
  );
}
