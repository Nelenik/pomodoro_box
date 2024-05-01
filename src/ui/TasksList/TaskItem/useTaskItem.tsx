import { FormState } from "@/hooks/useFormValidation/useFormValidation";
import { Task, TasksContext } from "@/types";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
//menu svg
import DropDeleteSvg from "assets/drop-delete.svg?react";
import DropEditSvg from "assets/drop-edit.svg?react";
import DropLessSvg from "assets/drop-less.svg?react";
import DropMoreSvg from "assets/drop-more.svg?react";
import { generateId } from "@/utils";
import { createPortal } from "react-dom";
import { Modal } from "@/ui/Modal";

export const useTaskItem = (taskItem: Task, formState: FormState) => {
  const { dispatchTask } = useOutletContext<TasksContext>();

  const [editTask, setEditTask] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null);
  //edit task
  useEffect(() => {
    editTask && inputRef.current?.focus();
  }, [editTask]);

  const handleEdit = () => {
    setEditTask(true);
  };

  const rewriteTask = (value: string) => {
    if (formState === "valid") {
      dispatchTask({
        type: "CHANGE_TASK",
        id: taskItem.id,
        toChange: { task: value },
      });
      setEditTask(false);
    }
  };

  const handleLess = () => {
    const newTomatoes = taskItem.tomatoes.slice(0, taskItem.tomatoes.length - 1)
    dispatchTask({
      type: 'CHANGE_TASK',
      id: taskItem.id,
      toChange: { tomatoes: newTomatoes }
    })
  }

  const handleMore = () => {
    dispatchTask({
      type: 'CHANGE_TASK',
      id: taskItem.id,
      toChange: { tomatoes: [...taskItem.tomatoes, { id: generateId(), time: 25 }] }
    })
  }
  //modal functions
  const handleDelete = () => {
    setIsOpenModal(true)
  }

  const handleComfirmDelete = () => {
    dispatchTask({
      type: 'REMOVE_TASK',
      id: taskItem.id
    })
  }

  const insertModal = () => {
    return createPortal(
      <Modal
        isOpen={isOpenModal}
        onDelete={handleComfirmDelete}
        onClose={() => setIsOpenModal(false)}
      />, document.body)
  }

  //dropdown items list
  const dropdownItems = [
    {
      id: generateId(),
      inner: (
        <>
          <DropMoreSvg />
          <span>Увеличить</span>
        </>
      ),
      itemOnClick: handleMore,
    }, {
      id: generateId(),
      inner: (
        <>
          <DropLessSvg />
          <span>Уменьшить</span>
        </>
      ),
      itemOnClick: handleLess,
    }, {
      id: generateId(),
      inner: (
        <>
          <DropEditSvg />
          <span>Редактировать</span>
        </>
      ),
      itemOnClick: handleEdit,
    }, {
      id: generateId(),
      inner: (
        <>
          <DropDeleteSvg />
          <span>Удалить</span>
        </>
      ),
      itemOnClick: handleDelete,
    },
  ];
  return {
    editTask,
    inputRef,
    rewriteTask,
    dropdownItems,
    insertModal
  };
};
