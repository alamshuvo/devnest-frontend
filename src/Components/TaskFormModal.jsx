import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useCreateTaskMutation } from '../redux/api/taskApi';

const TaskFormModal = ({ onClose, onSubmit, defaultValue }) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    dueDate: '',
  });

  const [createTask] = useCreateTaskMutation();

  useEffect(() => {
    if (defaultValue) {
      setForm({
        title: defaultValue.title || '',
        description: defaultValue.description || '',
        status: defaultValue.status || 'pending',
        priority: defaultValue.priority || 'medium',
        dueDate: defaultValue.dueDate ? defaultValue.dueDate.slice(0, 10) : '', // format YYYY-MM-DD
      });
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      return toast.error('Title and description are required');
    }

    try {
      if (defaultValue) {
        await onSubmit(form);
      } else {
        await createTask(form).unwrap();
        toast.success('Task created successfully');
      }
      onClose();
      setForm({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
    } catch (error) {
      toast.error('Failed to save task', error.message || 'An error occurred');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50 animate-fadeInSlow">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-8 animate-slideUpSlow">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {defaultValue ? 'Edit Task' : 'Add New Task'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Priority</label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded border border-gray-300 hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              {defaultValue ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;
