import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useNotes } from "../../context/notesContext";
import { toast } from "react-toastify";

const LogIn = () => {
  const { notesState, notesDispatch } = useNotes();
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formState.email,
        password: formState.password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          toast.error(`Error: "${data.error}"`);
          return;
        }
        localStorage.setItem("userdata", JSON.stringify(data));

        notesDispatch({ type: "USER_LOGGED_IN", payload: data });
        toast.success(`Welcome back!`);
        navigate("/");
      })
      .catch((error) => console.error("Error fetching event details:", error));
  };

  return (
    <form
      className="card text-black w-full max-w-xl mx-auto shadow-xl p-4 m-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-center text-blue-600">Log In</h2>
      <div className="form-control mb-4">
        <label className="label">Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="input input-bordered"
          required
          onChange={handleChange}
          value={formState.email}
        />
      </div>
      <div className="form-control mb-4">
        <label className="label">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="input input-bordered"
          required
          onChange={handleChange}
          value={formState.password}
        />
      </div>
      <div className="form-control mt-4">
        <button className="btn">Log In</button>
      </div>
      <div className="flex text-center">
        <p className=" text-white">
          Don&apos;t have an account?&nbsp;
          <Link to="/signup" className="link-hover">
            Sign up now!
          </Link>
        </p>
      </div>
    </form>
  );
};

export default LogIn;
