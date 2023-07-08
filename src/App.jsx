import React, { useEffect, useState } from 'react';


export const App = () => {
    const [responseFromContent, setResponseFromContent] = useState('');

    const requestHint = () => {
      const message = {
          from: "Sender.React",
          message: "hint",

      }

      const queryInfo = {
          active: true,
          currentWindow: true
      };

      /**
       * We can't use "chrome.runtime.sendMessage" for sending messages from React.
       * For sending messages from React we need to specify which tab to send it to.
       */
      chrome.tabs && chrome.tabs.query(queryInfo, tabs => {
          const currentTabId = tabs[0].id;
          /**
           * Sends a single message to the content script(s) in the specified tab,
           * with an optional callback to run when a response is sent back.
           *
           * The runtime.onMessage event is fired in each content script running
           * in the specified tab for the current extension.
           */
          chrome.tabs.sendMessage(
              currentTabId,
              message,
              (response) => {
                setResponseFromContent(response);
              });
      });
    };


    return (
        <div>
          <button onClick={requestHint}>Request Hint</button>
          <p>
            {responseFromContent}
          </p>
        </div>
    );
};

export default App;