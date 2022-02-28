import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  media: { src: string; type: string }[];
  placeholder: string;
}

const variants = {
  enter: ({ direction }: { direction: number }) => {
    return {
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
  center: ({
    index,
    page,
    direction,
  }: {
    index: number;
    direction: number;
    page: number;
  }) => {
    if (index === page) {
      return {
        x: 0,
        opacity: 1,
      };
    } else {
      return {
        opacity: 0,
        x: direction === 1 || 0 ? "-100%" : "100%",
      };
    }
  },
  exit: ({ direction }: { direction: number }) => {
    return {
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const MediaSwiper = ({ media, placeholder }: Props) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const paginate = (newDirection: number) => {
    if (page === media.length - 1 && newDirection === 1) {
      setPage([0, newDirection]);
      return;
    } else if (page === 0 && newDirection === -1) {
      setPage([media.length - 1, newDirection]);
      return;
    }
    setPage([page + newDirection, newDirection]);
  };

  return (
    <motion.div className="relative md:w-[70%] flex overflow-hidden">
      {media.map((asset, index) =>
        asset.type === "image" ? (
          <motion.img
            key={index}
            src={asset.src}
            custom={{ direction, page, index }}
            variants={variants}
            animate="center"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="w-full"
          />
        ) : (
          <motion.video
            key={page}
            src={media[page].src}
            placeholder={placeholder}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full"
          ></motion.video>
        )
      )}
    </motion.div>
  );
};

export default MediaSwiper;
