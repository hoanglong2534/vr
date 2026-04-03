const fs = require('fs');
const file = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/style.css';
let content = fs.readFileSync(file, 'utf8');

const additionalCSS = `
/* --- ACCORDION LIST --- */
.accordion-group {
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    margin-bottom: 5px;
}

.accordion-header {
    padding: 12px 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-color);
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    transition: var(--transition-smooth);
}

.accordion-header:hover {
    background: rgba(255, 255, 255, 0.08);
}

.accordion-header .badge {
    background: rgba(227, 27, 35, 0.2);
    color: var(--primary-color);
    font-size: 11px;
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: 8px;
    font-weight: 700;
}

.accordion-icon {
    font-size: 10px;
    transition: transform 0.3s ease;
}

.accordion-group.expanded .accordion-icon {
    transform: rotate(180deg);
}

.accordion-body {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease;
    padding: 0 5px;
}

.accordion-group.expanded .accordion-body {
    max-height: 2500px;
    padding-top: 10px;
    padding-bottom: 15px;
}

.scene-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
}

.scene-grid .scene-item {
    padding: 0;
    margin: 0;
    background: transparent;
    border: 2px solid transparent;
}

.scene-grid .scene-item.active {
    border-color: var(--primary-color);
    background: transparent;
}

.scene-grid .thumb-wrapper {
    aspect-ratio: 16/9;
}

.scene-label {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 11px;
    text-align: center;
    padding: 4px 0;
    font-weight: 500;
}

/* --- MINIMAP --- */
.minimap-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.9);
    width: 80vw;
    height: 80vh;
    max-width: 800px;
    max-height: 600px;
    background: rgba(15, 15, 15, 0.9);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    z-index: 3000;
    opacity: 0;
    pointer-events: none;
    transition: var(--transition-smooth);
    display: flex;
    flex-direction: column;
    box-shadow: 0 20px 50px rgba(0,0,0,0.7);
}

.minimap-container.active {
    opacity: 1;
    pointer-events: auto;
    transform: translate(-50%, -50%) scale(1);
}

.minimap-container h3 {
    font-family: 'Outfit', sans-serif;
    padding: 20px;
    margin: 0;
    border-bottom: 1px solid var(--glass-border);
    text-align: center;
    letter-spacing: 1px;
}

.minimap-container .close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.2);
    border-radius: 50%;
    width: 32px;
    height: 32px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: var(--transition-smooth);
}

.minimap-container .close-btn:hover {
    background: var(--primary-color);
    transform: scale(1.1);
}

.minimap-container .close-btn svg {
    width: 16px;
    height: 16px;
    fill: #fff;
}

.map-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
    margin: 20px;
    border-radius: 12px;
    background: radial-gradient(circle at 50% 50%, rgba(227, 27, 35, 0.05) 0%, rgba(0, 0, 0, 0.5) 100%);
    border: 1px dashed rgba(255, 255, 255, 0.1);
}

.map-abstract-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
}

.map-point {
    position: absolute;
    width: 16px;
    height: 16px;
    background: var(--glass-border);
    border: 2px solid #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: var(--transition-smooth);
    z-index: 2;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
}

.map-point:hover {
    transform: translate(-50%, -50%) scale(1.3);
    background: rgba(255, 255, 255, 0.5);
}

.map-point.active {
    background: var(--primary-color);
    border-color: #fff;
    transform: translate(-50%, -50%) scale(1.3);
    box-shadow: 0 0 15px var(--primary-color);
}

.map-point::before {
    content: '';
    position: absolute;
    top: -5px; left: -5px; right: -5px; bottom: -5px;
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    opacity: 0;
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    display: none;
}

.map-point.active::before {
    display: block;
}

@keyframes ping {
    75%, 100% {
        transform: scale(2);
        opacity: 0;
    }
}

.map-label {
    position: absolute;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.8);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
    border: 1px solid var(--glass-border);
}

.map-point:hover .map-label, .map-point.active .map-label {
    opacity: 1;
}
`;

content = content.replace('/* Mobile Responsiveness */', additionalCSS + '\n/* Mobile Responsiveness */');
fs.writeFileSync(file, content);
console.log("Appended CSS successfully");
