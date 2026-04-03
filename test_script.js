const fs = require('fs');
const code = fs.readFileSync('/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/app.js', 'utf8');

const regex = /(const sceneData = \{)([\s\S]*?)(\n\};\n)/;
const match = code.match(regex);
const inner = match[2];
const lines = inner.split('\n');

for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const lineRegex = /'([^']+)'\s*:\s*\{\s*title\s*:\s*'([^']+)'\s*,\s*description\s*:\s*'([^']+)'\s*,\s*thumb\s*:\s*'([^']+)'\s*\},?/;
    const m = trimmed.match(lineRegex);
    if (m) {
        let title = m[2];
        let desc = m[3];
        let oldTitle = title;
        
        let floorMatch = desc.match(/tầng\s*([G1-9])\s*(?:Tòa\s*)?(A[1-3])/i);
        
        if (desc.match(/hội trường/i) || title.match(/hội trường/i)) {
            title = 'Hội trường A2';
        } else if (floorMatch) {
            title = `Tầng ${floorMatch[1].toUpperCase()} Tòa ${floorMatch[2].toUpperCase()}`;
            if (desc.match(/vườn nhật/i)) {
                title = `Vườn Nhật - Tầng ${floorMatch[1].toUpperCase()} Tòa ${floorMatch[2].toUpperCase()}`;
            }
        } else if (desc.match(/sảnh chính Tòa A1/i)) {
            title = 'Sảnh chính Tòa A1';
        } else if (desc.match(/naver/i)) {
            title = 'PTIT x NAVER AI Center';
        } else {
            // strip Khu vực
            title = title.replace(/^Khu vực /i, '');
        }
        
        console.log(`${oldTitle.padEnd(25)} | ${title.padEnd(25)} | ${desc}`);
    }
}
