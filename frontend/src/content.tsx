import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

/**
 * Extracts the code from HTML content.
 * @param {string} html - The HTML content.
 * @return {string} - The extracted code.
 */
function extractCodeFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const spanElements = doc.querySelectorAll("div.view-line > span");

  return Array.from(spanElements)
    .map((span) => {
      return Array.from(span.childNodes)
        .map((node) => node.textContent?.replace("&nbsp;", " "))
        .join("");
    })
    .join("\n")
    .trim();
}

/**
 * Extracts the text from HTML content, removing any images.
 * @param {string} html - The HTML content.
 * @return {string} - The extracted text.
 */
function extractTextFromHTML(html: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const images = doc.getElementsByTagName("img");

  Array.from(images).forEach((img) => img.parentNode?.removeChild(img));

  return doc.body.textContent?.trim();
}

/**
 * Scrapes code from the current document.
 * @return {string} - The scraped code.
 */
function scrapeCode() {
  const element = document.querySelector(".view-lines.monaco-mouse-cursor-text");
  if (!element) throw new Error("Could not find code element");
  return extractCodeFromHTML(element.innerHTML);
}

/**
 * Scrapes the description from the current document.
 * @return {string} - The scraped description.
 */
function scrapeDescription() {
  const element = document.querySelector('div[data-track-load="description_content"]');
  if (!element) throw new Error("Could not find description element");
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
    code,
  };
}

// Listener for messages from either an extension process or a content script.
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "SCRAPE_HINT_DATA":
      sendResponse(scrapeHintData());
      return true;
    default:
      break;
  }
});

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case "SCRAPE_HINT_DATA":
      sendResponse({ problem: scrapeDescription(), code: scrapeCode() });
      return true;
  }
});

const MAX_WAIT = 5000;

window.onload = async () => {
  const path = window.location.href.split(".com")[1];

  if (!path.includes("/problems/")) return;

  let editor: Element | null;
  let title: Element | null;

  let timeWaited = 0;
  let waitTime = 50;

  do {
    editor = document.querySelector("[data-track-load='code_editor']");
    title = document.querySelector(`a[href="${path}"]`);

    if (timeWaited > MAX_WAIT) break;

    await wait(waitTime);
    timeWaited += waitTime;
    waitTime += 50;
  } while (!(editor && title));

  if (!(editor && title)) throw new Error("Page elements not found");

  let id = title.textContent?.split(".")[0];
  if (!id) throw new Error("Could not get problem ID");

  let localStorageKey = findKeyId(id);
  if (!localStorageKey) {
    console.log("start editing the code in order to process it");
  } else {
    console.log("code", localStorageKey, localStorage.getItem(localStorageKey));
  }

  let root = document.createElement("div");
  (root.style as any) =
    "position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 1000; background: transparent; pointer-events: none;";
  // root.id = "root";
  editor.appendChild(root);

  ReactDOM.createRoot(root).render(
    <button
      className="pointer-events-auto absolute bottom-6 right-6 h-12 w-12 rounded-lg bg-black"
      onClick={() => console.log("Button Go Brrrrrrr")}
    >
      yo
    </button>,
  );
};

function findKeyId(id: string) {
  // TODO: Handle multiple languages if this is the solution we go with
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
