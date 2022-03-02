import { Typography, Box, Stack } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { MdArrowRightAlt } from "react-icons/md";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../sanityClient";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setWorkData } from "../../redux/workData";

interface Props {
  title: string;
  short_desc: string;
  src: string;
  index: number;
  id: string;
  mediaType: string;
  videoPlaceholder?: string;
}

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const WorkCard = ({
  title,
  short_desc,
  src,
  index,
  id,
  mediaType,
  videoPlaceholder,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const handleRedirect = () => {
    const query = `
      *[_type == "work" && id.current=="${id}"] {
        title,
        description[]{
          children[]{text, marks}
        },
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
      window.scrollTo(0, 0);
      navigate(`/work/${id}`, { state: "layoutAnimate" });
    });
  };

  return (
    <MotionBox
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      sx={{
        position: "relative",
        width: { lg: "80%", xs: "100%" },
        height: { lg: 480, xs: 290 },
        cursor: "pointer",
        color: "#fff",
      }}
      className={index % 2 === 0 ? "md:!mr-16" : "md:!ml-16"}
      onClick={handleRedirect}
      ref={rootRef}
    >
      {mediaType === "image" ? (
        <motion.img
          className="h-full w-full object-cover absolute top-0 left-0 filter brightness-[0.5] z-[-1]"
          src={src}
          alt="project image"
          layoutId={id}
        />
      ) : (
        <motion.video
          className="h-full w-full object-cover absolute top-0 left-0 filter brightness-[0.5] z-[-1]"
          src={src}
          muted
          poster={videoPlaceholder}
          layoutId={id}
        ></motion.video>
      )}

      <AnimatePresence>
        {isHovered && (
          <motion.div className="w-full h-full absolute top-0 left-0 overflow-hidden z-[-1]">
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
              className="bg-gradient-to-l to-[rgba(16,27,59,.9)] from-[#11396de6] opacity-[0.9]"
              transition={{ duration: 0.4, ease: [0.46, -0.04, 0.5, 1] }}
              initial={{ x: "-100%" }}
              exit={{ x: "-100%" }}
              animate={{ x: 0 }}
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <MotionBox
        sx={{
          display: "flex",
          p: { lg: 10, xs: 4 },
          alignItems: "flex-end",
          height: "100%",
        }}
        animate={
          isHovered
            ? { scale: 1.04, transition: { delay: 0.3, duration: 0.3 } }
            : { scale: 1 }
        }
        transition={{ duration: 0.3 }}
      >
        <Stack spacing={2}>
          <Typography
            fontSize={{ xs: "1.3rem", lg: "3rem" }}
            fontWeight="700"
            variant="h4"
          >
            {title}
          </Typography>
          <Typography fontSize={{ lg: "1.2rem", xs: "0.8rem" }}>
            {short_desc}
          </Typography>
          <button
            className="relative text-white py-2 px-6 w-fit rounded-sm md:text-lg font-medium tracking-widest flex justify-center items-center group select-none"
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            <span className="">Case Study</span>
            <MdArrowRightAlt
              fontSize="2rem"
              className=" absolute -right-4 top-1/2 transform -translate-y-1/2 group-hover:translate-x-2 transition duration-300"
            />
            <div className="absolute top-0 left-0 h-full w-full overflow-hidden rounded-sm z-[-1]">
              <div className="h-full w-full bg-gradient-to-r from-[#ef3636] to-[#f06449] before:bg-gradient-to-r before:from-[#101b3b] before:to-[#235aa6] before:h-full before:w-full before:left-0 before:top-0 absolute before:absolute before:transform before:-translate-x-full group-hover:before:translate-x-60 before:transition before:duration-700"></div>
            </div>
          </button>
        </Stack>
      </MotionBox>
      <AnimatePresence>
        {isHovered && (
          <MotionTypography
            fontSize="10rem"
            fontWeight="700"
            color="#aaa"
            sx={
              index % 2 === 0
                ? { position: "absolute", left: -50, top: 0 }
                : { position: "absolute", right: -50, top: 0 }
            }
            initial={{ y: -50, opacity: 0 }}
            exit={{ y: -50, opacity: 0 }}
            animate={{
              y: -80,
              opacity: 1,
              transition: { duration: 0.5, delay: 0.2 },
            }}
            transition={{ duration: 0.5 }}
          >
            0{index}
          </MotionTypography>
        )}
      </AnimatePresence>
      <motion.div className="w-full h-full absolute top-0 left-0 overflow-hidden">
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          className="bg-gradient-to-r from-[#101b3b] to-[#235aa6]"
          whileInView={{ x: "100%" }}
          transition={{ duration: 1, ease: [0.83, 0, 0.17, 1] }}
          viewport={{ once: true }}
        ></motion.div>
      </motion.div>
    </MotionBox>
  );
};

export default WorkCard;
