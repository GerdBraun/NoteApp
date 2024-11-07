import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_SERVER}/users`, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          password: formState.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            toast.error(`Error. ${data.error}`);
            return;
          }
          navigate("/login");
        })
        .catch((error) => toast.error(`Error fetching Data: ${error}`));
  }

  return (
    <form
      className="card text-black w-full max-w-xl mx-auto shadow-xl p-4 m-4"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl text-center text-blue-600">Sign up</h2>
      <div className="form-control mb-4">
        <label className="label">Name</label>
        <input
          name="name"
          type="text"
          placeholder="name"
          className="input input-bordered"
          required
          onChange={handleChange}
          value={formState.name}
        />
      </div>
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
        <button className="btn">Sign up</button>
      </div>
    </form>
  );
};

export default SignUp;
