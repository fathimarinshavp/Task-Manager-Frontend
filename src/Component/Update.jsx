import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
function Update() {
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "Pending",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getSingleTask = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setForm({
        title: res.data.title,
        description: res.data.description || "",
        status: res.data.status,
        dueDate: res.data.dueDate
          ? res.data.dueDate.slice(0, 10)
          : "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Failed to fetch task.");
    }
  };

  useEffect(() => {
    if (!token) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    getSingleTask();
  }, [id]);

  const updateTask = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Updated Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(
        error.response?.data?.msg || "Failed to update task."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "60px auto",
        padding: "25px",
        background: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        fontFamily: "Arial",
      }}
    >
     <button
  onClick={() => navigate("/dashboard")}
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    background: "transparent",
    color: "#71a070",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "20px",
  }}
>
  <FaArrowLeft />
  
</button>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        Update Task
      </h2>

      <form onSubmit={updateTask}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={form.title}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={form.description}
          onChange={handleChange}
          rows="4"
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            resize: "none",
            boxSizing: "border-box",
          }}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxSizing: "border-box",
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
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            boxSizing: "border-box",
          }}
        />

  <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#888" : "#71a070",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
          }}
        >
          {loading ? "Updating..." : "Update Task"}
        </button>
      </form>
      
    </div>
  );
}

export default Update;