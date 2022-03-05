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
  let letters = children?.toString().split("");
  return (
    <div className="flex">
      {letters!.map((letter, i) => (
        <div key={i} style={{ display: "inline-block", overflow: "hidden" }}>
          <MotionTypograpghy
            {...rest}
            sx={{ display: "inline-block", willChange: "transform" }}
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{
              delay: i * 0.05,
              stiffness: 250,
              damping: 7,
              type: "spring",
              bounce: 1,
              mass: 0.5,
            }}
            viewport={{ once: true }}
          >
            {letter === " " && "\u00A0"}
            {letter !== " " && letter}
          </MotionTypograpghy>
        </div>
      ))}
    </div>
  );
};

export default PopTypography;
