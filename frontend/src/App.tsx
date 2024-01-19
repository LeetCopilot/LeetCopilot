import React, { useState, FC, useEffect } from "react";
import axios from "axios";
import { NavBar, Indicator, PromptBox } from "./components";

interface LeetData {
  title: string;
  description: string;
}

const App: FC = () => {
  const [hint, setHint] = useState("");
  const [isTyping, setIsTyping] = useState(false); // new state to track user typing
  const [theme, setTheme] = useState("dark"); // new state to track theme color

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const message = {
    from: "Sender.React",
    type: "SCRAPE_HINT_DATA",
  };

  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  const getCurrentTabId = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query(queryInfo, (tabs) => {
        if (tabs && tabs[0] && typeof tabs[0].id === "number") {
          resolve(tabs[0].id);
        } else {
          reject(new Error("No tabs found"));
        }
      });
    });
  };

  const sendMessageToContentScript = (tabId: number): Promise<LeetData> => {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, message, (response) => {
        resolve(response);
      });
    });
  };

  const requestHint = async () => {
    try {
      const currentTabId = await getCurrentTabId();
      const leetData = await sendMessageToContentScript(currentTabId);

      const response = await axios.post("http://localhost:8000/hint", leetData);

      setHint(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dark:bg-leetdarkgray bg-leetpaleorange h-full w-full p-4">
      <NavBar handleThemeSwitch={handleThemeSwitch} />
      <Indicator isTyping={isTyping} />
      <PromptBox responseFromContent={hint} setIsTyping={setIsTyping} requestHint={requestHint} />
    </div>
  );
};

export default App;
