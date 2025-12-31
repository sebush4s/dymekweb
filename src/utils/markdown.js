export const parseFrontmatter = (text) => {
    if (!text) return { data: {}, content: '' };
    const match = text.match(/^---\s*[\r\n]+([\s\S]+?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/);
    if (!match) return { data: {}, content: text };

    const frontmatterBlock = match[1];
    const content = match[2];

    const data = {};
    frontmatterBlock.split('\n').forEach(line => {
        if (!line.trim()) return;
        const colonIndex = line.indexOf(':');
        if (colonIndex !== -1) {
            const key = line.slice(0, colonIndex).trim();
            let value = line.slice(colonIndex + 1).trim();
            // Remove quotes if present
            if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            data[key] = value;
        }
    });

    return { data, content };
};
