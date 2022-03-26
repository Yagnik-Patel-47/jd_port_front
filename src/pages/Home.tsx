import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Nav from "../components/Nav";
import SvgPlayground from "../components/home/SvgPlayground";
import WorkSection from "../components/home/WorkSection";
import PopTypography from "../components/PopTypography";
import WipeBox from "../components/WipeBox";
import { FiInstagram } from "react-icons/fi";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { FiArrowUpRight } from "react-icons/fi";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import LoadingScreen from "../components/LoadingScreen";

const MotionStack = motion(Stack);
const MotionIconButton = motion(IconButton);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
  },
};
const icon = {
  hidden: { x: "100%", opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
  },
};

const Home = () => {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const navigate = useNavigate();
  const { title } = useAppSelector((store) => store.about);
  return (
    <>
      {title === "" && <LoadingScreen />}
      <Nav
        routes={[
          { to: "#work", label: "Case Studies", type: "anchor" },
          { to: "/about", label: "Contact", type: "route" },
        ]}
        animateExit={false}
      />
      <section className="flex flex-col transition duration-500 h-full bg-[#ECECEC] dark:bg-[#1c1d25]">
        <SvgPlayground />
        <Box
          sx={{
            px: { xs: 3, lg: 30 },
            display: "flex",
            alignItems: "center",
            flex: "1",
            justifyContent: {
              xs: "center",
              lg: "flex-start",
            },
            zIndex: 2,
          }}
        >
          <Stack spacing={{ xs: 4, lg: 6 }}>
            <Stack spacing={2}>
              <WipeBox>
                <Typography
                  fontSize={{ xs: "3rem", lg: "6rem" }}
                  fontWeight="700"
                  variant="h1"
                >
                  Jaydeep Patel
                </Typography>
              </WipeBox>
              <PopTypography
                fontSize={{ xs: "1.25rem", lg: "1.4rem" }}
                variant="subtitle1"
              >
                {title}
              </PopTypography>
            </Stack>
            <motion.button
              className="relative text-white py-2 px-6 w-fit rounded-sm text-lg font-medium tracking-widest flex justify-center items-center group select-none origin-left"
              style={{ WebkitTapHighlightColor: "transparent" }}
              initial={{ x: -10, opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, x: 0, scaleX: 1 }}
              transition={{
                ease: [0.83, 0, 0.17, 1],
                duration: 0.6,
                delay: 0.5,
              }}
              onClick={() => navigate("/about")}
            >
              <span className="z-[2]">About Me</span>
              <FiArrowUpRight
                fontSize="2rem"
                className="z-[2] absolute -right-4 top-1/2 transform -translate-y-1/2 group-hover:translate-x-2 transition duration-300 text-slate-900 dark:text-white group-hover:-translate-y-full"
              />
              <div className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-sm">
                <div className="h-full w-full bg-gradient-to-r from-[#DA1212] to-[#FF1818] before:bg-[#5463FF]/90 before:h-full before:w-full before:left-0 before:top-0 absolute before:absolute before:transform before:-translate-x-full group-hover:before:translate-x-0 before:transition before:duration-700 after:bg-[#235aa6]/80 after:h-full after:w-full after:left-0 after:top-0 after:absolute after:transform after:translate-x-full group-hover:after:translate-x-0 after:transition after:duration-700"></div>
              </div>
            </motion.button>
          </Stack>
        </Box>
        {!isMobile && (
          <MotionStack
            sx={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: 0,
              p: 3,
              zIndex: 2,
              overflow: "hidden",
            }}
            spacing={2}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <MotionIconButton variants={icon}>
              <BsTwitter />
            </MotionIconButton>
            <MotionIconButton variants={icon}>
              <FiInstagram />
            </MotionIconButton>
            <MotionIconButton variants={icon}>
              <BsGithub />
            </MotionIconButton>
          </MotionStack>
        )}
      </section>
      <WorkSection />
    </>
  );
};

export default Home;
