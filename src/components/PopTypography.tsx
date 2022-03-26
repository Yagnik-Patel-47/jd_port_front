import { Typography, TypographyProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MotionTypograpghy = motion(Typography);

const PopTypography = <PROPS extends Props & MotionProps & TypographyProps>({
  children,
  ...rest
}: PROPS) => {
  const words = children?.toString().split(" ");
  return (
    <div className="flex flex-wrap space-x-1">
      {words?.map((word, wordIndex) => (
        <div key={wordIndex} className="flex">
          {word.split("").map((letter, index) => (
            <div
              key={index}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              <MotionTypograpghy
                {...rest}
                sx={{ display: "inline-block", willChange: "transform" }}
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  delay: index * 0.05,
                  stiffness: 250,
                  damping: 7,
                  bounce: 1,
                  type: "spring",
                  mass: 2,
                }}
                viewport={{ once: true }}
              >
                {letter}
              </MotionTypograpghy>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PopTypography;
