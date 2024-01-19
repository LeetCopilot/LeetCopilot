import React from "react";
import { styles } from "../styles";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";

type PromptBoxProps = {
  responseFromContent: string;
  setIsTyping: (isTyping: boolean) => void;
  requestHint: () => void;
};

const PromptBox = ({ responseFromContent, setIsTyping, requestHint }: PromptBoxProps) => {
  return (
    <div className="dark:bg-leetdarkgray2 flex flex-row items-end justify-center rounded bg-[#ffd488] p-1">
      <Textarea
        placeholder={"What can we help you with?"}
        className="h-12 w-full resize-none rounded-lg border-transparent bg-transparent dark:bg-transparent"
        value={responseFromContent}
        onChange={() => {}}
        onFocus={() => setIsTyping(true)}
        onBlur={() => setIsTyping(false)}
      />
      {/* <div className="flex w-full justify-end">
        <Button size="sm" onClick={requestHint}>
          Submit
        </Button>
      </div> */}
      <Button size="reallySmall" onClick={requestHint} variant="ghost">
        <Send className="h-5 w-5 text-black dark:text-orange-400" />
      </Button>
    </div>
  );
};

export default PromptBox;
