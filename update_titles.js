const fs = require('fs');

const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/app.js';
const code = fs.readFileSync(path, 'utf8');

const regex = /(const sceneData = \{)([\s\S]*?)(\n\};\n)/;
const match = code.match(regex);
if (!match) process.exit(1);

const before = match[1];
const inner = match[2];
const after = match[3];

const lines = inner.split('\n');
const newLines = [];

for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
        newLines.push(line);
        continue;
    }
    const lineRegex = /^(\s*'[^']+'\s*:\s*\{\s*title\s*:\s*')([^']+)('\s*,\s*description\s*:\s*')([^']+)('\s*,\s*thumb\s*:\s*'[^']+'\s*\},?)$/;
    const m = line.match(lineRegex);
    if (m) {
        let prefix = m[1];
        let title = m[2];
        let mid = m[3];
        let desc = m[4];
        let suffix = m[5];

        let newTitle = title;
        let pFloorMatch = desc.match(/tầng\s*([0-9G])/i) || title.match(/tầng\s*([0-9G])/i);
        let pBuildingMatch = desc.match(/(?:Tòa\s*)(A[1-3])/i) || title.match(/(?:Tòa\s*)(A[1-3])/i);

        let floor = pFloorMatch ? pFloorMatch[1].toUpperCase() : null;
        let bldg = pBuildingMatch ? pBuildingMatch[1].toUpperCase() : null;

        if (desc.match(/hội trường/i) || title.match(/hội trường/i)) {
            newTitle = 'Hội trường';
        } else if (floor && bldg) {
            newTitle = `Tầng ${floor} Tòa ${bldg}`;
        } else if (bldg) {
            // No floor but building
            if (desc.match(/sảnh/i) || title.match(/sảnh/i)) {
                newTitle = `Tầng 1 Tòa ${bldg}`;
            } else if (desc.toLowerCase().includes('naver ai')) {
                newTitle = `Tầng 1 Tòa A1`; // Default to Tầng 1 for Naver center as requested to group by floor
            } else if (desc.match(/cầu thang/i) || title.match(/cầu thang/i)) {
                 // Try to see if title has floor
                 let floorTitle = title.match(/tầng\s*([G1-9])/i);
                 if(floorTitle) {
                     newTitle = `Tầng ${floorTitle[1]} Tòa ${bldg}`;
                 } else {
                     newTitle = `Cầu thang Tòa ${bldg}`;
                 }
            } else {
                newTitle = `Tòa ${bldg}`;
            }
        } else if (desc.match(/cầu thang/i) || title.match(/cầu thang/i)) {
            if (desc.match(/A[1-3]/i) || title.match(/A[1-3]/i)) {
                let toa = desc.match(/A[1-3]/i) || title.match(/A[1-3]/i);
                newTitle = `Cầu thang Tòa ${toa[0]}`;
            } else {
                 newTitle = 'Cầu thang';
            }
        }
        else {
            // Ensure no "Khu vực" prefix except for some
            if (newTitle.startsWith('Khu vực ') && !newTitle.includes('I love PTIT') && !newTitle.includes('cây xanh')) {
                newTitle = newTitle.replace(/^Khu vực /i, '');
            }
            if (newTitle.match(/gửi xe/i) || desc.match(/gửi xe/i)) {
                newTitle = 'Nhà xe sinh viên';
            }
        }

        if(newTitle.startsWith('Bên trong ')) newTitle = newTitle.replace(/^Bên trong /i, '');
        if(newTitle.startsWith('Phía trước ')) newTitle = newTitle.replace(/^Phía trước /i, '');
        
        // Capitalize first letter
        newTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1);

        newLines.push(`${prefix}${newTitle}${mid}${desc}${suffix}`);
    } else {
        newLines.push(line);
    }
}

const finalInner = newLines.join('\n');
const newCode = code.replace(regex, match[1] + finalInner + match[3]);
fs.writeFileSync(path, newCode);
console.log("Updated app.js titles");
