import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDeleteTaskMutation, useGetAllTaskQuery, useUpdateTaskMutation } from '../redux/api/taskApi';
import TaskFormModal from '../Components/TaskFormModal';

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

  if (isLoading) return <p className="text-center mt-10">Loading tasks...</p>;
  if (isError) return <p className="text-center text-red-600 mt-10">Failed to load tasks</p>;

  return (
    <div className="max-w-6xl mx-auto ">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Task Manager</h2>
      <button
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition w-full sm:w-auto"
        onClick={() => setShowModal(true)}
      >
        Add Task
      </button>
    </div>
  
    {/* Scroll container for small screens */}
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md font-fustat">
      <table className="min-w-full divide-y divide-gray-200 table-fixed md:table-auto">
        <thead className="bg-blue-50">
          <tr>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
              #
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider hidden sm:table-cell">
              Description
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Priority
            </th>
            <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider hidden md:table-cell">
              Due Date
            </th>
            <th scope="col" className="relative px-4 sm:px-6 py-3 text-center text-xs sm:text-sm font-semibold text-blue-700 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tasks?.map((task, i) => (
            <tr
              key={task._id || i}
              className={`hover:bg-blue-50 transition-colors duration-200 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
            >
              <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base font-medium text-gray-900">{i + 1}</td>
              <td className="px-4 sm:px-6 py-3 max-w-xs truncate text-sm sm:text-base text-gray-700">{task.title}</td>
              <td className="px-4 sm:px-6 py-3 max-w-sm truncate text-sm sm:text-base text-gray-600 hidden sm:table-cell">{task.description}</td>
              <td className="px-4 sm:px-6 py-3 text-sm sm:text-base">
                <span
                  className={`px-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full
                    ${
                      task.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </td>
              <td className="px-4 sm:px-6 py-3 text-sm sm:text-base">
                <span
                  className={`px-2 inline-flex text-xs sm:text-sm leading-5 font-semibold rounded-full
                    ${
                      task.priority === 'high'
                        ? 'bg-red-100 text-red-800'
                        : task.priority === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                >
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </td>
              <td className="px-4 sm:px-6 py-3 text-sm sm:text-base text-gray-700 hidden md:table-cell">
                {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '-'}
              </td>
              <td className="px-4 sm:px-6 py-3 whitespace-nowrap text-sm sm:text-base font-medium flex gap-4 justify-center">
                <button
                  onClick={() => openEditModal(task)}
                  className="text-indigo-600 hover:text-indigo-900 font-semibold"
                  aria-label="Edit Task"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="text-red-600 hover:text-red-900 font-semibold"
                  aria-label="Delete Task"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
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
