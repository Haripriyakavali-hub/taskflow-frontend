import api from "./axiosService";

export const getTasks = () => api.get("/tasks");

// ✅ THIS WAS MISSING OR WRONG
export const getTasksByUser = (userId) =>
  api.get(`/tasks/users/${userId}`);

export const createTask = (task) => api.post("/tasks", task);

export const deleteTask = (id) => api.delete(`/tasks/${id}`);

export const updateTaskStatus = (id, status) =>
  api.put(`/tasks/${id}/status?status=${status}`);