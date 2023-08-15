import React from 'react';
import { styles } from '../styles';

const PromptBox = ({ responseFromContent, setIsTyping, requestHint }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={styles.textAreaContainer}>
        <textarea 
            placeholder={"Your hint will be here!"} 
            style={styles.textArea}
            value={responseFromContent}
            onChange={() => {}}
            onFocus={() => setIsTyping(true)}
            onBlur={() => setIsTyping(false)}
        />
        <button onClick={requestHint} style={styles.button}>
            {'>'}
        </button>
      </div>
    </div>
  );
}

export default PromptBox;
