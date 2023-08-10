import React from 'react';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { bobAnimation, innerCircleAnimation } from '../animations';

const Indicator = ({ isTyping }) => {
  return (
    <motion.div 
      style={styles.bobbingDivContainer}
      variants={bobAnimation}
      initial="animate"
      animate={isTyping ? "typing" : "idle"}
    >
      <motion.div 
        style={styles.innerCircle}
        variants={innerCircleAnimation}
        initial="animate"
        animate={isTyping ? "typing" : "idle"}
      >
        <div style={styles.highlightLarge} />
        <div style={styles.highlightSmall} />
      </motion.div>
    </motion.div>
  );
}

export default Indicator;
