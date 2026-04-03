const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
const cssPath = path + 'style.css';
const htmlPath = path + 'tour.html';

let css = fs.readFileSync(cssPath, 'utf8');

// Update CSS Variables for Light White-Red Theme
css = css.replace(/--glass-bg: rgba\(15, 15, 15, 0\.6\);/, '--glass-bg: rgba(255, 255, 255, 0.85);');
css = css.replace(/--glass-bg: rgba\(15, 15, 15, 0\.7\);/, '--glass-bg: rgba(255, 255, 255, 0.9);'); // For header?
css = css.replace(/--glass-border: rgba\(255, 255, 255, 0\.1\);/, '--glass-border: rgba(227, 27, 35, 0.2);');
css = css.replace(/--glass-shadow: 0 8px 32px 0 rgba\(0, 0, 0, 0\.4\);/, '--glass-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.08);');
css = css.replace(/--text-color: #ffffff;/, '--text-color: #222222;');
css = css.replace(/--text-dim: rgba\(255, 255, 255, 0\.7\);/, '--text-dim: rgba(0, 0, 0, 0.6);');

// Body background
css = css.replace(/body, html \{\s*height: 100%;\s*width: 100%;\s*overflow: hidden;\s*background: #000;/m, 'body, html {\n    height: 100%;\n    width: 100%;\n    overflow: hidden;\n    background: #fdfdfd;');

// Scrollbar Theme
css = css.replace(/::-webkit-scrollbar-track \{\s*background: rgba\(255, 255, 255, 0\.02\);\s*\}/, '::-webkit-scrollbar-track { background: rgba(0, 0, 0, 0.02); }');
css = css.replace(/::-webkit-scrollbar-thumb \{\s*background: rgba\(255, 255, 255, 0\.1\);\s*border-radius: 4px;\s*\}/, '::-webkit-scrollbar-thumb { background: rgba(227, 27, 35, 0.3); border-radius: 4px; }');
css = css.replace(/::-webkit-scrollbar-thumb:hover \{\s*background: rgba\(255, 255, 255, 0\.2\);\s*\}/, '::-webkit-scrollbar-thumb:hover { background: rgba(227, 27, 35, 0.6); }');

// Specific Hardcoded Colors

// Header buttons and sidebar buttons Hover
css = css.replace(/background: rgba\(255, 255, 255, 0\.1\);/g, 'background: rgba(227, 27, 35, 0.1);');
css = css.replace(/background: rgba\(255, 255, 255, 0\.05\);/g, 'background: rgba(227, 27, 35, 0.05);');

// SVG Fills
css = css.replace(/fill: #fff;/g, 'fill: #222;');
css = css.replace(/fill: var\(--text-dim\);/g, 'fill: #444;');
css = css.replace(/fill: #aaa;/g, 'fill: #666;');

// Thumbnails
css = css.replace(/border: 1px solid rgba\(255, 255, 255, 0\.1\);/g, 'border: 1px solid rgba(227, 27, 35, 0.2);');
css = css.replace(/color: #fff;/g, 'color: #222;'); // Be careful with generalized color: #fff

// Info Popup 
css = css.replace(/background: rgba\(15, 15, 15, 0\.85\);/g, 'background: rgba(255, 255, 255, 0.95);');
css = css.replace(/border: 1px solid rgba\(255,255,255,0\.1\);/g, 'border: 1px solid rgba(227, 27, 35, 0.2);');
css = css.replace(/box-shadow: 0 10px 40px rgba\(0,0,0,0\.5\);/g, 'box-shadow: 0 10px 40px rgba(0,0,0,0.1);');

// Fix Map tooltips (map-label) that used dark theme but with White Theme we might want white bg? Or keep dark?
// User likes the reddish map, let's keep the map's red theme itself, but map labels tooltip needs White theme!
css = css.replace(/\.map-label \{\s*color: #fff;\s*background: rgba\(0,0,0,0\.85\);\s*backdrop-filter: blur\(5px\);\s*border: 1px solid rgba\(255,255,255,0\.1\);\s*box-shadow: 0 5px 15px rgba\(0,0,0,0\.5\);/m, 
`.map-label {
    color: #e31b23; 
    background: rgba(255,255,255,0.95); 
    backdrop-filter: blur(5px);
    border: 1px solid rgba(227,27,35,0.3);
    box-shadow: 0 5px 15px rgba(227,27,35,0.2);`);

// Minimap modal specific background
// wait, the minimap container is `.minimap-container`.
css = css.replace(/\.minimap-container \{\s*position: fixed;[\s\S]*?background: rgba\(15, 15, 15, 0\.7\);/m, 
(match) => match.replace('background: rgba(15, 15, 15, 0.7);', 'background: rgba(255, 255, 255, 0.85);')
);

// Sidebar active states
css = css.replace(/\.sidebar-item\.active \{\s*background: rgba\(255, 255, 255, 0\.1\);\s*border-left-color: var\(--primary-color\);\s*\}/, 
`.sidebar-item.active {
    background: rgba(227, 27, 35, 0.08);
    border-left-color: var(--primary-color);
}`);

// Sidebar hover group
css = css.replace(/\.accordion-header:hover \{\s*background: rgba\(255, 255, 255, 0\.05\);\s*\}/, 
`.accordion-header:hover { background: rgba(227, 27, 35, 0.05); }`);

// Make sure map blocks font color fix from earlier doesn't break.
// We ran `.custom-floorplan .block { color: transparent !important;` - that's fine.

fs.writeFileSync(cssPath, css);

let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/app\.js\?v=\d+/g, 'app.js?v=20');
html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=20');
fs.writeFileSync(htmlPath, html);

console.log("Applied Light PTIT Red/White theme to entire web app");
