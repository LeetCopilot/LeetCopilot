import React from 'react';
import { styles } from '../styles';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

type PromptBoxProps = {
  responseFromContent: string;
  setIsTyping: (isTyping: boolean) => void;
  requestHint: () => void;
};

const PromptBox = ({ responseFromContent, setIsTyping, requestHint }: PromptBoxProps) => {
  return (
    <div className="flex flex-col justify-center">
      <Textarea
        placeholder={'Test the content.js script'}
        className="resize-none"
        value={responseFromContent}
        onChange={() => {}}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <div className="flex w-full justify-end">
        <Button onClick={requestHint}>Submit</Button>
      </div>
    </div>
  );
};

export default PromptBox;
