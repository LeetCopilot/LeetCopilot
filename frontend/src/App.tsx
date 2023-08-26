import React, { useState, FC } from 'react';
import axios from 'axios';
import { NavBar, Indicator, PromptBox } from './components';

interface LeetData {
  description: string;
  code: string;
}

const App: FC = () => {
  const [hint, setHint] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const message = {
    from: "Sender.React",
    type: "SCRAPE_HINT_DATA",
  };

  const queryInfo = {
    active: true,
    currentWindow: true
  };

  const getCurrentTabId = (): Promise<number> => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query(queryInfo, tabs => {
        if (tabs && tabs[0] && typeof tabs[0].id === 'number') {
          resolve(tabs[0].id);
        } else {
          reject(new Error('No tabs found'));
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
      
      const response = await axios.post('http://localhost:8000/hint', {
        description: leetData.description,
        code: leetData.code
      });

      setHint(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#343B39' }}>
      <NavBar />
      <Indicator isTyping={isTyping} />
      <PromptBox 
        responseFromContent={hint} 
        setIsTyping={setIsTyping} 
        requestHint={requestHint} 
      />
    </div>
  );
};

export default App;