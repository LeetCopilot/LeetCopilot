/**
 * Extracts the code from HTML content.
 * @param {string} html - The HTML content.
 * @return {string} - The extracted code.
 */
function extractCodeFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const spanElements = doc.querySelectorAll('div.view-line > span');
  
  return Array.from(spanElements)
      .map(span => {
          return Array.from(span.childNodes)
              .map(node => node.textContent.replace("&nbsp;", ' '))
              .join('');
      })
      .join('\n')
      .trim();
}

/**
* Extracts the text from HTML content, removing any images.
* @param {string} html - The HTML content.
* @return {string} - The extracted text.
*/
function extractTextFromHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const images = doc.getElementsByTagName('img');

  Array.from(images).forEach(img => img.parentNode.removeChild(img));
  
  return doc.body.textContent.trim();
}

/**
* Scrapes code from the current document.
* @return {string} - The scraped code.
*/
function scrapeCode() {
  const element = document.querySelector('.view-lines.monaco-mouse-cursor-text');
  return extractCodeFromHTML(element.innerHTML);
}

/**
* Scrapes the description from the current document.
* @return {string} - The scraped description.
*/
function scrapeDescription() {
  const element = document.querySelector('div[data-track-load="description_content"]');
  return extractTextFromHTML(element.innerHTML);
}

/**
* Compiles scraped hint data.
* @return {Object} - An object with scraped code and description.
*/
function scrapeHintData() {
  const code = scrapeCode();
  const description = scrapeDescription();
  
  return {
      description,
      code
  };
}

// Listener for messages from either an extension process or a content script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
      case 'SCRAPE_HINT_DATA':
          sendResponse(scrapeHintData());
          return true;
      default:
          break;
  }
});