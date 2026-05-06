import { Link } from "react-router-dom";

function Sidebar() {
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <h2>TaskFlow 🚀</h2>

      {role === "ADMIN" && (
        <>
          <Link to="/admin-dashboard">Dashboard</Link>
          <Link to="/users">Users</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/tasks">Tasks</Link>
        </>
      )}

      {role === "USER" && (
        <>
          <Link to="/user-dashboard">Dashboard</Link>
          <Link to="/tasks">My Tasks</Link>
        </>
      )}

      <br />
      <button className="btn btn-light" onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Sidebar;