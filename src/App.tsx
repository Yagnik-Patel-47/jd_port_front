import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./hooks/reduxHooks";
import { AnimatePresence } from "framer-motion";
import Work from "./pages/Work";
import About from "./pages/About";
import { changeMode } from "./redux/theme";
import client from "./sanityClient";
import { getAboutData } from "./utils/queries";
import { setAboutData } from "./redux/about";

const App = () => {
  const { mode } = useAppSelector((store) => store.theme);
  const { title } = useAppSelector((store) => store.about);
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    mode === "dark"
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [mode]);

  useEffect(() => {
    const themeMode = localStorage.getItem("themeMode");
    if (themeMode === null) {
      localStorage.setItem("themeMode", mode);
    } else {
      dispatch(changeMode(themeMode as "dark" | "light"));
    }
  }, []);

  useEffect(() => {
    if (title === "") {
      client
        .fetch(getAboutData)
        .then((data) => {
          dispatch(setAboutData(data));
        })
        .catch((err) => console.log(err));
    }
  }, []);

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
