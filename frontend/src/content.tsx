import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
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
  const description = scrapeDescription();
  const code = scrapeCode();

  return {
    description: description,
    code: code,
  };
}

async function RequestCodeReview() {
  // Get the hint based on the code
  const hintData = scrapeHintData();
  console.log(hintData);
  const response = await axios.post("http://localhost:8000/hint", hintData);
  console.log(response.data);

  // const response = {"data":{ "line": 1, "hint": "Issue!"}};

  // Add the hint to the code in the form of a comment
  const {line, hint} = response.data;
  const editor = document.querySelector(".view-lines.monaco-mouse-cursor-text");
  const line_to_hint = editor?.children[line - 1];
  // <span class="mtk3">#&nbsp;val&nbsp;-&gt;&nbsp;index</span>
  const comment = document.createElement("span");
  comment.className = "mtk3";
  comment.innerHTML = `&nbsp;&nbsp;# ${hint}`;
  line_to_hint?.appendChild(comment);
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

const MAX_WAIT = 50000;

window.onload = async () => {
  const path = window.location.href.split(".com")[1];

  if (!path.includes("/problems/")) return;

  let runBar: Element | null;
  let runBarIcon: Element | null | undefined;

  let timeWaited = 0;
  let waitTime = 50;

  do {
    await wait(waitTime);
    timeWaited += waitTime;
    waitTime += 50; // Wait 50ms longer each time
    runBar = document.querySelector(
      ".flex.h-8.items-center.justify-between.border-b.p-1.border-border-quaternary > .flex.items-center.gap-1",
    );
  } while (!runBar && timeWaited < MAX_WAIT);

  runBarIcon = runBar?.firstElementChild;

  if (!runBar) throw new Error("Page elements not found");

  let root = document.createElement("div");
  // (root.style as any) =
  //   "position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 1000; background: transparent; pointer-events: none;";
  runBar.insertBefore(root, runBar.firstChild);

  ReactDOM.createRoot(root).render(
    <button
      className="enabled:hover:bg-fill-secondary enabled:active:bg-fill-primary text-caption text-text-primary group pointer-events-auto relative ml-auto inline-flex cursor-pointer items-center justify-center gap-2 rounded bg-transparent p-1 font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
      onClick={async () => await RequestCodeReview()}
    >
      {/* Grey Circle */}
      <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-stone-400">
        {/* Smaller Orange Circle Inside */}
        <div className="h-2 w-2 rounded-full bg-orange-400" />
      </div>
    </button>
  );
};

function findKeyId(id: string) {
  // TODO: Handle multiple languages if this is the solution we go with
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith(id) && !key.endsWith("updated-time")) return key;
  }
}

async function wait(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
