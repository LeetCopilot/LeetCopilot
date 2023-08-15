import React, { useState } from 'react';
import axios from 'axios';
import { NavBar, Indicator, PromptBox } from './components';

export const App = () => {
  const [responseFromContent, setResponseFromContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);  // new state to track user typing
  
  const message = {
      from: "Sender.React",
      type: "SCRAPE_HINT_DATA",
  };

  const queryInfo = {
      active: true,
      currentWindow: true
  };
  
  const getCurrentTabId = () => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query(queryInfo, tabs => {
        if (tabs && tabs[0]) {
          resolve(tabs[0].id);
        } else {
          reject(new Error('No tabs found'));
        }
      });
    });
  };
  
  const sendMessageToContentScript = (tabId) => {
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
  
      console.log(leetData);
  
      let hint = 'We failed to make a request to the server. Please try again.'; // default hint
  
      const response = await axios.post('http://localhost:8000/hint', {
        description: leetData.description,
        code: leetData.code
      });

      print(response);
      setResponseFromContent(response.data);
  
    } catch (error) {
      console.log(error);
    }
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