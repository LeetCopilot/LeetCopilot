import React, { useState } from 'react';
import axios from 'axios';
import { NavBar, Indicator, PromptBox } from './components';

export const App = () => {
  const [responseFromContent, setResponseFromContent] = useState("");
  const [isTyping, setIsTyping] = useState(false);  // new state to track user typing

  const requestHint = () => {
    axios.get('https://catfact.ninja/fact')
        .then((response) => {
        console.log(response);
        setResponseFromContent(response.data.fact);
        console.log(responseFromContent);
      })
      .catch((error) => {
        console.log(error);
        setResponseFromContent("Failed to send request to backend");
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