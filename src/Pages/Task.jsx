import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  useDeleteTaskMutation,
  useGetAllTaskQuery,
  useUpdateTaskMutation,
} from '../redux/api/taskApi';
import TaskFormModal from '../Components/TaskFormModal';
import Loader from '../Components/Loader';

const Task = () => {
  const { data: tasks, isLoading, isError, refetch } = useGetAllTaskQuery();
  const [deleteTaskApi] = useDeleteTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);

  const closeModal = () => {
    setShowModal(false);
    setEditTask(null);
  };

  const openEditModal = (task) => {
    setEditTask(task);
    setShowModal(true);
  };

  const deleteTask = async (id) => {
    try {
      await deleteTaskApi(id).unwrap();
      toast.success('Task deleted successfully');
      refetch();
    } catch (error) {
      toast.error('Failed to delete task', error);
    }
  };

  const saveTask = async (taskData) => {
    try {
      if (editTask) {
        await updateTask({ id: editTask._id, ...taskData }).unwrap();
        toast.success('Task updated successfully');
      }
      closeModal();
      refetch();
    } catch (error) {
      toast.error('Failed to update task', error);
    }
  };

  useEffect(() => {
    refetch();
  }, [tasks?.length]);

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-center text-red-600 mt-10">Failed to load tasks</p>;

  return (
    <div className="max-w-6xl mx-auto bg-[#f0e8ff] p-4 rounded-lg font-fustat">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Task Manager
        </h2>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
          onClick={() => setShowModal(true)}
        >
          Add Task
        </button>
      </div>

      {/* Responsive Task List */}
      <div className="space-y-4 sm:space-y-0 sm:border sm:rounded-lg sm:overflow-x-auto sm:shadow-md">
        {/* Table Header (only visible on sm+) */}
        <div className="hidden sm:grid grid-cols-7 bg-blue-50 text-blue-700 font-semibold uppercase tracking-wider text-xs sm:text-sm px-4 py-3">
          <span>Sl</span>
          <span>Title</span>
          <span className="hidden sm:block">Description</span>
          <span>Status</span>
          <span>Priority</span>
          <span className="hidden md:block">Due Date</span>
          <span className="text-center">Actions</span>
        </div>

        {/* Task Rows */}
        {tasks?.map((task, i) => (
          <div
            key={task._id || i}
            className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-0 px-4 py-3 bg-white even:bg-gray-50 hover:bg-blue-50 transition duration-200 rounded sm:rounded-none"
          >
            {/* Mobile view layout */}
            <div className="sm:hidden">
              <p className="text-sm text-gray-700">
                <strong>{i + 1}. {task.title}</strong>
              </p>
              <p className="text-xs text-gray-600 mt-1">{task.description}</p>
              <div className="flex flex-wrap gap-2 mt-2 text-sm">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {task.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {task.priority}
                </span>
                <span className="text-gray-500 text-xs">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
                </span>
              </div>
              <div className="flex gap-4 mt-2 text-sm font-medium">
                <button
                  onClick={() => openEditModal(task)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Desktop view layout */}
            <span className="hidden sm:block self-center">{i + 1}</span>
            <span className="hidden sm:block self-center truncate">{task.title}</span>
            <span className="hidden sm:block self-center truncate">{task.description}</span>
            <span className="hidden sm:block self-center">
              <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-800' : task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {task.status}
              </span>
            </span>
            <span className="hidden sm:block self-center">
              <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${task.priority === 'high' ? 'bg-red-100 text-red-800' : task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                {task.priority}
              </span>
            </span>
            <span className="hidden md:block self-center">
              {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
            </span>
            <div className="hidden sm:flex justify-center items-center gap-4 self-center">
              <button
                onClick={() => openEditModal(task)}
                className="text-indigo-600 hover:text-indigo-900 font-semibold"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-600 hover:text-red-900 font-semibold"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <TaskFormModal
          onClose={closeModal}
          onSubmit={saveTask}
          defaultValue={editTask}
        />
      )}
    </div>
  );
};

export default Task;
