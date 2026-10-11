const BASE_URL = 'http://localhost:5000';

/**
 * Token management helpers
 */
export function getToken() {
  return localStorage.getItem('token');
}

export function setToken(token) {
  localStorage.setItem('token', token);
  window.dispatchEvent(new Event('auth-changed'));
}

export function clearToken() {
  localStorage.removeItem('token');
  window.dispatchEvent(new Event('auth-changed'));
}

/**
 * Register a new user
 * @param {string} email
 * @param {string} password
 */
export async function register(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error || data?.message || `Registration failed (${response.status})`);
    }
    return data;
  } catch (error) {
    console.error('Error in register:', error);
    throw error;
  }
}

/**
 * Log in a user and store JWT
 * @param {string} email
 * @param {string} password
 */
export async function login(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.error || data?.message || `Login failed (${response.status})`);
    }
    if (data?.token) {
      setToken(data.token);
    }
    return data;
  } catch (error) {
    console.error('Error in login:', error);
    throw error;
  }
}

/**
 * Helper to build auth and content headers
 */
function getAuthHeaders(includeJson = false) {
  const token = getToken();
  const headers = {};
  if (includeJson) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Fetch all tasks from the backend
 */
export async function getTasks() {
  try {
    const response = await fetch(`${BASE_URL}/tasks`, {
      headers: getAuthHeaders(),
    });
    if (response.status === 401) {
      clearToken();
      const error = new Error('Session expired. Please log in again.');
      error.status = 401;
      throw error;
    }
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
      headers: getAuthHeaders(true),
      body: JSON.stringify(taskData),
    });
    if (response.status === 401) {
      clearToken();
      const error = new Error('Session expired. Please log in again.');
      error.status = 401;
      throw error;
    }
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
      headers: getAuthHeaders(true),
      body: JSON.stringify(taskData),
    });
    if (response.status === 401) {
      clearToken();
      const error = new Error('Session expired. Please log in again.');
      error.status = 401;
      throw error;
    }
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
      headers: getAuthHeaders(),
    });
    if (response.status === 401) {
      clearToken();
      const error = new Error('Session expired. Please log in again.');
      error.status = 401;
      throw error;
    }
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
