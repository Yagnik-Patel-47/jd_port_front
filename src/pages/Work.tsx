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
import RiseTypography from "../components/RiseTypography";
import client from "../sanityClient";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { setWorkData } from "../redux/workData";
import { SiBlender, SiUnrealengine, SiAdobeaftereffects } from "react-icons/si";
import LoadingScreen from "../components/LoadingScreen";

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
    transition: { staggerChildren: 0.3, delayChildren: 0.5 },
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
  const tools: any = {
    ue4: <SiUnrealengine />,
    blender: <SiBlender />,
    afterEffects: <SiAdobeaftereffects />,
  };

  useEffect(() => {
    if (workData.title === "") {
      const query = `
        *[_type == "work" && id.current=="${id}"] {
          title,
          "description": description[].children[].text,
          "placeholder": placeholder.asset->url,
          tools,
          "media": media[]{
            _type=="videoType" => {
              "src": video.asset->url,
              type
            },
            _type=="imageType" => {
              "src": image.asset->url,
              type
            }
          },
          "id": id.current,
        }[0]
      `;
      client.fetch(query).then((data) => {
        dispatch(setWorkData(data));
      });
    }
  }, []);

  return (
    <>
      {workData.title === "" ? (
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
                    layoutId={
                      location.state === "layoutAnimate" ? workData.id : ""
                    }
                    className="md:w-3/5 h-full object-cover mx-auto"
                    initial={
                      location.state === "layoutAnimate"
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    animate={
                      location.state === "layoutAnimate" ? {} : { opacity: 1 }
                    }
                    transition={
                      location.state === "layoutAnimate" ? {} : { duration: 1 }
                    }
                  />
                ) : (
                  <motion.video
                    className="md:w-3/5 h-full object-cover mx-auto"
                    controls
                    src={workData.media[0].src}
                    poster={
                      workData.placeholder !== null ? workData.placeholder : ""
                    }
                    layoutId={
                      location.state === "layoutAnimate" ? workData.id : ""
                    }
                    initial={
                      location.state === "layoutAnimate"
                        ? { opacity: 1 }
                        : { opacity: 0 }
                    }
                    animate={
                      location.state === "layoutAnimate" ? {} : { opacity: 1 }
                    }
                    transition={
                      location.state === "layoutAnimate" ? {} : { duration: 1 }
                    }
                  ></motion.video>
                )
              ) : (
                <MotionSwiper
                  navigation={true}
                  modules={[Navigation]}
                  loop={true}
                  initial={
                    location.state === "layoutAnimate" ? {} : { opacity: 0 }
                  }
                  animate={
                    location.state === "layoutAnimate" ? {} : { opacity: 1 }
                  }
                  transition={
                    location.state === "layoutAnimate" ? {} : { duration: 1 }
                  }
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
              <RiseTypography
                fontSize={{ xs: "1.3rem", lg: "2rem" }}
                fontWeight="500"
                variant="h4"
              >
                Description
              </RiseTypography>
              <MotionStack sx={{ px: { xs: 0, lg: 20 } }}>
                {workData.description.map((description, index) => (
                  <Typography key={index}>{description}</Typography>
                ))}
              </MotionStack>
              <RiseTypography
                fontSize={{ xs: "1.3rem", lg: "2rem" }}
                fontWeight="500"
                variant="h4"
              >
                Tools used for this project
              </RiseTypography>
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
