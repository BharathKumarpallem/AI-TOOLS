import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import hubLogo from "../assets/HUB.jpg";

interface User {
  username: string;
  password: string;
}

const Login = ({ onLogin }: { onLogin: (user: string) => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
    setUsers(savedUsers);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      const userObj = { username: user.username };
      localStorage.setItem("user", JSON.stringify(userObj));
      onLogin(user.username); // tell App we're logged in
      navigate("/student"); // ✅ use react-router navigation
    } else {
      alert("Invalid username or password!");
    }
  };

  const handleSignup = () => {
    if (username && password) {
      const exists = users.find((u) => u.username === username);
      if (exists) {
        alert("Username already exists!");
        return;
      }
      const updatedUsers = [...users, { username, password }];
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      alert("Account created successfully! You can now log in.");
    } else {
      alert("Enter both username and password!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-900 to-black flex flex-col items-center justify-center text-white">
      <img
        src={hubLogo}
        alt="AI Nexus Hub Logo"
        className="w-24 h-24 rounded-full mb-6 shadow-2xl border-4 border-green-400"
      />
      <h1 className="text-3xl font-bold mb-6">Login / Create Account</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-80"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 rounded py-2 font-semibold"
        >
          Login
        </button>

        <button
          type="button"
          className="w-full mt-2 bg-blue-500 hover:bg-blue-600 rounded py-2 font-semibold"
          onClick={handleSignup}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default Login;
