import { useState } from "react";
import type { Todo } from "../../core/types";
import { useAppDispatch } from "../../app/hooks";
import { deleteTodo } from "../../slices/todosSlice";

export function useTodoList() {
  const dispatch = useAppDispatch();
  const [editingTodo, setEditingTodo] = useState<Todo | undefined>();
  const [showTodoModal, setTodoModal] = useState<boolean>(false);
  const [showDeleteModal, setDeleteModal] = useState<boolean>(false);

  const handleEdit = (todo: Todo) => {
    setEditingTodo(todo);
    setTodoModal(true);
  };

  const handleAdd = () => {
    setEditingTodo(undefined);
    setTodoModal(true);
  };

  const handleClose = () => {
    setEditingTodo(undefined);
    setTodoModal(false);
  };

  const handleDelete = (todo: Todo) => {
    setEditingTodo(todo);
    setDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (editingTodo) {
      dispatch(deleteTodo(editingTodo.id));
      setEditingTodo(undefined);
      setDeleteModal(false);
    }
  };

  return {
    editingTodo,
    showTodoModal,
    showDeleteModal,
    setTodoModal,
    setDeleteModal,
    handleEdit,
    handleAdd,
    handleClose,
    handleDelete,
    handleConfirmDelete,
  };
}
