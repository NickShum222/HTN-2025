import { Auth, Dashboard } from "./pages";
import { Navbar } from "./components";
import { motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import Lenis from "lenis";
import { useEffect } from "react";

function App() {
    useEffect(() => {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }, []);
  return (
    <Router>
      {/* AuthProvider passes the user login state to prevent prop drilling */}
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/sign-up" element={<Auth />} />
          <Route path="/" element={<Dashboard />} />
          {/* Any other path that is not listed above, gets redirected to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        {/* Design Gradients for Background */}
        <motion.div
          className="z-0 bg-[#EC72EE] opacity-20 blur-[1000px] w-[100vw] h-[100vh] fixed -right-1/3 -bottom-1/4 rounded-full"
          animate={{ rotate: 360, scale: 0.8 }}
          transition={{ duration: 60, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.div
          className="z-0 bg-[#00E0FF] opacity-20 blur-[1000px] w-[100vw] h-[100vh] fixed -left-1/3 -top-1/3 rounded-full"
          animate={{ rotate: -360, scale: 0.7 }}
          transition={{ duration: 60, repeat: Infinity, repeatType: "reverse" }}
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
