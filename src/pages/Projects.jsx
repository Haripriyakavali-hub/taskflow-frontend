import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { getProjects, createProject, deleteProject } from "../services/projectService";

function Projects() {

  const [projects, setProjects] = useState([]);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newProject = {
      name,
      description
    };

    await createProject(newProject);

    setName("");
    setDescription("");

    loadProjects();
  };

  const removeProject = async (id) => {

    const confirmDelete = window.confirm("Delete this project?");

    if(confirmDelete){
      await deleteProject(id);
      loadProjects();
    }

  };

  return (

    <div>

      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>

        <h2>Projects</h2>

        <form onSubmit={handleSubmit}>

          <input
            className="form-control mb-2"
            placeholder="Project Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button className="btn btn-primary">
            Create Project
          </button>

        </form>

        <hr />

        <h3>Projects List</h3>

        {projects.map(project => (

          <div key={project.id} className="card-ui mb-2">

            <b>{project.name}</b>

            <p>{project.description}</p>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeProject(project.id)}
            >
              Delete
            </button>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Projects;