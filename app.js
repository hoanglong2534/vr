/**
 * PTIT VIRTUAL TOUR - Application Controller
 * Manages the web interface, sidebar navigation, and KRpano integration.
 */

// Data for the popup information
const sceneData = {
    'scene_1': { 
        title: 'Cổng trường', 
        description: 'Cổng chính Học viện Công nghệ Bưu chính Viễn thông.', 
        roomType: 'Khu vực ngoài trời',
        purpose: 'Lối vào chính và đón tiếp khách tham quan.',
        lessons: ['Giới thiệu lịch sử Học viện', 'Hướng dẫn tham quan'],
        thumb: 'panos/1.tiles/thumb.jpg' 
    },
    'scene_gpbk2222_1773131201563': { 
        title: 'Tầng 1 Tòa A1', 
        description: 'Khu vực hành lang PTIT x NAVER AI Center bên trong Tòa A1.', 
        roomType: 'Trung tâm Nghiên cứu',
        purpose: 'Nghiên cứu về Trí tuệ nhân tạo (AI) và Học máy.',
        lessons: ['Xử lý ngôn ngữ tự nhiên', 'Thị giác máy tính (Computer Vision)'],
        thumb: 'panos/GPBK2222_1773131201563.tiles/thumb.jpg' 
    },
    'scene_gpbk2202_1773130555661': { 
        title: 'Sảnh Thư viện PTIT', 
        description: 'Khu vực đón tiếp và tra cứu thông tin tại Thư viện.', 
        roomType: 'Thư viện',
        purpose: 'Tra cứu tài liệu, mượn trả sách và hỗ trợ sinh viên.',
        lessons: ['Kỹ năng tra cứu thông tin', 'Quản lý tài nguyên số'],
        thumb: 'panos/GPBK2202_1773130555661.tiles/thumb.jpg' 
    },
    'scene_gpbk2203_1773130660359': { 
        title: 'Khu vực tự học Thư viện', 
        description: 'Không gian yên tĩnh dành cho sinh viên học tập nhóm và cá nhân.', 
        roomType: 'Phòng tự học',
        purpose: 'Học tập tập trung, thảo luận nhóm.',
        lessons: ['Học tập chủ động', 'Làm việc nhóm hiệu quả'],
        thumb: 'panos/GPBK2203_1773130660359.tiles/thumb.jpg' 
    },
    'scene_gpbk2237_1773200161431': { 
        title: 'Phòng học Tòa A3', 
        description: 'Phòng học tiêu chuẩn với trang thiết bị hiện đại.', 
        roomType: 'Phòng học lý thuyết',
        purpose: 'Giảng dạy các môn cơ sở ngành và chuyên ngành.',
        lessons: ['Cấu trúc dữ liệu và giải thuật', 'Mạng máy tính'],
        thumb: 'panos/GPBK2237_1773200161431.tiles/thumb.jpg' 
    },
    'scene_gpbk2246_1773200419767': { 
        title: 'Hội trường Tòa A2', 
        description: 'Không gian tổ chức các sự kiện lớn của Học viện.', 
        roomType: 'Hội trường lớn',
        purpose: 'Tổ chức hội thảo, lễ khai giảng, các cuộc thi sinh viên.',
        lessons: ['Kỹ năng thuyết trình', 'Quản trị sự kiện'],
        thumb: 'panos/GPBK2246_1773200419767.tiles/thumb.jpg' 
    },
    'scene_gpbk2270_1773201080635': { 
        title: 'Phòng Lab TT ĐTQT', 
        description: 'Phòng máy tính cấu hình cao phục vụ đào tạo quốc tế.', 
        roomType: 'Phòng thực hành (Lab)',
        purpose: 'Thực hành lập trình, an toàn thông tin.',
        lessons: ['An toàn mạng (Network Security)', 'Phát triển ứng dụng Web'],
        thumb: 'panos/GPBK2270_1773201080635.tiles/thumb.jpg' 
    },
    'scene_gpbk2276_1773201234482': { 
        title: 'TT Khởi nghiệp ĐMST', 
        description: 'Nơi ươm mầm các ý tưởng khởi nghiệp sáng tạo.', 
        roomType: 'Trung tâm Khởi nghiệp',
        purpose: 'Hỗ trợ các nhóm khởi nghiệp, tổ chức workshop.',
        lessons: ['Tư duy thiết kế (Design Thinking)', 'Khởi nghiệp tinh gọn'],
        thumb: 'panos/GPBK2276_1773201234482.tiles/thumb.jpg' 
    },
    'scene_cau_thang_len_tang3_a3': { title: 'Tầng 3 Tòa A3', description: 'Cầu thang đi lên tầng 3 A3.', thumb: 'panos/cau_thang_len_tang3_A3.tiles/thumb.jpg' },
    'scene_hpgnh_lang_ttgnng3_a3': { title: 'Tầng 3 Tòa A3', description: 'Hành lang tầng 3 A3.', thumb: 'panos/hpgnh_lang_ttgnng3_a3.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng3_a3_phtgji': { title: 'Tầng 3 Tòa A3', description: 'Hành lang tầng 3 A3.', thumb: 'panos/stgjnh_ttgnng3_a3_phtgji.tiles/thumb.jpg' },
    'scene_phpyng_hthnc_ttgnng3a3_1': { title: 'Tầng 3 Tòa A3', description: 'Phòng học tầng 3 A3.', thumb: 'panos/phpyng_hthnc_ttgnng3a3_1.tiles/thumb.jpg' },
    'scene_phpyng_hthnc_ttgnng3a3_2': { title: 'Tầng 3 Tòa A3', description: 'Phòng học tầng 3 A3.', thumb: 'panos/phpyng_hthnc_ttgnng3a3_2.tiles/thumb.jpg' },
    'scene_ttgnng3_a3_nthri_qua_a2jpg': { title: 'Tầng 3 Tòa A3', description: 'Hành lang tầng 3 A3.', thumb: 'panos/ttgnng3_a3_nthri_qua_a2JPG.tiles/thumb.jpg' },
    'scene_ctgnu_thang_bpqn_a3': { title: 'Cầu thang Tòa A2', description: 'Cầu thang nối với Tòa A2.', thumb: 'panos/ctgnu_thang_bpqn_A3.tiles/thumb.jpg' },
    'scene_ctgnu_thang_bpqn_a2': { title: 'Cầu thang Tòa A3', description: 'Cầu thang nối với Tòa A3.', thumb: 'panos/ctgnu_thang_bpqn_A2.tiles/thumb.jpg' },
    'scene_ttgnng_3_qri_lpqn_ttgnng_6': { title: 'Tầng 6 Tòa A3', description: 'Cầu thang đi lên tầng 6 A3.', thumb: 'panos/ttgnng_3_qri_lpqn_ttgnng_6.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng_6_a3_trphi': { title: 'Tầng 6 Tòa A3', description: 'Hành lang tầng 6 A3.', thumb: 'panos/stgjnh_ttgnng_6_a3_trphi.tiles/thumb.jpg' },
    'scene_gpzc_tping_6_a3_trphi': { title: 'Tầng 6 Tòa A3', description: 'Hành lang tầng 6 A3.', thumb: 'panos/gpzc_tping_6_a3_trphi.tiles/thumb.jpg' },
    'scene_hpgnh_lang_ttgnng6a3_githva_phtgji': { title: 'Tầng 6 Tòa A3', description: 'Hành lang tầng 6 A3.', thumb: 'panos/hpgnh_lang_ttgnng6A3_githva_phtgji.tiles/thumb.jpg' },
    'scene_gpzc_ttgnng6_a3_phtgji': { title: 'Tầng 6 Tòa A3', description: 'Hành lang tầng 6 A3.', thumb: 'panos/gpzc_ttgnng6_a3_phtgji.tiles/thumb.jpg' },
    'scene_gpzc_ttgnng2a2_nthri_ctgnu_thang': { title: 'Tầng 2 Tòa A2', description: 'Hành lang tầng 2 A2.', thumb: 'panos/gpzc_ttgnng2A2_nthri_ctgnu_thang.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng2a2_sau': { title: 'Tầng 2 Tòa A2', description: 'Sảnh tầng 2 A2.', thumb: 'panos/stgjnh_ttgnng2A2_sau.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng2a2_githva': { title: 'Tầng 2 Tòa A2', description: 'Sảnh tầng 2 A2.', thumb: 'panos/stgjnh_ttgnng2A2_githva.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng2a2_trswthbc': { title: 'Tầng 2 Tòa A2', description: 'Sảnh tầng 2 A2.', thumb: 'panos/stgjnh_ttgnng2A2_trswthbc.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng2a2_gpzc_phtgji_trswthbc': { title: 'Tầng 2 Tòa A2', description: 'Hành lang tầng 2 A2.', thumb: 'panos/stgjnh_ttgnng2A2_gpzc_phtgji_trswthbc.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng2a2_gpzc_trphi_trswthbc': { title: 'Tầng 2 Tòa A2', description: 'Hành lang tầng 2 A2.', thumb: 'panos/stgjnh_ttgnng2A2_gpzc_trphi_trswthbc.tiles/thumb.jpg' },
    'scene_phpyng_hthnc_ttgnng_2a2': { title: 'Tầng 2 Tòa A2', description: 'Phòng học tầng 2 A2.', thumb: 'panos/phpyng_hthnc_ttgnng_2A2.tiles/thumb.jpg' },
    'scene_stgjnh_ttgnng2a2_trphi_truocwx': { title: 'Tầng 2 Tòa A2', description: 'Hành lang tầng 2 A2.', thumb: 'panos/stgjnh_ttgnng2A2_trphi_truocwx.tiles/thumb.jpg' },
    'scene_ttgnng2a2_trphi_sau': { title: 'Tầng 2 Tòa A2', description: 'Hành lang tầng 2 A2.', thumb: 'panos/ttgnng2a2_trphi_sau.tiles/thumb.jpg' },
    'scene_gpbk2245_1773200385434': { title: 'Sảnh Hội trường A2', description: 'Sảnh Hội trường A2.', thumb: 'panos/GPBK2245_1773200385434.tiles/thumb.jpg' },
    'scene_gpbk0066_1773206449967': { title: 'Bên trong Hội quán A2', description: 'Bên trong hội quán A2.', thumb: 'panos/GPBK0066_1773206449967.tiles/thumb.jpg' },
    'scene_gpbk2208_1773130810995': { title: 'Tầng G Tòa A2', description: 'Sảnh tầng G Tòa A2.', thumb: 'panos/GPBK2208_1773130810995.tiles/thumb.jpg' },
    'scene_gpbk2209_1773130847752': { title: 'Tầng G Tòa A2', description: 'Sảnh tầng G Tòa A2.', thumb: 'panos/GPBK2209_1773130847752.tiles/thumb.jpg' },
    'scene_gpbk2247_1773200444397': { title: 'Cầu thang Tòa A1', description: 'Cầu thang nối với Tòa A1.', thumb: 'panos/GPBK2247_1773200444397.tiles/thumb.jpg' },
    'scene_vswthdn_nhtgtt_1': { title: 'Khu vườn Nhật', description: 'Khu vườn Nhật tầng 3 A2.', thumb: 'panos/vswthdn_nhtgtt_1.tiles/thumb.jpg' },
    'scene_vswthdn_nhtgtt_2': { title: 'Khu vườn Nhật', description: 'Khu vườn Nhật tầng 3 A2.', thumb: 'panos/vswthdn_nhtgtt_2.tiles/thumb.jpg' },
};


let krpano = null;


/**
 * KRpano onready callback
 */
function onready(krpano_interface) {
    krpano = krpano_interface;
    console.log("KRpano Integrated Successfully");
    initSidebar();
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
        const countBadge = `<span class="badge">${groupScenes.length}</span>`;
        header.innerHTML = `<span>${title} ${countBadge}</span> <span class="accordion-icon">▼</span>`;
        
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
             item.id = `nav-${scene.sceneName}`;
             
             let label = groupScenes.length > 1 ? `Góc ${index + 1}` : 'Xem';
             
             item.innerHTML = `
                 <div class="thumb-wrapper">
                     <img src="${scene.thumb}" alt="${scene.title}">
                     <span class="scene-label">${label}</span>
                 </div>
             `;
             
             item.onclick = () => {
                 krpano.call(`loadscene(${scene.sceneName}, null, MERGE, BLEND(1.0))`);
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
 * Callback from KRpano on scene change
 */
function handleSceneChange(sceneName) {
    console.log("Active Scene:", sceneName);

    // Update Sidebar highlighting
    document.querySelectorAll('.scene-item').forEach(el => el.classList.remove('active'));
    
    // Mark active scene
    const activeItem = document.getElementById(`nav-${sceneName}`);
    if (activeItem) {
        activeItem.classList.add('active');
        const groupContainer = activeItem.closest('.accordion-group');
        if (groupContainer && !groupContainer.classList.contains('expanded')) {
            groupContainer.classList.add('expanded');
        }
        groupContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Update data for popup
    const data = sceneData[sceneName] || {
        title: krpano.get(`scene[${sceneName}].title`) || sceneName,
        description: 'Thông tin chi tiết đang được cập nhật...'
    };

    const popup = document.getElementById('info-popup');
    if (popup) {
        document.getElementById('popup-title').innerText = data.title;
        document.getElementById('popup-desc').innerText = data.description || 'Thông tin chi tiết đang được cập nhật...';
        
        const typeEl = document.getElementById('popup-type');
        const purposeEl = document.getElementById('popup-purpose');
        const lessonsEl = document.getElementById('popup-lessons');
        
        if (typeEl) typeEl.innerText = data.roomType || 'PTIT Virtual Tour';
        if (purposeEl) purposeEl.innerText = data.purpose || 'Tham quan khuôn viên Học viện';
        
        if (lessonsEl) {
            lessonsEl.innerHTML = '';
            if (data.lessons && data.lessons.length > 0) {
                data.lessons.forEach(lesson => {
                    const li = document.createElement('li');
                    li.innerText = lesson;
                    lessonsEl.appendChild(li);
                });
            } else {
                lessonsEl.innerHTML = '<li>Đang cập nhật...</li>';
            }
        }

        const imgEl = document.getElementById('popup-img');
        if (imgEl) imgEl.src = data.thumb || `panos/${sceneName.replace('scene_', '')}.tiles/thumb.jpg`;
    }
}

/**
 * Modal Management
 */
function openInfo() {
    document.getElementById('info-popup').classList.add('active');
    document.getElementById('popup-overlay').classList.add('active');
}

function closeInfo() {
    document.getElementById('info-popup').classList.remove('active');
    document.getElementById('popup-overlay').classList.remove('active');
}

function toggleInfo() {
    const popup = document.getElementById('info-popup');
    if (popup.classList.contains('active')) {
        closeInfo();
    } else {
        openInfo();
    }
}

/**
 * UI Controls
 */
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

function toggleFullscreen() {
    krpano.call("switch(fullscreen)");
}

function toggleSidebar() {
    const container = document.querySelector('.app-container');
    container.classList.toggle('sidebar-collapsed');
}


// Event Listeners initialization
document.addEventListener('DOMContentLoaded', () => {
    // Info Modal
    const closeBtn = document.querySelector('.close-btn');
    const overlay = document.getElementById('popup-overlay');
    if (closeBtn) closeBtn.addEventListener('click', closeInfo);
    if (overlay) overlay.addEventListener('click', closeInfo);

    // Bottom Controls
    const soundBtn = document.getElementById('sound-btn');
    const fsBtn = document.getElementById('fs-btn');
    const infoBtn = document.getElementById('info-btn');
    
    if (soundBtn) soundBtn.addEventListener('click', toggleSound);
    if (fsBtn) fsBtn.addEventListener('click', toggleFullscreen);
    if (infoBtn) infoBtn.addEventListener('click', toggleInfo);

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
});

// Exposed for KRpano
window.handleSceneChange = handleSceneChange;
window.onready = onready;
