const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
const cssPath = path + 'style.css';
const htmlPath = path + 'tour.html';

let css = fs.readFileSync(cssPath, 'utf8');

// Update map-abstract-bg
css = css.replace(
`.map-abstract-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    /* Soft dark tech grid overlay */
    background-color: #0c0c0c;
    background-image: 
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 20px 20px;
}`,
`.map-abstract-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
        linear-gradient(rgba(227,27,35,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(227,27,35,0.08) 1px, transparent 1px);
    background-size: 20px 20px;
}`
);

// Update map-wrapper background
css = css.replace(
    'background: radial-gradient(circle at 30% 30%, rgba(227, 27, 35, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);',
    'background: radial-gradient(circle at 50% 50%, #3a0a0c 0%, #0d0102 100%);'
);

// Update block backgrounds
css = css.replace(
    'background: rgba(255, 255, 255, 0.12);',
    'background: rgba(227, 27, 35, 0.15);'
);
css = css.replace(
    'border: 1px solid rgba(255, 255, 255, 0.4);',
    'border: 1px solid rgba(227, 27, 35, 0.4);'
);
css = css.replace(
    'border-top: 1px solid rgba(255, 255, 255, 0.1);',
    'border-top: 1px solid rgba(227, 27, 35, 0.4);'
);

// Update active dot color to white to contrast with red background
css = css.replace(
    'background: var(--primary-color);',
    'background: #ffffff;'
);
css = css.replace(
    'box-shadow: 0 0 15px var(--primary-color), 0 0 5px #fff;',
    'box-shadow: 0 0 15px #ffffff, 0 0 5px #fff;'
);

fs.writeFileSync(cssPath, css);

let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/app\.js\?v=\d+/g, 'app.js?v=16');
html = html.replace(/style\.css\?v=\d+/g, 'style.css?v=16');
fs.writeFileSync(htmlPath, html);

console.log("Applied PTIT Red theme to map");
