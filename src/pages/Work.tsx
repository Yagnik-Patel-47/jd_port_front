import "swiper/css";
import "swiper/css/navigation";
import { useEffect } from "react";
import Nav from "../components/Nav";
import WipeBox from "../components/WipeBox";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import PopTypography from "../components/PopTypography";
import client from "../sanityClient";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setWorkData } from "../redux/workData";
import { SiBlender, SiUnrealengine, SiAdobeaftereffects } from "react-icons/si";
import LoadingScreen from "../components/LoadingScreen";
import { getWorkData } from "../utils/queries";

const MotionBox = motion(Box);
const MotionStack = motion(Stack);
const MotionSwiper = motion(Swiper);

interface Work {
  title: string;
  description: string[];
  media: { src: string; type: string }[];
  id: string;
  placeholder: null | string;
  tools: string[];
}

const stackContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2, delayChildren: 0.5 },
  },
};

const toolVariant = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  show: {
    y: 0,
    opacity: 1,
  },
};

const Work = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const workData = useAppSelector((store) => store.workData);
  const aboutData = useAppSelector((store) => store.about);
  const tools: any = {
    ue4: <SiUnrealengine />,
    blender: <SiBlender />,
    afterEffects: <SiAdobeaftereffects />,
  };

  useEffect(() => {
    if (workData.title === "") {
      client.fetch(getWorkData(id!)).then((data) => {
        dispatch(setWorkData(data));
      });
    }
  }, []);

  return (
    <>
      {workData.title === "" || aboutData.title === "" ? (
        <LoadingScreen />
      ) : (
        <>
          <Nav
            routes={[
              { to: "/", label: "Home", type: "route" },
              { to: "/about", label: "Contact", type: "route" },
            ]}
            animateExit={true}
          />
          <MotionBox
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            minHeight="100%"
            sx={{ py: 20, px: { lg: 15, xs: 5 } }}
          >
            <Stack alignItems="center" spacing={{ lg: 8, xs: 6 }}>
              <WipeBox>
                <Typography
                  fontSize={{ xs: "2rem", lg: "4rem", sm: "2.2rem" }}
                  fontWeight="700"
                  variant="h4"
                >
                  {workData.title}
                </Typography>
              </WipeBox>
              {workData.media.length === 1 ? (
                workData.media[0].type === "image" ? (
                  <motion.img
                    src={workData.media[0].src}
                    alt="work image"
                    layoutId={workData.id}
                    className="md:w-3/5 h-full object-cover mx-auto"
                  />
                ) : (
                  <motion.video
                    className="md:w-3/5 h-full object-cover mx-auto"
                    controls
                    src={workData.media[0].src}
                    poster={
                      workData.placeholder !== null ? workData.placeholder : ""
                    }
                    layoutId={workData.id}
                  ></motion.video>
                )
              ) : (
                <MotionSwiper
                  navigation={true}
                  modules={[Navigation]}
                  loop={true}
                  layoutId={workData.id}
                >
                  {workData.media.map((media, index) => (
                    <SwiperSlide key={index}>
                      {media.type === "image" ? (
                        <motion.img src={media.src} alt="work image" />
                      ) : (
                        <motion.video
                          controls
                          src={media.src}
                          poster={
                            workData.placeholder !== null
                              ? workData.placeholder
                              : ""
                          }
                        ></motion.video>
                      )}
                    </SwiperSlide>
                  ))}
                </MotionSwiper>
              )}
              <PopTypography
                fontSize={{ xs: "1.3rem", lg: "2rem" }}
                fontWeight="500"
                variant="h4"
              >
                Description
              </PopTypography>
              <MotionStack sx={{ px: { xs: 0, lg: 20 } }}>
                {workData.description.map((paragraph, index) => (
                  <WipeBox>
                    <Typography key={index}>
                      {paragraph.children.map((para, innerIndex) =>
                        para.marks.includes("strong") ? (
                          <strong key={innerIndex}>{para.text}</strong>
                        ) : (
                          para.text
                        )
                      )}
                    </Typography>
                  </WipeBox>
                ))}
              </MotionStack>
              <PopTypography
                fontSize={{ xs: "1.3rem", lg: "2rem" }}
                fontWeight="500"
                variant="h4"
              >
                Tools used for this project
              </PopTypography>
              <MotionStack
                justifyContent="space-around"
                alignItems="center"
                sx={{ width: "100%", flexWrap: "wrap" }}
                direction="row"
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                variants={stackContainer}
                initial="hidden"
                whileInView="show"
              >
                {workData.tools.map((tool, index) => (
                  <motion.div
                    variants={toolVariant}
                    transition={{ duration: 0.3 }}
                    key={index}
                    className="md:text-8xl text-5xl"
                  >
                    {tools[tool]}
                  </motion.div>
                ))}
              </MotionStack>
            </Stack>
          </MotionBox>
        </>
      )}
    </>
  );
};

export default Work;
