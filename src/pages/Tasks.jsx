import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  getTasksByUser
} from "../services/taskService";
import { getUsers } from "../services/userService";
import { getProjects } from "../services/projectService";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

function Tasks() {

  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedUser, setAssignedUser] = useState("");
  const [projectId, setProjectId] = useState("");

  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  // 🔥 STEP 3: DEBUG LOGS
  console.log("ROLE:", role);
  console.log("USER ID:", userId);

  const loadTasks = async () => {
    try {

      // ❗ SAFETY CHECK
      if (!userId && role !== "ADMIN") {
        console.error("User ID missing! Please login again.");
        return;
      }

      if (role === "ADMIN") {
        const res = await getTasks();
        console.log("ADMIN TASKS:", res.data);
        setTasks(res.data);
      } else {
        const res = await getTasksByUser(userId);
        console.log("USER TASKS:", res.data);
        setTasks(res.data);
      }

    } catch (err) {
      console.error("Error loading tasks:", err);
    }
  };

  const loadUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();

    if (role === "ADMIN") {
      loadUsers();
      loadProjects();
    }
  }, []);

  // CREATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createTask({
        title,
        description,
        status: "TODO",
        assignedUser: { id: assignedUser },
        project: { id: projectId }
      });

      setTitle("");
      setDescription("");
      setAssignedUser("");
      setProjectId("");

      loadTasks();

    } catch (err) {
      console.error("Error creating task:", err);
    }
  };

  // DELETE
  const removeTask = async (id) => {
    if (window.confirm("Delete task?")) {
      try {
        await deleteTask(id);
        loadTasks();
      } catch (err) {
        console.error(err);
      }
    }
  };

  // DRAG
  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    try {
      const taskId = result.draggableId;
      const newStatus = result.destination.droppableId;

      await updateTaskStatus(taskId, newStatus);
      loadTasks();

    } catch (err) {
      console.error(err);
    }
  };

  const statuses = ["TODO", "IN_PROGRESS", "DONE"];

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>

        <h2>Kanban Board</h2>

        {/* ADMIN FORM */}
        {role === "ADMIN" && (
          <form onSubmit={handleSubmit}>

            <input className="form-control mb-2"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input className="form-control mb-2"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select className="form-control mb-2"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              required>
              <option value="">Select Project</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <select className="form-control mb-2"
              value={assignedUser}
              onChange={(e) => setAssignedUser(e.target.value)}
              required>
              <option value="">Assign User</option>
              {users.filter(u => u.role === "USER").map(u => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>

            <button className="btn btn-primary">Add Task</button>
          </form>
        )}

        <hr />

        {/* BOARD */}
        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ display: "flex", gap: "20px" }}>

            {statuses.map(status => (
              <Droppable droppableId={status} key={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      flex: 1,
                      minHeight: "400px",
                      background: "#eef2ff",
                      padding: "10px",
                      borderRadius: "10px"
                    }}
                  >
                    <h4>{status}</h4>

                    {tasks
                      .filter(t => t.status === status)
                      .map((task, index) => (

                        <Draggable
                          key={task.id}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="card-ui mb-2"
                            >
                              <b>{task.title}</b>
                              <p>{task.description}</p>

                              <small>
                                {task.assignedUser?.name}
                              </small>

                              {role === "ADMIN" && (
                                <button
                                  className="btn btn-danger btn-sm mt-2"
                                  onClick={() => removeTask(task.id)}
                                >
                                  Delete
                                </button>
                              )}
                            </div>
                          )}
                        </Draggable>

                      ))}

                    {provided.placeholder}

                  </div>
                )}
              </Droppable>
            ))}

          </div>
        </DragDropContext>

      </div>
    </div>
  );
}

export default Tasks;