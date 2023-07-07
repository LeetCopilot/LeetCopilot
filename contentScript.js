async function fetchOpenAIData(prompt, temperature, max_tokens) {
    const fetchData = async () => {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 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",
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
  
window.onload = async function() {
    setTimeout(async () => {
        let userCode = scrapeCode();
        
        let query = "Provide insights on how the user could get the code to work. Dont just tell them the answer, but give them hints on how to get there." +
        "This is the user code: " + userCode;

        let response = await fetchOpenAIData(query, 0.5, 50);
        console.log(response);
    }, 5000);
};
  