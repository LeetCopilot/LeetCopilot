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
          placeholder={'Your hint will be shown here!'}
          style={styles.textArea}
          value={responseFromContent}
          onChange={() => {}}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          readOnly
        />
        <button onClick={requestHint} style={styles.button}>
          {'>'}
        </button>
      </div>
    </div>
  );
};

export default PromptBox;
