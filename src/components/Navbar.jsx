import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{background:"#333", padding:"10px"}}>
      <Link style={{color:"white", marginRight:"15px"}} to="/dashboard">Dashboard</Link>
      <Link style={{color:"white", marginRight:"15px"}} to="/projects">Projects</Link>
      <Link style={{color:"white", marginRight:"15px"}} to="/tasks">Tasks</Link>
      <Link style={{color:"white"}} to="/users">Users</Link>
    </nav>
  );
}

export default Navbar;