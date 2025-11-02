import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please enter both username and password");
      return;
    }

    // Get existing users or empty array
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Check if username already exists
    const exists = users.find((u) => u.username === username);
    if (exists) {
      alert("Username already exists. Please choose another one.");
      return;
    }

    // Save new user
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully! You can now log in.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-900 to-black text-white">
      <h1 className="text-4xl font-bold mb-6">Create Account 🌱</h1>

      <form
        onSubmit={handleSignup}
        className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-xl w-80"
      >
        <label className="block text-sm mb-2 text-green-300">Username</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
        />

        <label className="block text-sm mb-2 mt-4 text-green-300">Password</label>
        <input
          type="password"
          className="w-full p-2 rounded bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />

        <button
          type="submit"
          className="mt-4 w-full bg-green-600 hover:bg-green-700 p-2 rounded-lg text-white font-semibold transition"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-4 text-green-300">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-green-400 cursor-pointer hover:underline"
        >
          Log in
        </span>
      </p>
    </div>
  );
}
