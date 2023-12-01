/* code source: https://github.com/gollum/gollum/pull/1876 */
/* ref: https://github.com/gollum/gollum/issues/1754 */
import params from "@params";

const svgCopy = '<svg aria-hidden="true" height="12" viewBox="1 -2 12 18" version="1.1" width="18" data-view-component="true"><path fill-rule="evenodd" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>';
const svgCheck = '<svg aria-hidden="true" height="12" viewBox="1 -2 12 18" version="1.1" width="18" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';
const strCopy = 'Copy';
const strCheck = 'Copied';


function enable_code_blocks() {
    if (! navigator.clipboard) {
        console.log("not support clipboard")
        return;
    }

    let codeBlocks = document.querySelectorAll("div > pre > code, table td:last-child > pre > code");
    const iconCopyDefault =  svgCopy;
    const iconCopyActive = svgCheck;

    const copyToClipboard = async (event) => {
        const { currentTarget: button } = event;
    
        const codeBlock = document.querySelector(`#${button.dataset.codeblock}`);
    
        if (!codeBlock) {
          throw('Error while coping to clipboard: codeblock not found.');
          return;
        }

        if (params.code_with_lineno_not_in_table) {
            // console.log("copy code block with line numbers without using table");
            const clone = codeBlock.cloneNode(true);
            clone.childNodes.forEach(node => {
                number_span = node.firstChild;
                number_span.remove();
            });
            await navigator.clipboard.writeText(clone.textContent);
        } else {
            // console.log("copy code block with line numbers using table or without line numbers");
            await navigator.clipboard.writeText(codeBlock.textContent);
        }


        button.innerHTML = iconCopyActive;
        button.setAttribute('aria-label', 'Copied!');
    
        // wait 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
    
        button.innerHTML = iconCopyDefault;
        button.setAttribute('aria-label', 'copy to clipboard');
    };

    codeBlocks.forEach((item, idx) => {
        // assign a unique ID so the element can be selected later.
        const id = `code-clipboard-${idx + 1}`;

        const button = document.createElement("button");
    
        button.setAttribute('aria-label', 'copy to clipboard');
        button.hidden = true;
        button.dataset.codeblock = id;
        button.innerHTML = iconCopyDefault;
        button.onclick = copyToClipboard;
        button.classList.add(
          "button-copy-code", 
        );
        item.id = id;
        ipp = item.parentNode.parentNode;  // TD or DIV
        if (ipp.tagName == 'TD') {
            td_sibling = ipp.parentNode.firstChild;
            span_width = td_sibling.querySelector('pre span:last-child').offsetWidth;
            td_sibling.style.width = span_width + 2 + "px";
            /*
            console.log(`The ipp ${idx + 1} info: `)
            console.log(`\t${ipp.tagName}`);
            console.log(`\t${span_width}`);
            console.log(`\tnew width ${ipp.style.width}`);
            */
        }

        ipp.addEventListener('mouseenter', () => button.hidden = false);
        ipp.addEventListener('mouseleave', () => button.hidden = true );
        ipp.appendChild(button);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    enable_code_blocks();
});
