import { useEffect, useState } from "react";
import { getTasks } from "../services/taskService";
import { getProjects } from "../services/projectService";
import { getUsers } from "../services/userService";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const loadData = async () => {

    const taskRes = await getTasks();
    const projectRes = await getProjects();
    const userRes = await getUsers();

    setTasks(taskRes.data);
    setProjects(projectRes.data);
    setUsers(userRes.data);

  };

  useEffect(() => {
    loadData();
  }, []);

  const todo = tasks.filter(t => t.status === "TODO").length;
  const progress = tasks.filter(t => t.status === "IN_PROGRESS").length;
  const done = tasks.filter(t => t.status === "DONE").length;

  return (

    <div>

      <Sidebar />

<div style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>Dashboard</h2>

        <div className="row">

          <div className="col">
            <div className="card-ui text-center">
              <h4 style={{color:"#4f46e5"}}>Total Users</h4>
              <h2>{users.length}</h2>
            </div>
          </div>

          <div className="col">
            <div className="card p-3 text-center">
              <h4 style={{color:"#22c55e"}}>Total Projects</h4>
              <h2>{projects.length}</h2>
            </div>
          </div>

          <div className="col">
            <div className="card p-3 text-center">
              <h4 style={{color:"#f59e0b"}}>Total Tasks</h4>
              <h2>{tasks.length}</h2>
            </div>
          </div>

        </div>

        <div className="row mt-4">

          <div className="col">
            <div className="card p-3 text-center">
              <h4>TODO</h4>
              <h2>{todo}</h2>
            </div>
          </div>

          <div className="col">
            <div className="card p-3 text-center">
              <h4>IN PROGRESS</h4>
              <h2>{progress}</h2>
            </div>
          </div>

          <div className="col">
            <div className="card p-3 text-center">
              <h4>DONE</h4>
              <h2>{done}</h2>
            </div>
          </div>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;