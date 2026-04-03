const fs = require('fs');

const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
const tourXmlPath = path + 'tour.xml';
let content = fs.readFileSync(tourXmlPath, 'utf8');

// The <layer name="btn_sound" ... /> is roughly from line 87 to 116
const layerRegex = /<layer\s+name="btn_sound"[\s\S]*?\/>/g;
const newContent = content.replace(layerRegex, '');

fs.writeFileSync(tourXmlPath, newContent);
console.log("Removed btn_sound from tour.xml");
