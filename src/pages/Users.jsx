import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getUsers, createUser, deleteUser } from "../services/userService";

function Users() {

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const loadUsers = async () => {
    const res = await getUsers();
    console.log("Users:",res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      role
    };

    await createUser(newUser);

    setName("");
    setEmail("");
    setPassword("");
    setRole("");

    loadUsers();
  };

  const removeUser = async (id) => {

    const confirmDelete = window.confirm("Delete this user?");

    if(confirmDelete){
      await deleteUser(id);
      loadUsers();
    }

  };

  return (

    <div>

      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>

        <h2>Create User</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ROLE DROPDOWN */}

          <select
            className="form-control mb-2"
            value={role}
            onChange={(e)=>setRole(e.target.value)}
            required
          >

            <option value="">Select Role</option>
            <option value="ADMIN">ADMIN</option>
            <option value="USER">USER</option>

          </select>

          <button className="btn btn-primary">
            Add User
          </button>

        </form>

        <hr />

        <h3>Users List</h3>

        {users.map(user => (

          <div key={user.id} className="card -ui mb-2">

            <b>{user.name}</b>

            <p>{user.email}</p>

            <p>
              Role: <b>{user.role}</b>
            </p>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeUser(user.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Users;