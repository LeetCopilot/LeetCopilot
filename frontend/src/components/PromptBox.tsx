import React from "react";
import { styles } from "../styles";

type PromptBoxProps = {
  responseFromContent: string;
  setIsTyping: (isTyping: boolean) => void;
  requestHint: () => void;
};

const PromptBox = ({ responseFromContent, setIsTyping, requestHint }: PromptBoxProps) => {
  return (
    <div className="flex flex-col justify-center">
      <textarea
        placeholder={"Test the content.js script"}
        className="h-12 w-full resize-none rounded-lg border-solid p-2"
        value={responseFromContent}
        onChange={() => {}}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      <div className="flex w-full justify-end">
        <button onClick={requestHint}>Submit</button>
      </div>
    </div>
  );
};

export default PromptBox;
