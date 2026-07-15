import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function AddTask() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = async (e) => {
    e.preventDefault();

      const token = localStorage.getItem(
      "token"
    );

    await axios.post(
      `${import.meta.env.VITE_API_URL}/api/tasks`,form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Task Added");

    navigate("/dashboard");
  };

return (
  
       <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f4f6f8",
      fontFamily: "Arial",
    }}
  >
    <div
  style={{
    position: "absolute",
    top: "30px",
    left: "30px",
  }}
>
  <button
    onClick={() => navigate("/dashboard")}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "10px 18px",
      border: "none",
      borderRadius: "8px",
      background: "#71a070",
      color: "#fff",
      cursor: "pointer",
      fontSize: "15px",
      fontWeight: "600",
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      transition: "0.3s",
    }}
  >
    <FaArrowLeft />
    
  </button>
</div>
    <div
      style={{
        width: "380px",
        padding: "25px",
        borderRadius: "12px",
        background: "#fff",
        boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Add Task
      </h2>

      <form onSubmit={addTask}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
          }}
        />

 <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            resize: "none",
          }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
            background: "#fff",
          }}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

   <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "18px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            outline: "none",
          }}
        />

 <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            background: "linear-gradient(#71a070)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) =>
            (e.target.style.opacity = 0.9)
          }
          onMouseOut={(e) =>
            (e.target.style.opacity = 1)
          }
        >
          Save Task
        </button>
      </form>
    </div>
  </div>
);
}

export default AddTask;