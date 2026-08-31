import { useState, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../api';
import Spinner from '../components/Spinner';
import ErrorMessage from '../components/ErrorMessage';

function Projects() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  // Form state for creating a new task
  const [formData, setFormData] = useState({ title: '', description: '' });
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  // State for tracking actions (toggle / delete) on individual tasks
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [actionError, setActionError] = useState(null);

  // 1. Fetch tasks on mount using api.js
  useEffect(() => {
    fetchTasksList();
  }, []);

  const fetchTasksList = async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await getTasks();
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setFetchError(err.message || 'Failed to connect to backend API.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (formError) setFormError(null);
    if (formSuccess) setFormSuccess(null);
  };

  // 3. Handle Task Creation (POST)
  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Task title is required.');
      return;
    }

    setCreating(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      const newTask = await createTask({
        title: formData.title.trim(),
        description: formData.description.trim(),
      });
      
      // Update local state immediately without requiring full page refresh
      setTasks((prevTasks) => [newTask, ...prevTasks]);
      setFormData({ title: '', description: '' });
      setFormSuccess('Task created successfully!');
      setTimeout(() => setFormSuccess(null), 3000);
    } catch (err) {
      setFormError(err.message || 'Failed to create task. Please try again.');
    } finally {
      setCreating(false);
    }
  };

  // 4. Handle Task Status Toggle (PUT)
  const handleToggleComplete = async (task) => {
    const taskId = task._id || task.id;
    setActionLoadingId(taskId);
    setActionError(null);

    try {
      const updated = await updateTask(taskId, {
        completed: !task.completed,
      });

      // Update task in local state immediately
      setTasks((prevTasks) =>
        prevTasks.map((t) => ((t._id || t.id) === taskId ? updated : t))
      );
    } catch (err) {
      setActionError(`Failed to update task "${task.title}": ${err.message}`);
      setTimeout(() => setActionError(null), 4000);
    } finally {
      setActionLoadingId(null);
    }
  };

  // 5. Handle Task Deletion (DELETE)
  const handleDeleteTask = async (task) => {
    const taskId = task._id || task.id;
    setActionLoadingId(taskId);
    setActionError(null);

    try {
      await deleteTask(taskId);

      // Remove task from local state immediately
      setTasks((prevTasks) => prevTasks.filter((t) => (t._id || t.id) !== taskId));
    } catch (err) {
      setActionError(`Failed to delete task "${task.title}": ${err.message}`);
      setTimeout(() => setActionError(null), 4000);
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return <Spinner message="Connecting to backend & loading tasks..." />;
  }

  if (fetchError) {
    return (
      <div className="main-content">
        <ErrorMessage message={fetchError} />
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button className="submit-btn" onClick={fetchTasksList}>
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main-content tasks-page">
      {/* Page Header Section */}
      <section className="section">
        <div className="section-header-row">
          <div>
            <h2 className="section-title">Task Manager</h2>
            <p className="section-subtitle-text">
              Connected to Node.js / Express / MongoDB backend (<code>http://localhost:5000/tasks</code>)
            </p>
          </div>
          <span className="api-status-badge">● API Live</span>
        </div>

        {/* Global Action Error Alert Banner */}
        {actionError && (
          <div className="action-error-banner" role="alert">
            <span>⚠️ {actionError}</span>
            <button className="banner-close-btn" onClick={() => setActionError(null)}>✕</button>
          </div>
        )}

        {/* Task Creation Form */}
        <div className="task-form-card">
          <h3 className="form-heading">Add a New Task</h3>
          <form onSubmit={handleCreateTask} className="task-form">
            <div className="form-group">
              <label htmlFor="task-title" className="form-label">
                Task Title <span className="required-star">*</span>
              </label>
              <input
                id="task-title"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Complete Practical 6 API integration"
                className="form-input"
                disabled={creating}
              />
            </div>

            <div className="form-group">
              <label htmlFor="task-desc" className="form-label">
                Description (Optional)
              </label>
              <textarea
                id="task-desc"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Details about what needs to be done..."
                className="form-textarea"
                rows="3"
                disabled={creating}
              />
            </div>

            {formError && (
              <div className="form-inline-error">
                ⚠️ {formError}
              </div>
            )}

            {formSuccess && (
              <div className="success-banner">
                ✓ {formSuccess}
              </div>
            )}

            <button
              type="submit"
              className="submit-btn"
              disabled={creating}
            >
              {creating ? 'Adding Task...' : '+ Add Task'}
            </button>
          </form>
        </div>
      </section>

      {/* Task List Section */}
      <section className="section">
        <div className="task-list-header">
          <h3 className="section-title">
            Task List ({tasks.length})
          </h3>
          <button className="refresh-btn" onClick={fetchTasksList} title="Refresh tasks">
            ↻ Refresh
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-tasks-box">
            <p className="empty-title">📋 No tasks found</p>
            <p className="empty-subtitle">Create your first task using the form above!</p>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => {
              const taskId = task._id || task.id;
              const isItemBusy = actionLoadingId === taskId;

              return (
                <div
                  key={taskId}
                  className={`task-card ${task.completed ? 'completed-task' : 'pending-task'}`}
                >
                  <div className="task-card-header">
                    <div className="task-title-wrap">
                      <h4 className={`task-title ${task.completed ? 'task-title-done' : ''}`}>
                        {task.title}
                      </h4>
                      <span className={`task-badge ${task.completed ? 'badge-completed' : 'badge-pending'}`}>
                        {task.completed ? '✓ Completed' : '○ Pending'}
                      </span>
                    </div>

                    <div className="task-actions">
                      <button
                        type="button"
                        className={`action-btn ${task.completed ? 'btn-incomplete' : 'btn-complete'}`}
                        onClick={() => handleToggleComplete(task)}
                        disabled={isItemBusy}
                        title={task.completed ? 'Mark as Pending' : 'Mark as Complete'}
                      >
                        {isItemBusy ? '...' : task.completed ? 'Mark Pending' : '✓ Complete'}
                      </button>
                      <button
                        type="button"
                        className="action-btn btn-delete"
                        onClick={() => handleDeleteTask(task)}
                        disabled={isItemBusy}
                        title="Delete Task"
                      >
                        {isItemBusy ? '...' : '🗑 Delete'}
                      </button>
                    </div>
                  </div>

                  {task.description && (
                    <p className="task-description">{task.description}</p>
                  )}

                  <div className="task-footer">
                    <span className="task-id-tag">ID: {taskId}</span>
                    {task.createdAt && (
                      <span className="task-date">
                        📅 {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default Projects;
