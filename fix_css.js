const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
let styleCss = fs.readFileSync(path + 'style.css', 'utf8');

// Update Minimap Dimensions
styleCss = styleCss.replace(
    /width: 320px;\s*height: 380px;/,
    'width: 390px;\n    height: 480px;'
);

// Update Block Styling for contrast and visibility
styleCss = styleCss.replace(
    /color: rgba\(255,255,255,0\.5\);\s*background: rgba\(255, 255, 255, 0\.02\);\s*backdrop-filter: blur\(4px\);\s*-webkit-backdrop-filter: blur\(4px\);\s*border: 1px solid rgba\(255, 255, 255, 0\.05\);\s*border-top: 1px solid rgba\(255, 255, 255, 0\.1\);/g,
    `color: #ffffff;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(255, 255, 255, 0.4);
    text-shadow: 1px 1px 3px rgba(0,0,0,0.9);`
);

// Increase base font size from 6.5px to 9px
styleCss = styleCss.replace(/font-size: 6\.5px;/, 'font-size: 9px;');

// Increase A1 font size from 10px to 14px
styleCss = styleCss.replace(/font-size: 10px !important;/g, 'font-size: 14px !important;');

fs.writeFileSync(path + 'style.css', styleCss);
console.log("CSS Updated");
