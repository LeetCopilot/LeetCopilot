import React, { useState } from 'react';
import axios from 'axios';
import { NavBar, Indicator, PromptBox } from './components';

export const App = () => {
  const [responseFromContent, setResponseFromContent] = useState('');
  const [isTyping, setIsTyping] = useState(false); // new state to track user typing

  const message = {
    from: 'Sender.React',
    type: 'SCRAPE_HINT_DATA',
  };

  const queryInfo = {
    active: true,
    currentWindow: true,
  };

  const requestHint = () => {
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId = tabs[0].id;
        if (!currentTabId) return;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response.problem + '\n' + response.code);
        });
      });
  };

  return (
    <div className="h-full w-full p-4">
      <NavBar />
      <Indicator isTyping={isTyping} />
      <PromptBox
        responseFromContent={responseFromContent}
        setIsTyping={setIsTyping}
        requestHint={requestHint}
      />
    </div>
  );
};
export default App;