import React, { useState } from 'react';
import axios from 'axios';
import { NavBar, Indicator, PromptBox } from './components';

export const App = () => {
  const [responseFromContent, setResponseFromContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);  // new state to track user typing

  const message = {
      from: "Sender.React",
      message: "hint"
  };

  const queryInfo = {
      active: true,
      currentWindow: true
  };

  const requestHint = () => {
    chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
      const currentTabId = tabs[0].id;
      chrome.tabs.sendMessage(
        currentTabId,
        message,
        (response) => {
          setResponseFromContent(response);
          // axios.get('http://127.0.0.1:8000/fact')
          //   .then((response) => {
          //   setResponseFromContent(response.data);
          // })
          // .catch((error) => {
          //   console.log(error);
          //   setResponseFromContent("Failed to send request to backend, make sure it's running!");
          // });
        });
      });
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#343B39' }}>
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