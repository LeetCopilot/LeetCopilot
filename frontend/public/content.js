function extractCodeFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const spanElements = doc.querySelectorAll('div.view-line > span');

  let code = '';
  spanElements.forEach(span => {
    const lineText = Array.from(span.childNodes)
      .map(node => {
        return node.textContent.replace("&nbsp;", ' ');
      })
      .join('');
    code += lineText + '\n';
  });

  return code.trim();
}

function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const images = doc.getElementsByTagName('img');
  for (let i = images.length - 1; i >= 0; i--) {
    images[i].parentNode.removeChild(images[i]);
  }

  return doc.body.textContent.trim();
}

function scrapeCode() {
  const element = document.querySelector('.view-lines.monaco-mouse-cursor-text');
  const code = extractCodeFromHTML(element.innerHTML);
  return code;
}

function scrapeProblem() {
  const html = document.querySelector('._1l1MA').innerHTML;
  const extractedText = extractTextFromHTML(html);
  return extractedText;
}

async function promptForHint(temperature = 0.5) {
  let code = scrapeCode();
  let problem = scrapeProblem();
  
  let query = `
  Problem:
  ${problem}

  Code:
  ${code}

  I'm stuck on this LeetCode problem and don't know why my code isn't working. Can you give me a hint that is in the spirit of an interview? Only bring up one issue/optimization. Avoid providing explicit solutions but point out general areas of improvement or potential issues in the code.

  Keep the response short ideally two sentences, one paragraph max. No matter what do not quote any code from the user. Do not tell them what lines to change and what to change them to. Things like "this incorrect code" should be "correct code" should not be in the response.
  `;

  console.log(query);

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer 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`,
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": query}],
      "temperature": temperature,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const content = data.choices[0].message.content;
    return content;
  } else {
    return null;
  }
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  promptForHint().then(sendResponse);
  return true; // return true to indicate you want to send a response asynchronously
});