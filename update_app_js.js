const fs = require('fs');
const file = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/app.js';
let content = fs.readFileSync(file, 'utf8');

const replacement = `
let krpano = null;

// Abstract map coordinates (Percentages 0-100)
// This will render visual dots on the minimap overlay.
const mapNodes = [
    { title: 'Cổng trường', x: 50, y: 90 },
    { title: 'Sân trường', x: 50, y: 70 },
    { title: 'Sân bóng rổ', x: 65, y: 80 },
    { title: 'Hội trường', x: 80, y: 75 },
    
    // We match any title that includes these keywords for Tòa
    { match: 'Tòa A1', title: 'Tòa A1', x: 35, y: 60 },
    { match: 'Tòa A2', title: 'Tòa A2', x: 65, y: 60 },
    { match: 'Tòa A3', title: 'Tòa A3', x: 65, y: 40 },
    
    { title: 'Thư viện PTIT', x: 25, y: 65 },
    { title: 'Khu vực cây xanh', x: 25, y: 55 },
    
    { title: 'Trung tâm khởi nghiệp Đổi mới sáng tạo', x: 15, y: 55 },
    { title: 'Sân bóng chuyền', x: 15, y: 75 },
    { title: 'Dãy nhà B14', x: 30, y: 30 },
    { title: 'Nhà xe sinh viên', x: 75, y: 85 },
    { title: 'Nhà ăn Học viện', x: 45, y: 20 },
    { title: 'TT ĐTQT', x: 80, y: 50 },
    { title: 'Ký túc xá B1', x: 85, y: 30 },
    { title: 'Ký túc xá B5', x: 85, y: 15 },
    { title: 'I love PTIT', x: 50, y: 80 }
];

/**
 * KRpano onready callback
 */
function onready(krpano_interface) {
    krpano = krpano_interface;
    console.log("KRpano Integrated Successfully");
    initSidebar();
    initMinimap();
}

/**
 * Initialize the Sidebar with accordions
 */
function initSidebar() {
    const list = document.getElementById('scene-list');
    list.innerHTML = ''; // Clear existing

    // Grouping scenes by title
    const groups = {};
    Object.keys(sceneData).forEach(sceneName => {
        const data = sceneData[sceneName];
        if (!groups[data.title]) {
            groups[data.title] = [];
        }
        groups[data.title].push({ sceneName, ...data });
    });

    // Render accordions
    Object.keys(groups).forEach(title => {
        const groupScenes = groups[title];
        
        const groupContainer = document.createElement('div');
        groupContainer.className = 'accordion-group';
        // We can add an id mapping for easier access later
        groupContainer.dataset.group = title;
        
        const header = document.createElement('div');
        header.className = 'accordion-header';
        
        // Show count of scenes inside
        const countBadge = \`<span class="badge">\${groupScenes.length}</span>\`;
        header.innerHTML = \`<span>\${title} \${countBadge}</span> <span class="accordion-icon">▼</span>\`;
        
        const body = document.createElement('div');
        body.className = 'accordion-body';
        
        header.onclick = () => {
             groupContainer.classList.toggle('expanded');
        };

        // Grid container for thumbnails to save space
        const grid = document.createElement('div');
        grid.className = 'scene-grid';

        groupScenes.forEach((scene, index) => {
             const item = document.createElement('div');
             item.className = 'scene-item';
             item.id = \`nav-\${scene.sceneName}\`;
             
             let label = groupScenes.length > 1 ? \`Góc \${index + 1}\` : 'Xem';
             
             item.innerHTML = \`
                 <div class="thumb-wrapper">
                     <img src="\${scene.thumb}" alt="\${scene.title}">
                     <span class="scene-label">\${label}</span>
                 </div>
             \`;
             
             item.onclick = () => {
                 krpano.call(\`loadscene(\${scene.sceneName}, null, MERGE, BLEND(1.0))\`);
             };
             
             grid.appendChild(item);
        });

        body.appendChild(grid);
        groupContainer.appendChild(header);
        groupContainer.appendChild(body);
        list.appendChild(groupContainer);
    });
}

/**
 * Initialize HTML Minimap Points
 */
function initMinimap() {
    const mapNodesContainer = document.getElementById('map-nodes');
    if (!mapNodesContainer) return;

    mapNodesContainer.innerHTML = ''; // prevent duplicates

    // Create SVG lines (Optional: create standard paths)
    // For simplicity, just rendering floating nodes

    mapNodes.forEach((node, i) => {
        const point = document.createElement('div');
        point.className = 'map-point';
        point.style.left = \`\${node.x}%\`;
        point.style.top = \`\${node.y}%\`;
        point.dataset.title = node.title;
        if(node.match) point.dataset.match = node.match;

        const label = document.createElement('span');
        label.className = 'map-label';
        label.innerText = node.title;
        
        point.appendChild(label);
        
        // On click, navigate to the first scene of this location
        point.onclick = () => {
            const scenes = Object.keys(sceneData).filter(s => {
                const sName = sceneData[s].title;
                if(node.match) return sName.includes(node.match);
                return sName === node.title;
            });
            if (scenes.length > 0) {
                krpano.call(\`loadscene(\${scenes[0]}, null, MERGE, BLEND(1.0))\`);
                toggleMap(); // Auto close map on mobile optionally
            }
        };

        mapNodesContainer.appendChild(point);
    });
}

function updateMinimap(currentTitle) {
    document.querySelectorAll('.map-point').forEach(pt => pt.classList.remove('active'));
    
    // Find matching node
    let activePt = null;
    document.querySelectorAll('.map-point').forEach(pt => {
        const matchKeyword = pt.dataset.match;
        const titleExact = pt.dataset.title;
        if (matchKeyword && currentTitle.includes(matchKeyword)) {
            activePt = pt;
        } else if (titleExact === currentTitle) {
            activePt = pt;
        }
    });

    if (activePt) {
        activePt.classList.add('active');
    }
}

/**
 * Callback from KRpano on scene change
 */
function handleSceneChange(sceneName) {
    console.log("Active Scene:", sceneName);

    // Update Sidebar highlighting
    document.querySelectorAll('.scene-item').forEach(el => el.classList.remove('active'));
    
    // Mark active scene
    const activeItem = document.getElementById(\`nav-\${sceneName}\`);
    if (activeItem) {
        activeItem.classList.add('active');
        
        // Expand the parent group
        const groupContainer = activeItem.closest('.accordion-group');
        if (groupContainer && !groupContainer.classList.contains('expanded')) {
            groupContainer.classList.add('expanded');
        }

        // Scroll group into view gracefully
        groupContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Auto-open Info Popup and update minimap if data exists
    if (sceneData[sceneName]) {
        openInfo();
        updateMinimap(sceneData[sceneName].title);
    } else {
        closeInfo();
    }
}

/**
 * Modal Management
 */
function openInfo() {
    const sceneName = krpano.get("xml.scene");
    const data = sceneData[sceneName];

    if (data) {
        document.getElementById('popup-title').innerText = data.title;
        document.getElementById('popup-desc').innerText = data.description;

        document.getElementById('info-popup').classList.add('active');
        document.getElementById('popup-overlay').classList.add('active');
    }
}

function closeInfo() {
    document.getElementById('info-popup').classList.remove('active');
    document.getElementById('popup-overlay').classList.remove('active');
}

/**
 * UI Controls
 */
function toggleSound() {
    const muted = krpano.get("plugin[soundinterface].muted");
    krpano.set("plugin[soundinterface].muted", !muted);
}

function toggleFullscreen() {
    krpano.call("switch(fullscreen)");
}

function toggleSidebar() {
    const container = document.querySelector('.app-container');
    container.classList.toggle('sidebar-collapsed');
}

function toggleMap() {
    const map = document.getElementById('minimap-modal');
    map.classList.toggle('active');
}

// Event Listeners initialization
document.addEventListener('DOMContentLoaded', () => {
    // Info Modal
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.getElementById('popup-overlay');
    if (closeBtn) closeBtn.addEventListener('click', closeInfo);
    if (overlay) overlay.addEventListener('click', closeInfo);

    // Bottom Controls (Map toggler added here or header)
    const soundBtn = document.getElementById('sound-btn');
    const fsBtn = document.getElementById('fs-btn');
    // Find map btn if exists, otherwise we'll wire it when created
    const mapBtn = document.getElementById('map-btn');
    
    if (soundBtn) soundBtn.addEventListener('click', toggleSound);
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
    if (mapBtn) mapBtn.addEventListener('click', toggleMap);

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
    
    // Map overlay close
    const mapClose = document.getElementById('map-close');
    if (mapClose) mapClose.addEventListener('click', toggleMap);
});

// Exposed for KRpano
window.handleSceneChange = handleSceneChange;
window.onready = onready;
`;

const splitted = content.split('let krpano = null;');
const newCode = splitted[0] + replacement;

fs.writeFileSync(file, newCode);
console.log("Patched app.js successfully");
