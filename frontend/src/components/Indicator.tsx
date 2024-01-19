import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { bobAnimation, innerCircleAnimation } from "../animations";

type IndicatorProps = {
  isTyping: boolean;
};

const Indicator = ({ isTyping }: IndicatorProps) => {
  return (
    <motion.div
      // style={styles.bobbingDivContainer}
      className="ml-10vw relative mb-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md"
      variants={bobAnimation}
      initial="animate"
      animate={isTyping ? "typing" : "idle"}
    >
      <motion.div
        // style={styles.innerCircle}
        className="bg-leetdarkorange h-4 w-4 rounded-full shadow-inner"
        variants={innerCircleAnimation}
        initial="animate"
        animate={isTyping ? "typing" : "idle"}
      >
        {/* <div style={styles.highlightLarge} /> */}
        <div className="shadow-xs -translate-x+1 absolute left-1/3 top-1/3 h-1 w-1 -translate-y-1 transform rounded-full bg-white opacity-75" />
        {/* <div className="shadow-xs -translate-x+2 -translate-y+2 absolute left-1/4 top-1/4 h-1 w-1 transform rounded-full bg-white opacity-75" /> */}
      </motion.div>
    </motion.div>
  );
};

export default Indicator;
