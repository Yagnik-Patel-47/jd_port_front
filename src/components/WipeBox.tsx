import { motion } from "framer-motion";
import { Box } from "@mui/material";
import { ReactNode } from "react";

const MotionBox = motion(Box);

interface Props {
  children: ReactNode;
}

const WipeBox = ({ children }: Props) => {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      sx={{ position: "relative", overflow: "hidden", width: "fit-content" }}
      viewport={{ once: true }}
    >
      <motion.div
        initial={{ x: 0 }}
        whileInView={{ x: "101%" }}
        transition={{
          duration: 1,
          ease: [0.83, 0, 0.17, 1],
          delay: 0.8,
        }}
        viewport={{ once: true }}
        className="dark:bg-white bg-slate-900 top-0 left-0 absolute h-full w-full"
      ></motion.div>
      {children}
    </MotionBox>
  );
};

export default WipeBox;
