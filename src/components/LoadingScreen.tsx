import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div className="fixed inset-0 bg-[#DA1212] flex justify-center items-center z-[10] flex-col space-y-4">
      <motion.div
        animate={{ scaleX: ["0%", "100%", "0%"] }}
        transition={{
          repeatType: "loop",
          repeat: Infinity,
          duration: 1,
          delay: 0.33,
        }}
        className="bg-white w-28 h-6"
      ></motion.div>
      <motion.div
        animate={{ scaleX: ["0%", "100%", "0%"] }}
        transition={{
          repeatType: "loop",
          repeat: Infinity,
          duration: 1,
        }}
        className="bg-white w-28 h-6"
      ></motion.div>
      <motion.div
        animate={{ scaleX: ["0%", "100%", "0%"] }}
        transition={{
          repeatType: "loop",
          repeat: Infinity,
          delay: 0.66,
          duration: 1,
        }}
        className="bg-white w-28 h-6"
      ></motion.div>
    </motion.div>
  );
};

export default LoadingScreen;
