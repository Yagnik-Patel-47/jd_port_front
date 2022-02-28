import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useAppSelector } from "./hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import Work from "./pages/Work";
import About from "./pages/About";

const App = () => {
  const { mode } = useAppSelector((store) => store.theme);
  const location = useLocation();

  useEffect(() => {
    mode === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [mode]);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:id" element={<Work />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
