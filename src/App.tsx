import hubLogo from "./assets/HUB.jpg";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import {
  BookOpen,
  Heart,
  Sprout,
  Wallet,
  Eye,
  Leaf,
  Cpu,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import StudentMode from "./screens/StudentMode";
import HealthMode from "./screens/HealthMode";
import FarmerMode from "./screens/FarmerMode";
import FinanceMode from "./screens/FinanceMode";
import AccessibilityMode from "./screens/AccessibilityMode";
import EnvironmentMode from "./screens/EnvironmentMode";
import TechnologyMode from "./screens/TechnologyMode";
import Login from "./screens/Login";

// -------------------- 🧭 NAVIGATION BAR --------------------
function Navigation() {
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("user") || "null");

  const modes = [
    { name: "Student", path: "/student", icon: BookOpen, color: "bg-blue-500" },
    { name: "Health", path: "/health", icon: Heart, color: "bg-red-500" },
    { name: "Farmer", path: "/farmer", icon: Sprout, color: "bg-green-500" },
    { name: "Finance", path: "/finance", icon: Wallet, color: "bg-yellow-500" },
    { name: "Accessibility", path: "/accessibility", icon: Eye, color: "bg-gray-500" },
    { name: "Environment", path: "/environment", icon: Leaf, color: "bg-emerald-600" },
    { name: "Technology", path: "/technology", icon: Cpu, color: "bg-purple-600" },
  ];

  return (
    <nav className="bg-black shadow-lg z-50 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* ✅ Logo + App name */}
          <div className="flex items-center gap-3">
            <img
              src={hubLogo}
              alt="AI Nexus Hub Logo"
              className="w-10 h-10 rounded-full border-2 border-green-500 shadow-md"
            />
            <h1 className="text-2xl font-bold text-green-400">
              NEXUS HUB ⚡
            </h1>
            {currentUser && (
              <span className="text-gray-300 font-medium ml-2">
                👋 Welcome,{" "}
                <span className="font-semibold text-green-400">
                  {currentUser.username}
                </span>
              </span>
            )}
          </div>

          <div className="flex space-x-2">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isActive = location.pathname === mode.path;
              return (
                <motion.div
                  key={mode.path}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={mode.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive
                        ? `${mode.color} text-white shadow-lg`
                        : "bg-gray-900 text-green-400 hover:bg-green-800"
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{mode.name}</span>
                  </Link>
                </motion.div>
              );
            })}

            {/* Logout Button */}
            {currentUser && (
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.href = "/login";
                }}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

// -------------------- 🌈 PAGE WRAPPER WITH ANIMATION --------------------
function AnimatedPage({
  children,
  colorScheme,
}: {
  children: React.ReactNode;
  colorScheme: string;
}) {
  return (
    <motion.div
      className={`min-h-screen ${colorScheme} relative overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0 bg-white/10 mix-blend-overlay"
        animate={{
          opacity: [0, 0.3, 0],
          transition: { duration: 2, repeat: Infinity },
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8 relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

// -------------------- 🔁 ANIMATED ROUTES --------------------
function AnimatedRoutes() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user && location.pathname !== "/login") {
    return <Navigate to="/login" />;
  }

  const colorSchemes: Record<string, string> = {
    "/student": "bg-gradient-to-br from-blue-950 via-blue-900 to-black",
    "/health": "bg-gradient-to-br from-red-950 via-red-900 to-black",
    "/farmer": "bg-gradient-to-br from-green-950 via-green-900 to-black",
    "/finance": "bg-gradient-to-br from-yellow-950 via-yellow-800 to-black",
    "/accessibility": "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    "/environment": "bg-gradient-to-br from-emerald-950 via-emerald-900 to-black",
    "/technology": "bg-gradient-to-br from-purple-950 via-purple-900 to-black",
  };

  const bgColor =
    colorSchemes[location.pathname] ||
    "bg-gradient-to-b from-green-950 via-green-900 to-black";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<Login onLogin={() => {}} />} />
        <Route
          path="/student"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <StudentMode />
            </AnimatedPage>
          }
        />
        <Route
          path="/health"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <HealthMode />
            </AnimatedPage>
          }
        />
        <Route
          path="/farmer"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <FarmerMode />
            </AnimatedPage>
          }
        />
        <Route
          path="/finance"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <FinanceMode />
            </AnimatedPage>
          }
        />
        <Route
          path="/accessibility"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <AccessibilityMode />
            </AnimatedPage>
          }
        />
        <Route
          path="/environment"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <EnvironmentMode />
            </AnimatedPage>
          }
        />
        <Route
          path="/technology"
          element={
            <AnimatedPage colorScheme={bgColor}>
              <TechnologyMode />
            </AnimatedPage>
          }
        />
        <Route path="/" element={<Navigate to="/student" />} />
      </Routes>
    </AnimatePresence>
  );
}

// -------------------- ⚡ MAIN APP COMPONENT --------------------
export default function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <Navigation />
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
