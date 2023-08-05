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

async function promptForHint() {
  let code = scrapeCode();
  let problem = scrapeProblem();
  console.log("Got code: " + code);
  console.log("Got problem: " + problem);
  
  // Send all the data needed for a request to the backend to the React app
  return {'problem': problem, 'code': code};
}

/**
* Fired when a message is sent from either an extension process or a content script.
*/
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Got message");
  return promptForHint().then((data) => { sendResponse(data) });
})