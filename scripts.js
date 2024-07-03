document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('compareButton').addEventListener('click', () => {
        const text1 = document.getElementById('text1').value;
        const text2 = document.getElementById('text2').value;
        const outputOriginal = document.getElementById('outputOriginalContent');
        const outputModified = document.getElementById('outputModifiedContent');

        const diff = getDiff(text1, text2);
        outputOriginal.innerHTML = diff.original;
        outputModified.innerHTML = diff.modified;
    });

    document.getElementById('resetButton').addEventListener('click', () => {
        document.getElementById('text1').value = '';
        document.getElementById('text2').value = '';
        document.getElementById('outputOriginalContent').innerHTML = '';
        document.getElementById('outputModifiedContent').innerHTML = '';
    });
});

function getDiff(text1, text2) {
    const diff = {
        original: [],
        modified: []
    };

    const text1Lines = text1.split('\n');
    const text2Lines = text2.split('\n');
    const maxLength = Math.max(text1Lines.length, text2Lines.length);

    let removedCount = 0;
    let addedCount = 0;

    for (let i = 0; i < maxLength; i++) {
        const lineNum = i + 1;
        const line1 = text1Lines[i] || '';
        const line2 = text2Lines[i] || '';

        const lineDiff = diffLines(line1, line2);
        removedCount += (lineDiff.original.match(/<span class="removed">/g) || []).length;
        addedCount += (lineDiff.modified.match(/<span class="added">/g) || []).length;

        diff.original.push(`<div>${lineNum}: ${lineDiff.original}</div>`);
        diff.modified.push(`<div>${lineNum}: ${lineDiff.modified}</div>`);
    }

    const originalStats = getTextStats(text1);
    const modifiedStats = getTextStats(text2);

    diff.original.unshift(`
        <div class="stats">
            <span>Words: ${originalStats.wordCount}</span>
            <span>Characters: ${originalStats.charCount}</span>
            <span>Removed: ${removedCount}</span>
        </div>
    `);
    diff.modified.unshift(`
        <div class="stats">
            <span>Words: ${modifiedStats.wordCount}</span>
            <span>Characters: ${modifiedStats.charCount}</span>
            <span>Added: ${addedCount}</span>
        </div>
    `);

    return {
        original: diff.original.join('\n'),
        modified: diff.modified.join('\n')
    };
}

function diffLines(line1, line2) {
    const diff = Diff.diffWordsWithSpace(line1, line2);

    let originalLine = '';
    let modifiedLine = '';

    diff.forEach(part => {
        const className = part.added ? 'added' : part.removed ? 'removed' : '';

        if (part.removed) {
            originalLine += `<span class="${className}">${escapeHtml(part.value)}</span>`;
        } else if (part.added) {
            modifiedLine += `<span class="${className}">${escapeHtml(part.value)}</span>`;
        } else {
            originalLine += escapeHtml(part.value);
            modifiedLine += escapeHtml(part.value);
        }
    });

    return {
        original: originalLine,
        modified: modifiedLine
    };
}

function getTextStats(text) {
    return {
        wordCount: text.trim().split(/\s+/).length,
        charCount: text.length
    };
}

function escapeHtml(string) {
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };

    return String(string).replace(/[&<>"'`=\/]/g, s => entityMap[s]);
}

function copyToClipboard(elementId) {
    const el = document.createElement('textarea');
    el.value = document.getElementById(elementId).innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}
