import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Stack, useMediaQuery } from "@mui/material";
import { useAppSelector } from "../../hooks/reduxHooks";

const MotionStack = motion(Stack);

const SvgObject = ({ isEven }: { isEven: boolean }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isMounted, setIsMounted] = useState(false);
  const mouseMoveX = useMotionValue(0);
  const mouseMoveY = useMotionValue(0);
  const rotate = useTransform(mouseMoveX, [-50, 0, 50], [-30, 0, 30]);
  const negetiveY = useTransform(mouseMoveY, (l) => l * -1);
  const negetiveX = useTransform(mouseMoveX, (l) => l * -1);
  const { mode } = useAppSelector((store) => store.theme);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted) {
      if (!isMobile)
        window.addEventListener("mousemove", (e) => {
          mouseMoveX.set((e.clientX / window.innerWidth - 0.5) * 100);
          mouseMoveY.set(-(e.clientY / window.innerHeight - 0.5) * 100);
        });
    }
  }, [isMounted]);
  return (
    <>
      {isMounted && (
        <MotionStack
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          style={{ x: isEven ? negetiveX : mouseMoveX, transition: "0.1s" }}
          transition={{
            opacity: { delay: 0.6, duration: 1 },
          }}
          justifyContent={{ xs: "space-around", md: "space-evenly" }}
          direction="row"
          alignItems="center"
        >
          {Array.from({ length: isMobile ? 3 : 4 }).map((_num, svgIndex) => (
            <motion.svg
              style={{
                y: isEven
                  ? svgIndex % 2 !== 0
                    ? negetiveY
                    : mouseMoveY
                  : svgIndex % 2 !== 0
                  ? mouseMoveY
                  : negetiveY,
                rotate,
                transition: "0.1s",
              }}
              key={svgIndex}
              height="32"
              stroke={mode === "dark" ? "#aaa" : "#333"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19" />
              <line x1="5" x2="19" y1="12" y2="12" />
            </motion.svg>
          ))}
        </MotionStack>
      )}
    </>
  );
};

export default SvgObject;
