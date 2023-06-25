function extractCodeFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const spanElements = doc.querySelectorAll('div.view-line > span');

    let code = '';
    spanElements.forEach(span => {
        const lineText = Array.from(span.childNodes)
        .map(node => {
            console.log(node.textContent)
            return node.textContent.replace("&nbsp;", ' ');
        })
        .join('');
        code += lineText + '\n';
    });

    return code.trim();
}

function scrapeCode() {
    const element = document.querySelector('.view-lines.monaco-mouse-cursor-text');
    console.log(element)
    console.log(element.innerHTML);
    const code = extractCodeFromHTML(element.innerHTML);
    return code;
}