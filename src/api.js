const BASE_URL = 'http://localhost:5000';

/**
 * Fetch all tasks from the backend
 */
export async function getTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || errorData?.message || `Failed to fetch tasks (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getTasks:', error);
    throw error;
  }
}

/**
 * Create a new task
 * @param {Object} taskData - { title, description }
 */
export async function createTask(taskData) {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || errorData?.details || `Failed to create task (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in createTask:', error);
    throw error;
  }
}

/**
 * Update an existing task
 * @param {string} id - Task ID (_id)
 * @param {Object} taskData - Object containing fields to update (e.g., { completed: true })
 */
export async function updateTask(id, taskData) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || errorData?.details || `Failed to update task (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in updateTask:', error);
    throw error;
  }
}

/**
 * Delete a task by ID
 * @param {string} id - Task ID (_id)
 */
export async function deleteTask(id) {
  try {
    const response = await fetch(`${BASE_URL}/tasks/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || `Failed to delete task (${response.status})`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error in deleteTask:', error);
    throw error;
  }
}
