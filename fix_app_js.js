const fs = require('fs');

const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
const appJsPath = path + 'app.js';
let code = fs.readFileSync(appJsPath, 'utf8');

// 1. Get real directory names for thumbnails
const panosDirs = fs.readdirSync(path + 'panos').filter(f => fs.statSync(path + 'panos/' + f).isDirectory());
const dirMap = {};
for (let d of panosDirs) {
    if (d.endsWith('.tiles')) {
        let base = d.substring(0, d.length - 6).toLowerCase();
        dirMap[base] = d;
    }
}

// 2. Fix the sceneData thumbnails
const sceneRegex = /('scene_([a-zA-Z0-9_]+)'\s*:\s*\{[^}]*?thumb:\s*')([^']+)('\s*\},?)/g;
code = code.replace(sceneRegex, (match, p1, sceneName, p3, p4) => {
    // sceneName is everything after 'scene_'
    let key = sceneName.toLowerCase();
    
    // some special names might not map perfectly if they have prefix like "scene_1" -> folder "1.tiles", sceneName="1"
    let folder = dirMap[key];
    
    // Check if the sceneName itself is the exact folder name
    if (!folder && dirMap[key + 'jpg']) { // sometimes it's .jpg.tiles
         folder = dirMap[key + 'jpg'];
    }
    if (!folder && dirMap[key.replace(/_/g, '')]) { 
         folder = dirMap[key.replace(/_/g, '')];
    }
    
    // default fallback
    if (!folder) folder = sceneName + '.tiles';
    
    return p1 + 'panos/' + folder + '/thumb.jpg' + p4;
});

// 3. Fix the map nodes
const newMapNodes = `
// Map nodes layout data matching "Plan chụp 360"
const mapNodes = [
    { title: 'Cổng trường', x: 60, y: 85 },
    { title: 'Sân trường', x: 50, y: 65 }, 
    { title: 'Sân bóng rổ', x: 15, y: 40 },
    { title: 'Hội trường', x: 55, y: 45 },
    { title: 'Hội trường A1', x: 30, y: 45 },
    
    { match: 'Tòa A1', title: 'Tòa A1', x: 30, y: 75 },
    { match: 'Tòa A2', title: 'Tòa A2', x: 70, y: 45 },
    { match: 'Tòa A3', title: 'Tòa A3', x: 80, y: 20 },
    
    { title: 'Thư viện PTIT', x: 80, y: 80 }, 
    { title: 'Khu vực cây xanh', x: 30, y: 55 },
    { title: 'Nhà xe sinh viên', x: 30, y: 60 },
    
    { title: 'Nhà ăn Học viện', x: 45, y: 20 },
    { title: 'Ký túc xá B1', x: 15, y: 15 },
    { title: 'Ký túc xá B5', x: 15, y: 25 },
    
    { title: 'TT ĐTQT', x: 80, y: 50 },
    { title: 'Trung tâm khởi nghiệp Đổi mới sáng tạo', x: 15, y: 75 },
    { title: 'Sân bóng chuyền', x: 15, y: 50 },
    { title: 'Dãy nhà B14', x: 80, y: 35 },
    { title: 'Khu vực gửi xe', x: 35, y: 55 },
    { title: 'I love PTIT', x: 50, y: 80 }
];
`;

// Replace the old mapNodes array in app.js
code = code.replace(/const mapNodes = \[([\s\S]*?)\];/, newMapNodes.trim());

fs.writeFileSync(appJsPath, code);
console.log("Updated app.js thumbnails and maps completely.");
