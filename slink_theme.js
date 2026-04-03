const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
let css = fs.readFileSync(path + 'style.css', 'utf8');

// 1. Setup perfect CSS variables for S-Link Theme
const rootVars = `
:root {
    --bg-color: #f8f9fa;
    --surface-color: #ffffff;
    --primary-color: #e31b23;
    --primary-light: #fff0f0;
    --text-color: #333333;
    --text-dim: #777777;
    --border-color: #e2e8f0;
    --glass-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    --transition-smooth: all 0.3s ease;
    --sidebar-width: 320px;
    --header-height: 70px;
    --safe-area: 20px;
}
`;
css = css.replace(/:root\s*\{[\s\S]*?\}/, rootVars.trim());

// 2. Global cleanup: forcefully remove all existing dark theme hardcodes
// We will replace common black/glass colors with S-Link styles.
css = css.replace(/background:\s*rgba\(15,\s*15,\s*15,\s*0\.[0-9]+\);/g, 'background: var(--surface-color);');
css = css.replace(/background:\s*rgba\(255,\s*255,\s*255,\s*0\.[0-9]+\);/g, 'background: var(--surface-color);');
css = css.replace(/color:\s*#ffffff;/g, 'color: var(--text-color);');
css = css.replace(/color:\s*#fff;/g, 'color: var(--text-color);');
css = css.replace(/color:\s*rgba\(255,\s*255,\s*255,\s*0\.[0-9]+\);/g, 'color: var(--text-dim);');
css = css.replace(/border-color:\s*rgba\(255,\s*255,\s*255,\s*0\.[0-9]+\);/g, 'border-color: var(--border-color);');
css = css.replace(/border:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.[0-9]+\);/g, 'border: 1px solid var(--border-color);');
css = css.replace(/border-bottom:\s*1px\s*solid\s*rgba\(255,\s*255,\s*255,\s*0\.[0-9]+\);/g, 'border-bottom: 1px solid var(--border-color);');

// 3. App Container & Sidebar
css = css.replace(/\.app-sidebar\s*\{[\s\S]*?\}/, 
`.app-sidebar {
    grid-area: sidebar;
    background: var(--surface-color);
    border-right: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    z-index: 100;
    box-shadow: 2px 0 10px rgba(0,0,0,0.02);
}`);

css = css.replace(/\.app-header\s*\{[\s\S]*?\}/, 
`.app-header {
    grid-area: header;
    background: var(--surface-color);
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--safe-area);
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
}`);

// Header branding
css = css.replace(/\.header-branding\s*h1\s*\{[\s\S]*?\}/, 
`.header-branding h1 { font-size: 18px; font-weight: 700; color: #222; letter-spacing: 0.5px; text-transform: uppercase; margin-bottom: 2px; }`);

css = css.replace(/\.header-branding\s*p\s*\{[\s\S]*?\}/, 
`.header-branding p { font-size: 11px; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.5px; }`);

// Sidebar Items (S-link style)
css = css.replace(/\.sidebar-item\s*\{[\s\S]*?\}/, 
`.sidebar-item {
    padding: 15px var(--safe-area);
    cursor: pointer;
    border-left: 4px solid transparent;
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    border-bottom: 1px solid #f0f0f0;
}`);

css = css.replace(/\.sidebar-item:hover\s*\{[\s\S]*?\}/, 
`.sidebar-item:hover { background: #f8f9fa; }`);

css = css.replace(/\.sidebar-item\.active\s*\{[\s\S]*?\}/, 
`.sidebar-item.active {
    background: var(--primary-light);
    border-left-color: var(--primary-color);
}`);

css = css.replace(/\.sidebar-item\s*\.scene-title\s*\{[\s\S]*?\}/, 
`.sidebar-item .scene-title { font-size: 14px; font-weight: 600; color: var(--text-color); }`);

css = css.replace(/\.sidebar-item\.active\s*\.scene-title\s*\{[\s\S]*?\}/, 
`.sidebar-item.active .scene-title { color: var(--primary-color); }`);

// Accordion
css = css.replace(/\.accordion-header\s*\{[\s\S]*?\}/, 
`.accordion-header {
    padding: 18px var(--safe-area);
    cursor: pointer;
    border-left: 4px solid transparent;
    border-bottom: 1px solid #f0f0f0;
    transition: var(--transition-smooth);
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: transparent;
    font-size: 13px;
    font-weight: 600;
    color: var(--text-color);
}`);

css = css.replace(/\.accordion-header:hover\s*\{[\s\S]*?\}/, 
`.accordion-header:hover { background: #f8f9fa; }`);

css = css.replace(/\.accordion-header\.active\s*\{[\s\S]*?\}/, 
`.accordion-header.active {
    background: var(--primary-light);
    border-left-color: var(--primary-color);
    color: var(--primary-color);
}`);

css = css.replace(/\.badge\s*\{[\s\S]*?\}/, 
`.badge {
    background: var(--primary-light);
    color: var(--primary-color);
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: 700;
}`);

// Scene thumbnail cards (S-link style)
css = css.replace(/\.scene-card\s*\{[\s\S]*?\}/, 
`.scene-card {
    position: relative;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--border-color);
    transition: var(--transition-smooth);
    background: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}`);

css = css.replace(/\.scene-card:hover\s*\{[\s\S]*?\}/, 
`.scene-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(227,27,35,0.1); border-color: var(--primary-color); }`);

css = css.replace(/\.scene-card\.active\s*\{[\s\S]*?\}/, 
`.scene-card.active { border: 2px solid var(--primary-color); box-shadow: 0 0 0 2px rgba(227,27,35,0.1); }`);

css = css.replace(/\.scene-card\s*\.scene-name\s*\{[\s\S]*?\}/, 
`.scene-card .scene-name {
    position: absolute; bottom: 0; left: 0; right: 0;
    background: rgba(255,255,255,0.95);
    padding: 8px; font-size: 11px; text-align: center;
    font-weight: 600; color: #222;
    border-top: 1px solid var(--border-color);
}`);

css = css.replace(/\.scene-card\.active\s*\.scene-name\s*\{[\s\S]*?\}/, 
`.scene-card.active .scene-name { color: var(--primary-color); }`);

// Header icons
css = css.replace(/\.header-btn\s*\{[\s\S]*?\}/, 
`.header-btn {
    width: 40px; height: 40px; border-radius: 50%;
    background: #f8f9fa; border: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s; margin-left: 10px;
}`);

css = css.replace(/\.header-btn:hover\s*\{[\s\S]*?\}/, 
`.header-btn:hover { background: var(--primary-light); border-color: var(--primary-light); }`);

css = css.replace(/\.header-btn\s*svg\s*\{[\s\S]*?\}/, 
`.header-btn svg { width: 18px; height: 18px; fill: #555; transition: fill 0.2s; }`);

css = css.replace(/\.header-btn:hover\s*svg\s*\{[\s\S]*?\}/, 
`.header-btn:hover svg { fill: var(--primary-color); }`);

// Info Popup
css = css.replace(/\.popup-container\s*\{[\s\S]*?\}/, 
`.popup-container {
    position: fixed; bottom: 30px; right: 30px;
    width: 320px; background: #ffffff;
    border-radius: 12px; z-index: 1000;
    box-shadow: 0 10px 40px rgba(0,0,0,0.08);
    border: 1px solid var(--border-color);
    padding: 25px; transform: translateY(20px); opacity: 0; pointer-events: none;
    transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}`);

css = css.replace(/\.popup-container\s*h2\s*\{[\s\S]*?\}/, 
`.popup-container h2 { font-family: 'Outfit', sans-serif; font-size: 18px; color: #222; margin-bottom: 10px; font-weight: 700; padding-right: 20px; }`);

css = css.replace(/\.popup-container\s*p\s*\{[\s\S]*?\}/, 
`.popup-container p { font-size: 13px; color: #555; line-height: 1.6; }`);

// Minimap
css = css.replace(/\.minimap-container\s*\{[\s\S]*?\}/, 
`.minimap-container {
    position: fixed; top: 90px; right: 20px;
    width: 400px; height: 440px;
    background: #ffffff; border-radius: 12px;
    box-shadow: 0 15px 35px rgba(0,0,0,0.1);
    border: 1px solid var(--border-color);
    z-index: 1050; opacity: 0; pointer-events: none;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex; flex-direction: column;
    transform: translateX(120%);
}`);

css = css.replace(/\.minimap-container\s*h3\s*\{[\s\S]*?\}/, 
`.minimap-container h3 {
    font-family: 'Outfit', sans-serif; padding: 15px 20px; margin: 0;
    font-size: 15px; border-bottom: 1px solid #f0f0f0;
    color: var(--primary-color); font-weight: 700;
}`);

css = css.replace(/\.map-wrapper\s*\{[\s\S]*?\}/, 
`.map-wrapper {
    flex: 1; position: relative; overflow: hidden; margin: 15px;
    border-radius: 8px; background: #f8f9fa; border: 1px solid var(--border-color);
}`);

// S-Link Red Map specific
css = css.replace(/\.map-abstract-bg\s*\{[\s\S]*?\}/g, 
`.map-abstract-bg {
    position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background-color: #fdfdfd;
    background-image: 
        linear-gradient(#f0f0f0 1px, transparent 1px),
        linear-gradient(90deg, #f0f0f0 1px, transparent 1px);
    background-size: 20px 20px;
}`);

// Map Blocks S-Link styling 
// Cleanest look: soft shadow blocks, white bg, thin borders
css = css.replace(/\.custom-floorplan\s*\.block\s*\{[\s\S]*?\}/g, 
`.custom-floorplan .block {
    position: absolute;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    box-shadow: 0 2px 6px rgba(0,0,0,0.02);
    /* HIDDEN TEXT STILL */
    color: transparent !important;
    font-size: 0 !important;
    text-shadow: none !important;
}`);

// Delete all those messy specific classes if we just want clean layout
// Let's just override background for map points
css = css.replace(/\.map-point\s*\{[\s\S]*?\}/, 
`.map-point {
    background: #aab; border-color: #fff;
    opacity: 0.9; box-shadow: 0 0 5px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}`);

css = css.replace(/\.map-point\.active\s*\{[\s\S]*?\}/, 
`.map-point.active {
    background: var(--primary-color);
    border-color: #fff;
    box-shadow: 0 0 0 4px rgba(227,27,35,0.2);
    opacity: 1;
    transform: translate(-50%, -50%) scale(1.3);
}`);

css = css.replace(/\.map-point\.active::before\s*\{[\s\S]*?\}/, 
`.map-point.active::before { display: none; } /* remove ping if too annoying */`);

css = css.replace(/\.map-label\s*\{[\s\S]*?\}/, 
`.map-label {
    color: #fff; background: #333;
    border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    font-size: 11px; font-weight: 600; padding: 4px 8px; border-radius: 4px;
}`);

fs.writeFileSync(path + 'style.css', css);

let html = fs.readFileSync(path + 'tour.html', 'utf8');
html = html.replace(/app\.js\?v=\d+/g, 'app.js?v=21');
html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=21');
fs.writeFileSync(path + 'tour.html', html);

console.log('Complete rewrite of style.css to S-Link Light theme.');
