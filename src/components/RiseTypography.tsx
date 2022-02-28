import { Typography, TypographyProps } from "@mui/material";
import { motion, MotionProps } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const MotionTypograpghy = motion(Typography);

const RiseTypography = <PROPS extends Props & MotionProps & TypographyProps>({
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
            variants={{
              hidden: { y: "100%" },
              visible: {
                y: 0,
                transition: {
                  delay: i * 0.1,
                },
              },
            }}
            initial="hidden"
            animate="visible"
            viewport={{ once: true }}
          >
            {letter === " " && "\u00A0"}
            {letter}
          </MotionTypograpghy>
        </div>
      ))}
    </div>
  );
};

export default RiseTypography;
