import React, { useEffect, useState } from 'react';
import axios from 'axios';
import theme from './theme'
import { motion } from 'framer-motion';

const styles = {
    container: {
        width: '100vw',
        height: '100vh',
        padding: '5vw',
        backgroundColor: '#343B39'
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: '1.5rem'
    },
    titleHighlight: {
        color: 'darkorange'
    },
    indicatorContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    indicator: (color) => ({
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: color,
        marginRight: '5vw',
        borderRadius: '100%',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.5)'
    }),
    textAreaContainer: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        width: '80vw'
    },
    textArea: {
        border: '1px solid #000',
        borderRadius: '10px',
        padding: '10px',
        backgroundColor: '#eee',
        color: 'black',
        width: '100%',
        height: '3rem',
        resize: 'none'
    },
    button: {
        position: 'absolute',
        bottom: '0rem',
        right: '-1rem',
        backgroundColor: 'transparent',
        color: 'darkorange'
    },
    bobbingDivContainer: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '1.5rem',
        height: '1.5rem',
        backgroundColor: '#121F33',
        marginLeft: '10vw',
        marginBottom: '0.5rem',
        borderRadius: '100%',
        boxShadow: '0px 2px 4px rgba(0,0,0,0.5)'
    },
    innerCircle: {
        width: '60%',
        height: '60%',
        backgroundColor: 'darkorange',
        borderRadius: '100%',
        boxShadow: 'inset 0px 1px 2px rgba(0,0,0,0.5)'
    },
    highlightLarge: {
        position: 'absolute',
        top: '25%',
        right: '30%',
        width: '15%',
        height: '15%',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: '100%',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)'
    },
    highlightSmall: {
        position: 'absolute',
        top: '32.5%',
        right: '27.5%',
        width: '10%',
        height: '10%',
        backgroundColor: 'rgba(255,255,255,0.75)',
        borderRadius: '100%',
        boxShadow: '0px 1px 2px rgba(0,0,0,0.3)'
    }
};

export const App = () => {
    const [responseFromContent, setResponseFromContent] = useState("Ask whatever you'd like!");

    const requestHint = () => {
      const message = {
          from: "Sender.React",
          message: "hint",
      }

      const queryInfo = {
          active: true,
          currentWindow: true
      };

      // The body that will be sent to the FastAPI backend
      let requestBody = null;

      console.log("Sending message to content script");
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
              // setResponseFromContent(response);
              requestBody = response;
              axios.post('127.0.0.1:8000/hint', requestBody)
                .then((response) => {
                console.log(response);
                setResponseFromContent(response.data);
              })
              .catch((error) => {
                console.log(error);
                setResponseFromContent("Failed to send request to backend");
              });
            }
          );
      });

      // // If the response is null, then the content script didn't respond
      // if(requestBody == null) {
      //   setResponseFromContent("Failed to scrape the page");
      //   console.log("No response from content script");
        
      //   // Escape!!!
      //   return;
      // }

      // // Send the request to the FastAPI backend with axios
      // axios.post('127.0.0.1:8000/hint', requestBody)
      // .then((response) => {
      //   console.log(response);
      //   setResponseFromContent(response.data);
      // })
      // .catch((error) => {
      //   console.log(error);
      //   setResponseFromContent("Failed to send request to backend");
      // });

    };

    const bobAnimation = {
        animate: {
            y: ["-100%", "-50%", "-100%"],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                times: [0, 0.5, 1],
                loop: Infinity,
                repeatDelay: 0
            }
        }
    };


    return (
      <div style={{width: '100vw', height: '100vh', padding: '5vw', backgroundColor: '#343B39'}}>
        <div style={styles.header}>
          <h3 style={styles.title}>
            Leet
            <span style={styles.titleHighlight}>Copilot</span>
          </h3>
          <div style={styles.indicatorContainer}>
            <div style={styles.indicator('darkorange')} />
            <div style={styles.indicator('gray')} />
          </div>
        </div>

        {/* Make this div bob up and down sine wave style */}
        <motion.div style={styles.bobbingDivContainer}
                    animate={{y:['-25%', '25%']}}
                    transition={{repeat: Infinity, bounceDamping: 10, duration: 1.5, ease: "circIn", repeatType: "reverse", repeatDelay: 0.1}}
                    >
          <div style={styles.innerCircle}>
            <div style={styles.highlightLarge} />
            <div style={styles.highlightSmall} />
          </div>
        </motion.div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={styles.textAreaContainer}>
            <textarea placeholder={responseFromContent} style={styles.textArea}/>
            <button style={styles.button}>
                {'>'}
            </button>
          </div>
        </div>

      </div>
    );

};

export default App;