import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

import {
  FaHome,
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 5;

  // Get all tasks
  const getTasks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // Delete a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Task Deleted");
      getTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Filter tasks
  let filteredTasks = tasks;

  if (filter !== "All") {
    filteredTasks = filteredTasks.filter((task) => {
      return task.status === filter;
    });
  }

  // Search tasks
  if (search !== "") {
    filteredTasks = filteredTasks.filter((task) => {
      return task.title.toLowerCase().includes(search.toLowerCase());
    });
  }

  // Count tasks
  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter((task) => {
    return task.status === "Pending";
  }).length;

  const completedTasks = tasks.filter((task) => {
    return task.status === "Completed";
  }).length;

  // Calculate progress
  let progress = 0;
  if (totalTasks > 0) {
    progress = Math.round((completedTasks / totalTasks) * 100);
  }

  // Pagination
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const start = (currentPage - 1) * tasksPerPage;
  const end = start + tasksPerPage;
  const currentTasks = filteredTasks.slice(start, end);

  return (
    <div className={dark ? "dashboard dark" : "dashboard"}>

      {/* Dark overlay - shows when sidebar is open on mobile */}
      {sidebarOpen && (
        <div className="overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Mobile Top Bar - only visible on phones */}
      <div className="mobile-topbar">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <span className="brand">Task Manager</span>
        <button className="top-btn" onClick={() => setDark(!dark)}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* Sidebar - drawer on mobile, fixed on desktop */}
      <div className={sidebarOpen ? "sidebar open" : "sidebar"}>

        <h2>Task Manager</h2>

        <button className="menu active" onClick={() => setSidebarOpen(false)}>
          <FaHome /> Dashboard
        </button>

        <button
          className="menu"
          onClick={() => {
            navigate("/addtask");
            setSidebarOpen(false);
          }}
        >
          <FaPlus /> Add Task
        </button>

        <button className="menu logout" onClick={logout}>
          <FaSignOutAlt /> Logout
        </button>

        <button
          className="menu"
          onClick={() => {
            setDark(!dark);
            setSidebarOpen(false);
          }}
        >
          {dark ? (
            <>
              <FaSun /> Light Mode
            </>
          ) : (
            <>
              <FaMoon /> Dark Mode
            </>
          )}
        </button>

      </div>

      {/* Main Content */}
      <div className="content">

        <h1>Dashboard</h1>
        <p>Welcome Back 👋</p>

        {/* Stats Cards */}
        <div className="stats">

          <div className="card">
            <h3>{totalTasks}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="card">
            <h3>{pendingTasks}</h3>
            <p>Pending</p>
          </div>

          <div className="card">
            <h3>{completedTasks}</h3>
            <p>Completed</p>
          </div>

          <div className="card">
            <h3>{progress}%</h3>
            <p>Progress</p>
            <div className="progressBar">
              <div
                className="progressFill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

        </div>

        {/* Search and Add Task */}
        <div className="searchSection">

          <div className="searchBox">
            <FaSearch />
            <input
              type="text"
              placeholder="Search Task..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <button
            className="addTaskBtn"
            onClick={() => navigate("/addtask")}
          >
            <FaPlus /> Add Task
          </button>

        </div>

        {/* Filter Buttons */}
        <div className="filterButtons">

          <button
            onClick={() => {
              setFilter("All");
              setCurrentPage(1);
            }}
          >
            All
          </button>

          <button
            onClick={() => {
              setFilter("Pending");
              setCurrentPage(1);
            }}
          >
            Pending
          </button>

          <button
            onClick={() => {
              setFilter("Completed");
              setCurrentPage(1);
            }}
          >
            Completed
          </button>

        </div>

        {/* Task List */}
        {currentTasks.length === 0 ? (
          <h3>No Tasks Found</h3>
        ) : (
          currentTasks.map((task) => (
            <div className="taskCard" key={task._id}>

              <div className="taskInfo">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
              </div>

              <div className="taskStatus">
                <span
                  className={
                    task.status === "Completed" ? "completed" : "pending"
                  }
                >
                  {task.status}
                </span>
                <p className="dueDate">
                  Due: {task.dueDate ? task.dueDate.slice(0, 10) : "No Date"}
                </p>
              </div>

              <div className="taskButtons">
                <button
                  className="editBtn"
                  onClick={() => navigate(`/updatetask/${task._id}`)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTask(task._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>

            </div>
          ))
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span>
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;