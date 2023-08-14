import React from 'react';
import { styles } from '../styles';

type PromptBoxProps = {
  responseFromContent: string;
  setIsTyping: (isTyping: boolean) => void;
  requestHint: () => void;
};

const PromptBox = ({ responseFromContent, setIsTyping, requestHint }: PromptBoxProps) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={styles.textAreaContainer}>
        <textarea
          placeholder={'Test the content.js script'}
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
};

export default PromptBox;
