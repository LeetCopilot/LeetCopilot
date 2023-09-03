// TODO: What are the types of the parameters? Do we need these functions?
async function fetchOpenAIData(prompt: string, temperature: any, max_tokens: any) {
    const key = "FAKE KEY CAUSE IDK"
    const fetchData = async () => {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${key}`,
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": prompt}],
          "temperature": temperature,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        return null;
      }
    };
  
    const data = await fetchData();
  
    return data;
  }
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    fetchOpenAIData(message.code, 0.5, 50)
      .then(response => {
        sendResponse({ responseText: response });
      })
      .catch(error => {
        console.error(error);
        sendResponse({ responseText: 'Error occurred' });
      });
  
    return true; // Make sure to return true to keep the message channel open for async response
  });
  