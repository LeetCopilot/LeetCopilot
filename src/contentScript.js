async function fetchOpenAIData(prompt, temperature, max_tokens) {
    const fetchData = async () => {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer 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`,
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
        } 
        
        else {
            return null;
        }
    };

    const data = await fetchData();

    return data;
}
  

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
  
function scrapeCode() {
    const element = document.querySelector('.view-lines.monaco-mouse-cursor-text');
    const code = extractCodeFromHTML(element.innerHTML);
    return code;
}
function extractTextFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Remove all images from the document
    const images = doc.getElementsByTagName('img');
    for (let i = images.length - 1; i >= 0; i--) {
      images[i].parentNode.removeChild(images[i]);
    }
    
    // Extract the text content from the modified document
    return doc.body.textContent.trim();
  }
  
function scrapeProblem() {
  const html = document.querySelector('._1l1MA').innerHTML;
  const extractedText = extractTextFromHTML(html);
  return extractedText;
}
  
window.onload = async function() {
    setTimeout(async () => {
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

        // let response = await fetchOpenAIData(query, 0.5, 50);
        // console.log(response);
    }, 5000);
};