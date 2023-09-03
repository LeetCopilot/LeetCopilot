import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

function extractCodeFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const spanElements = doc.querySelectorAll('div.view-line > span');

  let code = '';
  spanElements.forEach((span) => {
    const lineText = Array.from(span.childNodes)
      .map((node) => {
        if (!node.textContent) return '';
        return node.textContent.replace('&nbsp;', ' ');
      })
      .join('');
    code += lineText + '\n';
  });

  return code.trim();
}

function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  const images = doc.getElementsByTagName('img');
  for (let i = images.length - 1; i >= 0; i--) {
    images[i].parentNode?.removeChild(images[i]);
  }

  return doc.body.textContent?.trim() || null;
}

function scrapeCode() {
  const html = document.querySelector('.view-lines.monaco-mouse-cursor-text')?.innerHTML;
  if (!html) return null;
  const code = extractCodeFromHTML(html);
  return code;
}

function scrapeProblem() {
  const html = document.querySelector('div[data-track-load="description_content"]')?.innerHTML;
  if (!html) return null;
  const extractedText = extractTextFromHTML(html);
  return extractedText;
}

async function promptForHint() {
  let code = scrapeCode();
  let problem = scrapeProblem();
  console.log('Got code: ' + code);
  console.log('Got problem: ' + problem);

  return { problem: problem, code: code };
}

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'SCRAPE_HINT_DATA':
      sendResponse({ problem: scrapeProblem(), code: scrapeCode() });
      return true;
  }
});

const MAX_WAIT = 5000;

window.onload = async () => {
  console.log('Loaded content.js with listener');

  console.log(window);

  const path = window.location.href.split('.com')[1];

  if (!path.includes('/problems/')) return;

  let editor: Element | null;
  let title: Element | null;

  let timeWaited = 0;
  let waitTime = 50;

  do {
    if (timeWaited > MAX_WAIT) {
      throw new Error('Waited too long for load');
    }
    await wait(waitTime);
    timeWaited += waitTime;
    waitTime += 50;

    editor = document.querySelector('.monaco-editor');
    title = document.querySelector(`a[href="${path}"]`);
  } while (!(editor && title));

  if (!(editor && title)) throw new Error('Page elements not found');

  let id = title.textContent?.split('.')[0];
  if (!id) throw new Error('Could not get problem ID');

  let localStorageKey = findKeyId(id);

  console.log(id, localStorageKey);

  ReactDOM.createRoot(document.querySelector('body')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );

  if (!localStorageKey) {
    console.log('start editing the code in order to process it');
  }
};

function findKeyId(id: string) {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(id)) return key;
  }
}

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
