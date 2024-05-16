import { FormState } from "@/hooks/useFormValidation/useFormValidation";
import { Task } from "@/types";
import { useState, useRef, useEffect } from "react";
//menu svg
import DropDeleteSvg from "assets/drop-delete.svg?react";
import DropEditSvg from "assets/drop-edit.svg?react";
import DropLessSvg from "assets/drop-less.svg?react";
import DropMoreSvg from "assets/drop-more.svg?react";
import { generateId } from "@/utils";
import { createPortal } from "react-dom";
import { Modal } from "@/components/Modal";
import { ConfirmDelete } from "@/components/ConfirmDelete";
import { useDispatchTasks } from "@/reducers_providers/TasksListProvider";

export const useTaskItem = (taskItem: Task, formState: FormState) => {
  const dispatchTasks = useDispatchTasks()

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
      dispatchTasks({
        type: "CHANGE_TASK",
        id: taskItem.id,
        toChange: { task: value },
      });
      setEditTask(false);
    }
  };

  const handleLess = () => {
    dispatchTasks({
      type: 'CHANGE_TASK',
      id: taskItem.id,
      toChange: { tomatoesCount: taskItem.tomatoesCount - 1 }
    })
  }

  const handleMore = () => {
    dispatchTasks({
      type: 'CHANGE_TASK',
      id: taskItem.id,
      toChange: { tomatoesCount: taskItem.tomatoesCount + 1 }
    })
  }
  //modal functions
  const handleDelete = () => {
    setIsOpenModal(true)
  }

  const handleComfirmDelete = () => {
    dispatchTasks({
      type: 'REMOVE_TASK',
      id: taskItem.id
    })
  }

  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  const insertModal = () => {
    return createPortal(
      <Modal
        isOpen={isOpenModal}
        onClose={handleCloseModal}
      >
        <ConfirmDelete
          onConfirmDelete={handleComfirmDelete}
          onClose={handleCloseModal}
        />
      </Modal>,
      document.body)
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
