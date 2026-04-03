const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';

// 1. App.js Updates
let appJs = fs.readFileSync(path + 'app.js', 'utf8');

// Replace the toggleSound function entirely!
const toggleSoundRegex = /function toggleSound\(\) \{[\s\S]*?\}/;
const newToggleSound = `
let audioStarted = false;
let audioMuted = true; // Started muted by default before click
const SvgSoundOn = '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>';
const SvgSoundOff = '<svg viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>';

function toggleSound() {
    const btn = document.getElementById('sound-btn');
    if (!audioStarted) {
        // 0 = loop forever
        krpano.call("playsound(bgm, 'https://res.cloudinary.com/dwekftmad/video/upload/v1773977375/sound_gpu146.mp3', 0);");
        audioStarted = true;
        audioMuted = false;
        if(btn) {
            btn.innerHTML = SvgSoundOn;
            btn.classList.add('playing');
        }
        return;
    }
    
    audioMuted = !audioMuted;
    if (audioMuted) {
        krpano.call("pausesound(bgm);");
        if(btn) {
            btn.innerHTML = SvgSoundOff;
            btn.classList.remove('playing');
        }
    } else {
        krpano.call("resumesound(bgm);");
        if(btn) {
            btn.innerHTML = SvgSoundOn;
            btn.classList.add('playing');
        }
    }
}
`;
appJs = appJs.replace(toggleSoundRegex, newToggleSound.trim());

// Initial button state should be OFF visually until they click it, or we could leave it on and let them click.
// We'll replace the appJs content
fs.writeFileSync(path + 'app.js', appJs);


// 2. Style.css Updates
// We will replace the .minimap-container CSS rule entirely!
let styleCss = fs.readFileSync(path + 'style.css', 'utf8');

const newCSS = `
/* --- MINIMAP --- */
.minimap-container {
    position: fixed;
    top: 90px;
    right: 20px;
    width: 320px;
    height: 380px;
    background: rgba(15, 15, 15, 0.7);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    z-index: 1050; /* Above pano, below popups */
    opacity: 0;
    pointer-events: none;
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    flex-direction: column;
    box-shadow: 0 15px 35px rgba(0,0,0,0.4);
    transform: translateX(120%);
}

.minimap-container.active {
    opacity: 1;
    pointer-events: auto;
    transform: translateX(0);
}

.minimap-container h3 {
    font-family: 'Outfit', sans-serif;
    padding: 15px;
    margin: 0;
    font-size: 15px;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    text-align: left;
    letter-spacing: 0.5px;
    color: var(--primary-color);
}

.minimap-container .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: transparent;
    border: none;
    width: 24px;
    height: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: var(--transition-smooth);
}

.minimap-container .close-btn:hover {
    transform: scale(1.1);
    background: rgba(227, 27, 35, 0.2);
    border-radius: 5px;
}

.minimap-container .close-btn svg {
    width: 14px;
    height: 14px;
    fill: var(--text-dim);
}

.map-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
    margin: 10px;
    border-radius: 10px;
    background: radial-gradient(circle at 50% 50%, rgba(227, 27, 35, 0.15) 0%, rgba(5, 5, 5, 0.8) 100%);
    border: 1px solid rgba(255, 255, 255, 0.05);
}

.map-abstract-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,255,255,0.02) 20px),
                repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(255,255,255,0.02) 20px);
}

.map-point {
    position: absolute;
    width: 12px;
    height: 12px;
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid rgba(255,255,255,0.7);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: var(--transition-smooth);
    z-index: 2;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
}

.map-point:hover {
    transform: translate(-50%, -50%) scale(1.5);
    background: #fff;
}

.map-point.active {
    background: var(--primary-color);
    border-color: #fff;
    transform: translate(-50%, -50%) scale(1.4);
    box-shadow: 0 0 15px var(--primary-color), 0 0 5px #fff;
}

.map-point::before {
    content: '';
    position: absolute;
    top: -8px; left: -8px; right: -8px; bottom: -8px;
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    opacity: 0;
    animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
    display: none;
}

.map-point.active::before {
    display: block;
}

@keyframes ping {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
}

.map-label {
    position: absolute;
    top: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.9);
    padding: 3px 6px;
    border-radius: 4px;
    font-size: 10px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    border: 1px solid rgba(255,255,255,0.1);
    color: #fff;
}

.map-point:hover .map-label, .map-point.active .map-label {
    opacity: 1;
}

/* Add sound playing pulse */
#sound-btn.playing {
    border-color: var(--primary-color);
    background: rgba(227, 27, 35, 0.1);
}
#sound-btn.playing svg {
    fill: var(--primary-color);
}
#sound-btn.playing::before {
    content: '';
    position: absolute;
    width: 38px; height: 38px;
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    animation: ripple 2s infinite;
}
@keyframes ripple {
    0% { transform: scale(0.9); opacity: 1; }
    100% { transform: scale(1.5); opacity: 0; }
}
`;

// Replace from `/* --- MINIMAP --- */` to the end of the file except `/* Mobile Responsiveness */`
// Actually, it's safer to just split by `/* --- MINIMAP --- */`
const parts = styleCss.split('/* --- MINIMAP --- */');
if(parts.length > 1) {
    // We already added minimap css
    // I will replace all MINIMAP styles and the media query at the end
    const topPart = parts[0];
    
    // Create new content
    const finalCss = topPart + newCSS + `
/* Mobile Responsiveness */
@media (max-width: 1024px) {
    .app-container {
        grid-template-areas: 
            "header"
            "main";
        grid-template-columns: 1fr;
        grid-template-rows: var(--header-height) 1fr;
    }
    .app-sidebar {
        position: fixed;
        left: -100%;
        top: 0;
        height: 100vh;
        width: 280px;
    }
    .app-sidebar.open {
        left: 0;
    }
    .minimap-container {
        top: auto;
        bottom: 20px;
        right: 20px;
        width: 280px;
        height: 300px;
    }
}
`;
    fs.writeFileSync(path + 'style.css', finalCss);
    console.log("Updated style.css and app.js UI logic");
}

