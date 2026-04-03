const fs = require('fs');

const code = fs.readFileSync('/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/app.js', 'utf8');

const regex = /(const sceneData = \{)([\s\S]*?)(\n\};\n)/;
const match = code.match(regex);

if (!match) {
    console.log("Could not find sceneData");
    process.exit(1);
}

const before = match[1];
const inner = match[2];
const after = match[3];

// Parse inner lines
const lines = inner.split('\n');
let newInner = [];

for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
        newInner.push('');
        continue;
    }
    
    // match 'scene_...': { title: '...', description: '...', thumb: '...' },
    const lineRegex = /'([^']+)'\s*:\s*\{\s*title\s*:\s*'([^']+)'\s*,\s*description\s*:\s*'([^']+)'\s*,\s*thumb\s*:\s*'([^']+)'\s*\},?/;
    const m = trimmed.match(lineRegex);
    if (m) {
        let key = m[1];
        let title = m[2];
        let desc = m[3];
        let thumb = m[4];
        
        // Format rules:
        // Description ends with a period.
        if (!desc.endsWith('.')) {
            desc += '.';
        }
        
        // Standardize "Tòa"
        title = title.replace(/tòa a(\d)/gi, 'Tòa A$1');
        desc = desc.replace(/tòa a(\d)/gi, 'Tòa A$1');
        title = title.replace(/tòa A(\d)/gi, 'Tòa A$1');
        desc = desc.replace(/tòa A(\d)/gi, 'Tòa A$1');
        
        // Standardize "Học Viện" -> "Học viện"
        desc = desc.replace(/Học Viện Công nghệ Bưu chính Viễn thông/gi, 'Học viện Công nghệ Bưu chính Viễn thông');

        // Capitalize first letter of description
        desc = desc.charAt(0).toUpperCase() + desc.slice(1);
        title = title.charAt(0).toUpperCase() + title.slice(1);
        
        // Reconstruct padded line
        // Pad key to length 32
        const paddedKey = `'${key}'`.padEnd(35, ' ');
        const paddedTitleContent = `'${title}'`;
        const paddedDescContent = `'${desc}'`;
        
        const newLine = `    ${paddedKey}: { title: ${paddedTitleContent}, description: ${paddedDescContent}, thumb: '${thumb}' },`;
        newInner.push(newLine);
    } else {
        newInner.push(line);
    }
}

// remove multiple consecutive empty lines
let finalInner = newInner.join('\n');
finalInner = finalInner.replace(/\n{3,}/g, '\n\n');

const newCode = code.replace(regex, before + "\n" + finalInner.trim() + after);
fs.writeFileSync('/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/app.js', newCode);
console.log("Done formatting sceneData");
