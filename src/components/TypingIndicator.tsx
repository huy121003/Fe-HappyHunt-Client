import { Typography } from "antd";
import { motion } from "framer-motion";

const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={`flex justify-center w-[10%]   l text-lg font-bold `}
    >
      <Typography.Text
        className={`justify-center
          rounded-full flex items-center gap-1 text-sm`}
      >
        <motion.span
          className="text-4xl"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.2,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="text-4xl"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.4,
          }}
        >
          .
        </motion.span>
        <motion.span
          className="text-4xl"
          animate={{
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.6,
          }}
        >
          .
        </motion.span>
      </Typography.Text>
    </motion.div>
  );
};

export default TypingIndicator;
