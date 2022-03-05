import { Stack, Box, useMediaQuery, IconButton } from "@mui/material";
import { AiOutlineMenu } from "react-icons/ai";
import { VscClose } from "react-icons/vsc";
import { useState } from "react";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { FiInstagram } from "react-icons/fi";
import { changeMode } from "../redux/theme";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

type NavRoute = {
  to: string;
  type: "route" | "anchor";
  label: string;
};

interface Props {
  routes: NavRoute[];
  animateExit: boolean;
}

const Nav = ({ routes, animateExit }: Props) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [navOpen, setNavOpen] = useState(false);
  const { mode } = useAppSelector((store) => store.theme);
  const { logo } = useAppSelector((store) => store.about);
  const dispatch = useAppDispatch();

  return (
    <>
      <MotionBox
        component="nav"
        sx={{
          py: 2,
          px: { xs: 3, lg: 20 },
          zIndex: 5,
          position: "absolute",
          top: 0,
          width: "100%",
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={animateExit ? { opacity: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <img src={logo} className="w-auto h-12" alt="logo" />
          {!isMobile && (
            <Stack direction="row" alignItems="center" spacing={5}>
              {routes.map((route, index) =>
                route.type === "route" ? (
                  <Link
                    to={route.to}
                    className="text-lg font-bold dark:hover:text-white dark:text-slate-300 text-slate-700 hover:text-black"
                    key={index}
                  >
                    {route.label}
                  </Link>
                ) : (
                  <a
                    className="text-lg font-bold dark:hover:text-white dark:text-slate-300 text-slate-700 hover:text-black"
                    href={route.to}
                    key={index}
                  >
                    {route.label}
                  </a>
                )
              )}
              {mode === "dark" ? (
                <IconButton
                  onClick={() => {
                    dispatch(changeMode("light"));
                    localStorage.setItem("themeMode", "light");
                  }}
                >
                  <MdLightMode />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    dispatch(changeMode("dark"));
                    localStorage.setItem("themeMode", "dark");
                  }}
                >
                  <MdDarkMode />
                </IconButton>
              )}
            </Stack>
          )}
          {isMobile && (
            <Stack direction="row" spacing={2}>
              {mode === "dark" ? (
                <IconButton onClick={() => dispatch(changeMode("light"))}>
                  <MdLightMode />
                </IconButton>
              ) : (
                <IconButton onClick={() => dispatch(changeMode("dark"))}>
                  <MdDarkMode />
                </IconButton>
              )}
              <IconButton onClick={() => setNavOpen(true)}>
                <AiOutlineMenu fontSize="2rem" />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </MotionBox>
      <AnimatePresence>
        {isMobile && navOpen && (
          <motion.div
            initial={{ x: "100%" }}
            exit={{
              x: "100%",
              transition: {
                delay: 0.1,
                duration: 0.8,
                ease: [0.83, 0, 0.17, 1],
              },
            }}
            animate={{
              x: 0,
              transition: { duration: 0.8, ease: [0.83, 0, 0.17, 1] },
            }}
            transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
            className="fixed top-0 h-full w-full bg-gradient-to-r from-[#ef3636] to-[#f06449] z-[11]"
          ></motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isMobile && navOpen && (
          <motion.div
            className="fixed py-8 top-0 h-full w-full bg-gradient-to-r from-[#101b3b] to-[#235aa6] flex-col flex justify-between px-8 0 space-y-12 z-[11]"
            initial={{ x: "100%" }}
            exit={{ x: "100%" }}
            animate={{
              x: 0,
              transition: {
                delay: 0.1,
                duration: 0.8,
                ease: [0.83, 0, 0.17, 1],
              },
            }}
            transition={{ duration: 0.8, ease: [0.83, 0, 0.17, 1] }}
          >
            <div className="flex justify-between items-center w-full">
              <div></div>
              <IconButton onClick={() => setNavOpen(false)}>
                <VscClose fontSize="2rem" />
              </IconButton>
            </div>
            <Stack spacing={4}>
              <ul className="flex flex-col px-12 w-full space-y-7 font-bold text-3xl">
                {routes.map((route, index) =>
                  route.type === "route" ? (
                    <li onClick={() => setNavOpen(false)} key={index}>
                      <Link to={route.to}>{route.label}</Link>
                    </li>
                  ) : (
                    <li onClick={() => setNavOpen(false)} key={index}>
                      <a href={route.to}>{route.label}</a>
                    </li>
                  )
                )}
              </ul>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ px: 5 }}>
              <IconButton>
                <BsTwitter fontSize="2rem" />
              </IconButton>
              <IconButton>
                <FiInstagram fontSize="2rem" />
              </IconButton>
              <IconButton>
                <BsGithub fontSize="2rem" />
              </IconButton>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
