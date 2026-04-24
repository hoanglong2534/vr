/**
 * PTIT VIRTUAL TOUR - Application Controller
 * Manages the web interface, sidebar navigation, and KRpano integration.
 */

// Data for the popup information
const sceneData = {
    'scene_1': { 
        title: 'Cổng trường', 
        description: 'Cổng chính Học viện Công nghệ Bưu chính Viễn thông. Nơi đây là bộ mặt của Học viện, mang vẻ đẹp hiện đại và uy nghiêm.', 
        roomType: 'Khu vực ngoài trời',
        purpose: 'Lối vào chính và đón tiếp khách tham quan, sinh viên.',
        lessons: ['Giới thiệu lịch sử Học viện', 'Hướng dẫn tham quan'],
        thumb: 'panos/1.tiles/thumb.jpg' 
    },
    'scene_gpbk2270_1773201080635': { 
        title: 'Phòng Lab CTS', 
        description: 'Phòng nghiên cứu và thực hành chuyên sâu của Lab CTS (Creative Technology Space). Nơi đây tập trung các dự án nghiên cứu về VR/AR/AI.', 
        roomType: 'Phòng thực hành (Lab)',
        purpose: 'Nghiên cứu khoa học, thực hành các công nghệ mới và phát triển các ứng dụng sáng tạo.',
        lessons: ['Thực tế ảo và Thực tế tăng cường (VR/AR)', 'Lập trình ứng dụng 3D'],
        thumb: 'panos/GPBK2270_1773201080635.tiles/thumb.jpg' 
    },
    'scene_gpbk2202_1773130555661': { 
        title: 'Thư viện PTIT', 
        description: 'Không gian học tập và nghiên cứu hiện đại với kho tài liệu phong phú, hệ thống tra cứu thông minh và các khu vực tự học tiện nghi.', 
        roomType: 'Thư viện',
        purpose: 'Tra cứu tài liệu, mượn trả sách, học tập tập trung và hội thảo khoa học.',
        lessons: ['Kỹ năng tra cứu thông tin', 'Quản trị tri thức số'],
        thumb: 'panos/GPBK2202_1773130555661.tiles/thumb.jpg' 
    },
    'scene_gpbk2218_1773131077123': { 
        title: 'Tòa A1', 
        description: 'Tòa nhà điều hành và hành chính trung tâm của Học viện.', 
        roomType: 'Hành chính',
        purpose: 'Nơi làm việc của Ban Giám hiệu và các phòng ban chức năng.',
        thumb: 'panos/GPBK2218_1773131077123.tiles/thumb.jpg'
    },
    'scene_10': { 
        title: 'Tòa A2', 
        description: 'Tòa nhà giảng đường chính với quy mô lớn, nơi diễn ra các buổi học quan trọng.', 
        roomType: 'Giảng đường',
        purpose: 'Giảng dạy và học tập các môn lý thuyết.',
        thumb: 'panos/10.tiles/thumb.jpg'
    },
};

// Sidebar config: define title blocks first, then put scene ids inside each block.
// If left empty, sidebar will auto-group by sceneData[scene].title (legacy behavior).
const sceneGroups = [
  {
    "title": "Cổng trường",
    "scenes": [
      "scene_1"
    ]
  },
  {
    "title": "Tòa A1",
    "scenes": [
      "scene_gpbk2218_1773131077123"
    ]
  },
  {
    "title": "Phòng học A1",
    "scenes": [
      "scene_gpbk2226_1773131353550"
    ]
  },
  {
    "title": "Trung tâm IEC",
    "scenes": [
      "scene_gpbk2224_1773131289876"
    ]
  },
  {
    "title": "Tòa A2",
    "scenes": [
      "scene_10"
    ]
  },
  {
    "title": "Phòng học A2",
    "scenes": [
      "scene_gpbk0065_1773206564173"
    ]
  },
  {
    "title": "Hội trường A2",
    "scenes": [
      "scene_gpbk0066_1773206449967"
    ]
  },
  {
    "title": "Vườn Nhật",
    "scenes": [
      "scene_vswthdn_nhtgtt_1"
    ]
  },
  {
    "title": "Tòa A3",
    "scenes": [
      "scene_gpbk2195_1773130397237"
    ]
  },
  {
    "title": "Phòng học A3",
    "scenes": [
      "scene_gpbk2237_1773200161431"
    ]
  },
  {
    "title": "Thư viện",
    "scenes": [
      "scene_gpbk2202_1773130555661"
    ]
  },
  {
    "title": "Canteen",
    "scenes": [
      "scene_gpbk2282_1773201339253"
    ]
  },
  {
    "title": "Sân bóng rổ",
    "scenes": [
      "scene_gpbk2260_1773200808324"
    ]
  },
  {
    "title": "Sân bóng chuyền",
    "scenes": [
      "scene_gpbk2286_1773201396711"
    ]
  },
  {
    "title": "Lab CTS",
    "scenes": [
      "scene_gpbk2270_1773201080635"
    ]
  }
];

const SCENE_GROUPS_STORAGE_KEY = 'ptit_scene_groups_v1';
let customSceneGroups = null;
let sceneGroupEditorModel = [];
let sceneGroupEditorUI = null;
let draggingGroupIndex = null;

// Hardcoded popup info overrides in source code.
// Put per-scene description / purpose edits here to persist across environments.
const sceneInfoOverridesInCode = {
  "scene_1": {
    "purpose": "Lối vào chính và đón tiếp khách tham quan",
    "description": "Cổng chính Học viện Công nghệ Bưu chính Viễn thông"
  },
  "scene_gpbk2218_1773131077123": {
    "purpose": "Tòa nhà điều hành và hành chính",
    "description": "Nơi làm việc của Ban Giám hiệu, các phòng ban chức năng, phòng học, phòng nghiên cứu"
  },
  "scene_gpbk2226_1773131353550": {
    "purpose": "Phòng học",
    "description": "Hệ thống phòng học hiện đại phục vụ công tác giảng dạy và học tập cho sinh viên các khóa"
  },
  "scene_gpbk2224_1773131289876": {
    "purpose": "Không gian đổi mới sáng tạo và khởi nghiệp",
    "description": "Nơi hỗ trợ các dự án nghiên cứu, khởi nghiệp của sinh viên và tổ chức các hội thảo công nghệ quốc tế"
  },
  "scene_10": {
    "purpose": "Tòa nhà giảng đường và văn phòng khoa",
    "description": "Nơi tập trung các phòng học lớn và văn phòng các Khoa trọng điểm như Công nghệ thông tin, Viễn thông, ..."
  },
  "scene_gpbk0065_1773206564173": {
    "purpose": "Phòng học",
    "description": "Các phòng học được trang bị đầy đủ thiết bị trình chiếu, phục vụ các tiết học chuyên sâu"
  },
  "scene_gpbk0066_1773206449967": {
    "purpose": "Tổ chức sự kiện và hội nghị",
    "description": "Không gian rộng lớn chuyên tổ chức các buổi lễ khai giảng, bế giảng và các hoạt động văn nghệ quy mô lớn của sinh viên"
  },
  "scene_vswthdn_nhtgtt_1": {
    "purpose": "Khu vực thư giãn và cảnh quan",
    "description": "Không gian xanh với phong cách kiến trúc Nhật Bản, là địa điểm nghỉ ngơi và chụp ảnh yêu thích của sinh viên sau giờ học"
  },
  "scene_gpbk2195_1773130397237": {
    "purpose": "Tòa nhà đa năng và giảng đường",
    "description": "Tòa nhà mới với cơ sở vật chất hiện đại phục vụ học tập và nghiên cứu, nằm phía sau khu vực tòa A2"
  },
  "scene_gpbk2237_1773200161431": {
    "purpose": "Phòng học",
    "description": "Các phòng học được trang bị đầy đủ thiết bị trình chiếu, phục vụ các tiết học chuyên sâu"
  },
  "scene_gpbk2202_1773130555661": {
    "purpose": "Học tập và nghiên cứu tài liệu",
    "description": "Không gian yên tĩnh với kho tài liệu phong phú về viễn thông và CNTT, có khu tự học máy lạnh cho sinh viên"
  },
  "scene_gpbk2260_1773200808324": {
    "purpose": "Hoạt động thể thao và thể chất",
    "description": "Khu vực rèn luyện sức khỏe và tổ chức các giải đấu thể thao phong trào giữa các khoa và câu lạc bộ"
  },
  "scene_gpbk2286_1773201396711": {
    "purpose": "Hoạt động thể thao và thể chất",
    "description": "Khu vực rèn luyện sức khỏe và tổ chức các giải đấu thể thao phong trào giữa các khoa và câu lạc bộ"
  },
  "scene_gpbk2270_1773201080635": {
    "purpose": "Phòng nghiên cứu",
    "description": "Nơi thực hành và nghiên cứu chuyên sâu"
  }
};


let krpano = null;
let currentHotspotAudio = null;
let activeDynamicHotspots = [];
let currentSceneName = '';
let activeInfoAnchor = null;
let hotspotInfoFollowRaf = null;
let coordTrackerRaf = null;
let coordTrackerEl = null;
let hotspotBuilder = null;
let runtimePlacedHotspots = {};
const INFO_HOTSPOTS_ENABLED = true;
const ENABLE_SCENE_GROUP_EDITOR = false; // set true to show "Sắp xếp nhóm"
const ENABLE_POPUP_INFO_EDIT = false; // set true to show "Sửa/Lưu/Hủy" popup info
const SCENE_INFO_OVERRIDES_STORAGE_KEY = 'ptit_scene_info_overrides_v1';
let sceneInfoOverrides = { ...sceneInfoOverridesInCode };
let popupEditMode = false;
let panoTitleObserver = null;
let popupSpeakBtn = null;
let popupSpeechUtterance = null;
let popupSpeechActive = false;
let popupTtsAudio = null;

const bookshelfHotspot = {
    id: 'library_books',
    // Move exactly to the center of the aisle as requested by user
    ath: 0.0,
    atv: 0.0,
    title: 'Khu vực sách và Tạp chí chuyên ngành',
    text: 'Với hàng vạn đầu sách chuyên ngành về Công nghệ, Viễn thông, Điện tử & Kinh tế. Ngọn nguồn tri thức và cảm hứng của sinh viên PTIT.\n(Ảnh được AI Generate để tăng tính trực quan)',
    tooltip: 'Khám phá tri thức',
    image: 'library_bookshelves_ai.png'
};

const computerHotspot = {
    id: 'library_computers',
    ath: 0.0,
    atv: 0.0,
    title: 'Khu vực Máy tính tự học',
    text: 'Hệ thống máy tính cấu hình cao kết nối Internet và kho tài liệu số OPAC.\nPhục vụ sinh viên nghiên cứu, làm bài tập và tra cứu độc lập.\n(Ảnh được AI Generate để tăng sự sinh động)',
    tooltip: 'Khu tự học',
    image: 'library_computers_ai.png'
};

// Centralized hotspot config (scale-friendly for many hotspots).
const hotspotData = {
    scene_1: [],
    scene_gpbk2203_1773130660359: [bookshelfHotspot],
    scene_gpbk2204_1773130697446: [bookshelfHotspot],
    scene_gpbk2205_1773130740283: [computerHotspot],
    scene_gpbk2206_1773130766175: [computerHotspot],
    scene_gpbk2207_1773130803595: [computerHotspot],
    // Garden scene should be EMPTY. If you see library hotspots here, it is a CACHE error.
    scene_gpbk2201_1773130534438: [],
    scene_gpbk2202_1773130555661: [
        {
            id: 'library_intro',
            ath: 20.0,
            atv: 0.0,
            title: 'Chào mừng đến Thư viện PTIT',
            text: 'Thư viện Học viện Công nghệ Bưu chính Viễn thông là không gian tự học tĩnh lặng, nơi sinh viên miệt mài với sách vở và laptop.\nKhông gian sang trọng, hiện đại với nguồn sáng ấm áp.',
            tooltip: 'Khu vực tự đọc',
            image: 'library_reading_area_ai.png'
        },
        {
            id: 'library_lookup',
            ath: -10.0,
            atv: 10.0,
            title: 'Hệ thống tra cứu thông minh',
            text: 'Sinh viên có thể sử dụng các máy tính tại đây để tra cứu vị trí sách và tài liệu số thông qua hệ thống OPAC.',
            tooltip: 'Khu vực tra cứu'
        }
    ],
    scene_gpbk2270_1773201080635: [
        {
            id: 'labcts_intro',
            ath: 0.0,
            atv: -20.0,
            title: 'Trung tâm nghiên cứu không gian CTS',
            text: 'Lab CTS (Creative Technologies & Simulations) tập trung vào mảng Công nghệ Sáng tạo, Đồ họa 3D, Thực tế Ảo (VR/AR) và AI. Là nơi ươm mầm các dự án xuất sắc của Học viện Công nghệ Bưu chính Viễn thông.',
            tooltip: 'Tổng quan Lab CTS',
            image: '9adbca54-6cdd-4fe0-b2b3-8eaaa1130de8.jpg'
        },
        {
            id: 'labcts_ws1',
            ath: 60.0,
            atv: 10.0,
            title: 'Siêu Máy Trạm (Workstation) AI',
            text: 'Cấu hình siêu khủng phục vụ Render và Huấn luyện AI:\n- CPU: Intel Core i9 Gen 13/14\n- RAM: 128GB DDR5 Corsair\n- GPU: Dual NVIDIA RTX 4090 24GB\n- SSD: 4TB NVMe PCIe 4.0\nĐảm bảo sức mạnh tính toán vượt trội cho mọi mô hình 3D phức tạp nhất.',
            tooltip: 'Click xem cấu hình PC khủng',
            image: '664088873_1466695988458551_1776922468228806704_n.png'
        },
        {
            id: 'labcts_vr',
            ath: 20.0,
            atv: 12.0,
            title: 'Khu vực thử nghiệm Thực tế Ảo (VR/AR)',
            text: 'Được trang bị loạt thiết bị tối tân nhất thị trường hiện nay:\n- Kính Meta Quest 3, Quest Pro\n- Hệ thống HTC Vive Pro 2, Valve Index\n- Kính AR HoloLens 2\nCho phép sinh viên phát triển trải nghiệm Metaverse, Game 3D tương tác đa giác quan.',
            tooltip: 'Trang thiết bị VR/AR',
            image: '646935640_949460840788736_8238024209070971558_n.png'
        },
        {
            id: 'labcts_project_area',
            ath: 90.0,
            atv: 5.0,
            title: 'Không gian triển khai Dự án',
            text: 'Bàn làm việc nhóm chuyên dụng cho các Team Startup & Research. Khu vực này liên tục diễn ra các buổi Brainstorm, hội chẩn giải pháp công nghệ, và là cái nôi của nhiều dự án đạt giải thưởng quốc gia về Chuyển đổi số.',
            tooltip: 'Khu vực dự án',
            image: 'ea326538-cf53-40e8-8951-ea5b3af0f9e9.jpg'
        },
        {
            id: 'labcts_activity',
            ath: -70.0,
            atv: 15.0,
            title: 'Nghiên cứu sinh & Chuyên gia',
            text: 'Đội ngũ sinh viên tài năng và giảng viên tâm huyết luôn miệt mài nghiên cứu, tối ưu code và xây dựng mô hình giả lập. Một môi trường mở tinh hoa, khuyến khích sáng tạo không giới hạn.',
            tooltip: 'Hoạt động nghiên cứu',
            image: '663697763_1510807277081819_4693986563420308155_n.png'
        }
    ],
    scene_7: [
        {
            id: 'a1_scene7_intro',
            ath: 82.781,
            atv: 12.184,
            title: 'Tòa A1',
            text: 'Khu vực trước cửa Tòa A1 (scene 7).',
            audio: '',
            tooltip: 'Thông tin Tòa A1'
        }
    ],
    scene_gpbk2222_1773131201563: [
        {
            id: 'a1_floor1_intro',
            ath: null,
            atv: null,
            title: 'Tầng 1 Tòa A1',
            text: 'Khu vực sảnh và lối vào Tòa A1, nơi đón tiếp và kết nối các không gian học tập.',
            audio: '',
            tooltip: 'Thông tin Tòa A1'
        }
    ],
    scene_gpbk2287_1773201421340: [
        {
            id: 'a1_floor1_intro_alt',
            ath: null,
            atv: null,
            title: 'Tầng 1 Tòa A1',
            text: 'Khu vực phía trước Tòa A1, gần lối vào chính của tòa.',
            audio: '',
            tooltip: 'Thông tin Tòa A1'
        }
    ]
};

function stopHotspotAudio() {
    if (currentHotspotAudio) {
        currentHotspotAudio.pause();
        currentHotspotAudio.currentTime = 0;
    }
}

function stopHotspotInfoFollow() {
    if (hotspotInfoFollowRaf) {
        cancelAnimationFrame(hotspotInfoFollowRaf);
        hotspotInfoFollowRaf = null;
    }
}

function ensureCoordTrackerUI() {
    if (coordTrackerEl) return coordTrackerEl;
    const el = document.createElement('div');
    el.id = 'coord-tracker';
    el.style.position = 'absolute';
    el.style.left = '14px';
    el.style.bottom = '14px';
    el.style.zIndex = '260';
    el.style.background = 'rgba(0,0,0,0.62)';
    el.style.color = '#fff';
    el.style.border = '1px solid rgba(255,255,255,0.2)';
    el.style.borderRadius = '8px';
    el.style.padding = '8px 10px';
    el.style.fontSize = '12px';
    el.style.fontFamily = 'monospace';
    el.style.pointerEvents = 'none';
    el.innerText = 'ATH: --  ATV: --';
    const main = document.querySelector('.app-main');
    if (main) {
        main.appendChild(el);
        coordTrackerEl = el;
    }
    return coordTrackerEl;
}

function stopCoordinateTracker() {
    if (coordTrackerRaf) {
        cancelAnimationFrame(coordTrackerRaf);
        coordTrackerRaf = null;
    }
}

function startCoordinateTracker() {
    stopCoordinateTracker();
    ensureCoordTrackerUI();

    const tick = () => {
        if (!krpano) {
            coordTrackerRaf = requestAnimationFrame(tick);
            return;
        }

        try {
            const mx = Number(krpano.get('mouse.x'));
            const my = Number(krpano.get('mouse.y'));
            krpano.call('screentosphere(mouse.x,mouse.y,tmp_ath,tmp_atv);');
            const ath = Number(krpano.get('tmp_ath'));
            const atv = Number(krpano.get('tmp_atv'));
            const scene = krpano.get('xml.scene') || '-';
            if (coordTrackerEl) {
                coordTrackerEl.innerText = `SCENE: ${scene}\nATH: ${ath.toFixed(3)}  ATV: ${atv.toFixed(3)}\nX: ${Math.round(mx)}  Y: ${Math.round(my)}`;
            }
        } catch (error) {
            if (coordTrackerEl) {
                coordTrackerEl.innerText = 'ATH: --  ATV: --';
            }
        }

        coordTrackerRaf = requestAnimationFrame(tick);
    };

    coordTrackerRaf = requestAnimationFrame(tick);
}

function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
    }
    return new Promise((resolve, reject) => {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            resolve();
        } catch (error) {
            reject(error);
        } finally {
            document.body.removeChild(ta);
        }
    });
}

function buildPersistConfigSnippet() {
    const normalizedGroups = normalizeSceneGroups(sceneGroupEditorModel);
    const infoOverrides = sceneInfoOverrides && typeof sceneInfoOverrides === 'object'
        ? sceneInfoOverrides
        : {};
    return [
        `const sceneGroups = ${JSON.stringify(normalizedGroups, null, 2)};`,
        '',
        `const sceneInfoOverridesInCode = ${JSON.stringify(infoOverrides, null, 2)};`
    ].join('\n');
}

function getBuilderSnippetXML() {
    if (!hotspotBuilder) return '';
    const name = hotspotBuilder.nameInput.value.trim() || 'info_new_hotspot';
    const title = (hotspotBuilder.titleInput.value.trim() || 'Thông tin').replace(/"/g, '&quot;');
    const text = (hotspotBuilder.textInput.value.trim() || 'Đang cập nhật...').replace(/"/g, '&quot;');
    const scene = hotspotBuilder.sceneInput.value.trim() || 'scene_name';
    const ath = hotspotBuilder.athInput.value.trim() || '0';
    const atv = hotspotBuilder.atvInput.value.trim() || '0';
    return `<hotspot name="${name}"
         style="skin_info_hotspot"
         ath="${ath}"
         atv="${atv}"
         infotitle="${title}"
         infotext="${text}"
         onclick="info_show_from_hotspot(get(name));" />`;
}

function getBuilderSnippetJS() {
    if (!hotspotBuilder) return '';
    const scene = hotspotBuilder.sceneInput.value.trim() || 'scene_name';
    const id = (hotspotBuilder.nameInput.value.trim() || 'new_hotspot').replace(/^info_/, '');
    const title = (hotspotBuilder.titleInput.value.trim() || 'Thông tin').replace(/'/g, "\\'");
    const text = (hotspotBuilder.textInput.value.trim() || 'Đang cập nhật...').replace(/'/g, "\\'");
    const ath = hotspotBuilder.athInput.value.trim() || '0';
    const atv = hotspotBuilder.atvInput.value.trim() || '0';
    return `${scene}: [
    {
        id: '${id}',
        ath: ${ath},
        atv: ${atv},
        title: '${title}',
        text: '${text}',
        audio: '',
        tooltip: 'Thông tin'
    }
]`;
}

function getRuntimeSceneHotspots(sceneName) {
    return runtimePlacedHotspots[sceneName] || [];
}

function upsertRuntimeHotspot(sceneName, hotspot) {
    if (!runtimePlacedHotspots[sceneName]) {
        runtimePlacedHotspots[sceneName] = [];
    }
    const idx = runtimePlacedHotspots[sceneName].findIndex(item => item.id === hotspot.id);
    if (idx >= 0) {
        runtimePlacedHotspots[sceneName][idx] = hotspot;
    } else {
        runtimePlacedHotspots[sceneName].push(hotspot);
    }
}

function buildAndRenderSingleInfoHotspot(sceneName, item) {
    if (!krpano) return;
    const hotspotName = `info_${sceneName}_${item.id}`.replace(/[^a-zA-Z0-9_]/g, '_');
    const safeTooltip = (item.tooltip || '').replace(/'/g, "\\'");
    const resolvedAth = Number.isFinite(item.ath) ? item.ath : (Number(krpano.get('view.hlookat')) || 0);
    const resolvedAtv = Number.isFinite(item.atv) ? item.atv : (Number(krpano.get('view.vlookat')) || 0);
    try {
        if (krpano.get(`hotspot[${hotspotName}]`)) {
            krpano.call(`removehotspot(${hotspotName});`);
        }
    } catch (e) {
        /* ignore */
    }
    if (!activeDynamicHotspots.includes(hotspotName)) {
        activeDynamicHotspots.push(hotspotName);
    }
    krpano.call(`addhotspot(${hotspotName});`);
    krpano.call(`hotspot[${hotspotName}].loadstyle(skin_info_hotspot);`);
    krpano.call(`set(hotspot[${hotspotName}].scale, 0.3);`);
    krpano.call(`set(hotspot[${hotspotName}].edge, center);`);
    krpano.call(`set(hotspot[${hotspotName}].distorted, false);`);
    krpano.call(`set(hotspot[${hotspotName}].zorder, 999);`);
    krpano.call(`set(hotspot[${hotspotName}].handcursor, true);`);
    krpano.call(`set(hotspot[${hotspotName}].onover, tween(scale,0.3));`);
    krpano.call(`set(hotspot[${hotspotName}].onout, tween(scale,0.3));`);
    krpano.call(`set(hotspot[${hotspotName}].ondown, tween(scale,0.3));`);
    krpano.call(`set(hotspot[${hotspotName}].onup, tween(scale,0.3));`);
    krpano.call(`set(hotspot[${hotspotName}].ath, ${resolvedAth});`);
    krpano.call(`set(hotspot[${hotspotName}].atv, ${resolvedAtv});`);
    if (safeTooltip) {
        krpano.call(`set(hotspot[${hotspotName}].tooltip, '${safeTooltip}');`);
    }
    const safeId = String(item.id).replace(/'/g, "\\'");
    krpano.call(`set(hotspot[${hotspotName}].onclick, js(window.openHotspotInfo('${sceneName}','${safeId}','${hotspotName}')));`);
}

function renderRuntimeHotspots(sceneName) {
    const runtimeList = getRuntimeSceneHotspots(sceneName);
    runtimeList.forEach(item => buildAndRenderSingleInfoHotspot(sceneName, item));
}

function captureHotspotCoordinatesFromClick(event) {
    if (!hotspotBuilder || !hotspotBuilder.pendingPlacement || !krpano) return;
    event.preventDefault();
    event.stopPropagation();
    const scene = krpano.get('xml.scene') || '';
    krpano.call('screentosphere(mouse.x,mouse.y,tmp_ath,tmp_atv);');
    const ath = Number(krpano.get('tmp_ath'));
    const atv = Number(krpano.get('tmp_atv'));
    hotspotBuilder.sceneInput.value = scene;
    hotspotBuilder.athInput.value = ath.toFixed(3);
    hotspotBuilder.atvInput.value = atv.toFixed(3);
    hotspotBuilder.pendingPlacement = false;
    hotspotBuilder.pickBtn.innerText = 'Dat diem';
    hotspotBuilder.statusEl.innerText = `Da dat diem: ${ath.toFixed(3)}, ${atv.toFixed(3)}. Nhap thong tin va copy.`;
}

function syncBuilderCurrentScene() {
    if (!hotspotBuilder || !krpano) return;
    hotspotBuilder.sceneInput.value = krpano.get('xml.scene') || '';
}

function ensureHotspotBuilderUI() {
    if (hotspotBuilder) return;
    const main = document.querySelector('.app-main');
    const panoEl = document.getElementById('pano');
    if (!main || !panoEl) return;

    const wrap = document.createElement('div');
    wrap.style.position = 'absolute';
    wrap.style.right = '14px';
    wrap.style.bottom = '14px';
    wrap.style.zIndex = '280';
    wrap.style.width = '280px';
    wrap.style.background = 'rgba(12,14,20,0.9)';
    wrap.style.border = '1px solid rgba(255,255,255,0.2)';
    wrap.style.borderRadius = '10px';
    wrap.style.padding = '10px';
    wrap.style.color = '#fff';
    wrap.style.fontSize = '12px';

    wrap.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <strong>Dat hotspot</strong>
            <button id="hsb-pick" type="button" style="border:1px solid #666;background:#222;color:#fff;border-radius:6px;padding:3px 8px;cursor:pointer;">Dat diem</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
            <input id="hsb-scene" placeholder="scene" readonly style="grid-column:1/3;padding:5px;border-radius:6px;border:1px solid #555;background:#0f0f0f;color:#9ec2ff;">
            <input id="hsb-name" placeholder="name (info_xxx)" style="grid-column:1/3;padding:5px;border-radius:6px;border:1px solid #555;background:#111;color:#fff;">
            <input id="hsb-ath" placeholder="ath" style="padding:5px;border-radius:6px;border:1px solid #555;background:#111;color:#fff;">
            <input id="hsb-atv" placeholder="atv" style="padding:5px;border-radius:6px;border:1px solid #555;background:#111;color:#fff;">
            <input id="hsb-title" placeholder="title" style="grid-column:1/3;padding:5px;border-radius:6px;border:1px solid #555;background:#111;color:#fff;">
            <textarea id="hsb-text" placeholder="text" rows="2" style="grid-column:1/3;padding:5px;border-radius:6px;border:1px solid #555;background:#111;color:#fff;resize:vertical;"></textarea>
        </div>
        <div style="display:flex;gap:6px;margin-top:8px;">
            <button id="hsb-create-live" type="button" style="flex:1;border:1px solid #666;background:#7a2d1f;color:#fff;border-radius:6px;padding:5px;cursor:pointer;">Tao ngay</button>
            <button id="hsb-copy-xml" type="button" style="flex:1;border:1px solid #666;background:#1d3a2d;color:#fff;border-radius:6px;padding:5px;cursor:pointer;">Copy XML</button>
            <button id="hsb-copy-js" type="button" style="flex:1;border:1px solid #666;background:#2a2a56;color:#fff;border-radius:6px;padding:5px;cursor:pointer;">Copy JS</button>
        </div>
        <div id="hsb-status" style="margin-top:8px;color:#b8c4ff;">Scene tu dong theo canh hien tai</div>
    `;

    main.appendChild(wrap);
    hotspotBuilder = {
        wrap,
        pendingPlacement: false,
        panoEl,
        pickBtn: wrap.querySelector('#hsb-pick'),
        sceneInput: wrap.querySelector('#hsb-scene'),
        nameInput: wrap.querySelector('#hsb-name'),
        athInput: wrap.querySelector('#hsb-ath'),
        atvInput: wrap.querySelector('#hsb-atv'),
        titleInput: wrap.querySelector('#hsb-title'),
        textInput: wrap.querySelector('#hsb-text'),
        createLiveBtn: wrap.querySelector('#hsb-create-live'),
        copyXmlBtn: wrap.querySelector('#hsb-copy-xml'),
        copyJsBtn: wrap.querySelector('#hsb-copy-js'),
        statusEl: wrap.querySelector('#hsb-status')
    };

    hotspotBuilder.sceneInput.value = (krpano && krpano.get('xml.scene')) || '';
    hotspotBuilder.nameInput.value = 'info_new_hotspot';
    hotspotBuilder.titleInput.value = 'Thong tin';
    hotspotBuilder.textInput.value = 'Dang cap nhat...';

    hotspotBuilder.pickBtn.addEventListener('click', () => {
        hotspotBuilder.pendingPlacement = true;
        hotspotBuilder.pickBtn.innerText = 'Dang cho click...';
        hotspotBuilder.statusEl.innerText = 'Click vao pano tai vi tri muon dat hotspot';
    });

    hotspotBuilder.createLiveBtn.addEventListener('click', () => {
        if (!krpano) {
            hotspotBuilder.statusEl.innerText = 'Krpano chua san sang';
            return;
        }
        const sceneFromPano = (krpano.get('xml.scene') || '').trim();
        const scene = sceneFromPano || hotspotBuilder.sceneInput.value.trim();
        hotspotBuilder.sceneInput.value = scene;
        const name = hotspotBuilder.nameInput.value.trim() || 'info_new_hotspot';
        const idRaw = name.replace(/^info_/, '').trim() || 'new_hotspot';
        const id = idRaw.replace(/[^a-zA-Z0-9_]/g, '_');
        const athStr = hotspotBuilder.athInput.value.trim();
        const atvStr = hotspotBuilder.atvInput.value.trim();
        const ath = Number(athStr);
        const atv = Number(atvStr);
        if (!scene) {
            hotspotBuilder.statusEl.innerText = 'Khong doc duoc scene hien tai';
            return;
        }
        if (athStr === '' || atvStr === '' || !Number.isFinite(ath) || !Number.isFinite(atv)) {
            hotspotBuilder.statusEl.innerText = 'Hay bam Dat diem roi click len pano truoc';
            return;
        }
        const runtimeItem = {
            id,
            ath,
            atv,
            title: hotspotBuilder.titleInput.value.trim() || 'Thong tin',
            text: hotspotBuilder.textInput.value.trim() || 'Dang cap nhat...',
            audio: '',
            tooltip: 'Thong tin'
        };
        upsertRuntimeHotspot(scene, runtimeItem);
        buildAndRenderSingleInfoHotspot(scene, runtimeItem);
        hotspotBuilder.statusEl.innerText = `Da tao hotspot tren scene ${scene} (ath ${ath}, atv ${atv})`;
    });

    hotspotBuilder.copyXmlBtn.addEventListener('click', () => {
        copyTextToClipboard(getBuilderSnippetXML())
            .then(() => { hotspotBuilder.statusEl.innerText = 'Da copy XML'; })
            .catch(() => { hotspotBuilder.statusEl.innerText = 'Copy XML that bai'; });
    });

    hotspotBuilder.copyJsBtn.addEventListener('click', () => {
        copyTextToClipboard(getBuilderSnippetJS())
            .then(() => { hotspotBuilder.statusEl.innerText = 'Da copy JS block'; })
            .catch(() => { hotspotBuilder.statusEl.innerText = 'Copy JS that bai'; });
    });

    panoEl.addEventListener('click', captureHotspotCoordinatesFromClick, true);
}

function positionHotspotInfoPanel() {
    const panel = document.getElementById('hotspot-info');
    if (!panel || !panel.classList.contains('active') || !krpano || !activeInfoAnchor) {
        return;
    }

    const panelParent = panel.parentElement;
    if (!panelParent) return;

    let ath = Number(activeInfoAnchor.ath);
    let atv = Number(activeInfoAnchor.atv);
    const hotspotName = activeInfoAnchor.hotspotName || '';

    if (hotspotName && krpano.get(`hotspot[${hotspotName}]`)) {
        ath = Number(krpano.get(`hotspot[${hotspotName}].ath`));
        atv = Number(krpano.get(`hotspot[${hotspotName}].atv`));
    }

    if (!Number.isFinite(ath) || !Number.isFinite(atv)) {
        ath = Number(krpano.get('view.hlookat')) || 0;
        atv = Number(krpano.get('view.vlookat')) || 0;
    }

    krpano.call(`spheretoscreen(${ath},${atv},hotspot_screen_x,hotspot_screen_y);`);
    const anchorX = Number(krpano.get('hotspot_screen_x'));
    const anchorY = Number(krpano.get('hotspot_screen_y'));
    const parentRect = panelParent.getBoundingClientRect();
    const panelWidth = panel.offsetWidth || 320;
    const panelHeight = panel.offsetHeight || 160;
    const margin = 10;
    let left = anchorX - (panelWidth / 2);
    let top = anchorY - panelHeight - 16;

    left = Math.max(margin, Math.min(left, parentRect.width - panelWidth - margin));
    top = Math.max(margin, Math.min(top, parentRect.height - panelHeight - margin));

    panel.style.left = `${left}px`;
    panel.style.top = `${top}px`;
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';
}

function startHotspotInfoFollow() {
    stopHotspotInfoFollow();
    const tick = () => {
        const panel = document.getElementById('hotspot-info');
        if (!panel || !panel.classList.contains('active') || !activeInfoAnchor) {
            hotspotInfoFollowRaf = null;
            return;
        }
        positionHotspotInfoPanel();
        hotspotInfoFollowRaf = requestAnimationFrame(tick);
    };
    hotspotInfoFollowRaf = requestAnimationFrame(tick);
}

function openHotspotInfo(sceneName, hotspotId, hotspotName = '') {
    const staticList = hotspotData[sceneName] || [];
    const runtimeList = getRuntimeSceneHotspots(sceneName);
    let hotspot = staticList.find(item => item.id === hotspotId)
        || runtimeList.find(item => item.id === hotspotId);
    
    // Fallback if hotspot data is not explicitly found but we want to show generic scene info
    if (!hotspot && hotspotId && hotspotId.startsWith('info_')) {
        let genericTitle = getGroupTitleForScene(sceneName) || 'Khu vực PTIT';
        let defaultGenericText = 'Không gian học tập và nghiên cứu hiện đại, được trang bị để đáp ứng nhu cầu giao lưu, tự học và tham quan của sinh viên Học viện.';
        let dynamicImage = '';

        // Inject Computer Self-Study specific data for the remaining library aisles
        if (sceneName === 'scene_gpbk2205_1773130740283' || sceneName === 'scene_gpbk2206_1773130766175' || sceneName === 'scene_gpbk2207_1773130803595') {
            genericTitle = 'Khu vực Máy tính tự học';
            defaultGenericText = 'Hệ thống máy tính cấu hình cao kết nối Internet và kho tài liệu số OPAC.\nPhục vụ sinh viên nghiên cứu, làm bài tập và tra cứu độc lập.\n(Ảnh được AI Generate để tăng sự sinh động)';
            dynamicImage = 'library_computers_ai.png';
        }

        hotspot = {
            id: hotspotId,
            title: genericTitle,
            text: defaultGenericText,
            image: dynamicImage,
            tooltip: 'Xem thông tin'
        };
    }

    if (!hotspot && !sceneName) return;

    // Directly open the main modal popup as requested for better experience
    if (sceneName) {
        currentSceneName = sceneName;
        // Check if we have specific hotspot data to show in the main popup
        const data = getMergedSceneInfo(sceneName);
        
        // Update popup content with hotspot specific info if needed
        document.getElementById('popup-title').innerText = (hotspot && hotspot.title) ? hotspot.title : data.title;
        document.getElementById('popup-desc').innerText = (hotspot && hotspot.text) ? hotspot.text : data.description;
        
        const purposeEl = document.getElementById('popup-purpose');
        if (purposeEl) purposeEl.innerText = data.purpose || 'Tham quan Học viện';

        const imgEl = document.getElementById('popup-img');
        if (imgEl) {
            if (hotspot && hotspot.image) {
                imgEl.src = hotspot.image;
            } else {
                let formattedSceneName = sceneName.replace('scene_', '');
                if (formattedSceneName.startsWith('gpbk')) {
                    formattedSceneName = formattedSceneName.replace('gpbk', 'GPBK');
                }
                imgEl.src = data.thumb || `panos/${formattedSceneName}.tiles/thumb.jpg`;
            }
        }

        openInfo();
    }

    stopHotspotAudio();
    if (hotspot && hotspot.audio) {
        currentHotspotAudio = new Audio(hotspot.audio);
        currentHotspotAudio.play().catch(() => {
            console.log('Audio autoplay is blocked until user interacts.');
        });
    }
}

function closeHotspotInfo() {
    const panel = document.getElementById('hotspot-info');
    if (panel) panel.classList.remove('active');
    activeInfoAnchor = null;
    stopHotspotInfoFollow();
    stopHotspotAudio();
}

function clearSceneHotspots() {
    if (!krpano) return;
    activeDynamicHotspots.forEach((name) => {
        try {
            if (krpano.get(`hotspot[${name}]`)) {
                krpano.call(`removehotspot(${name});`);
            }
        } catch (error) {
            console.log('Skip removing hotspot:', name, error);
        }
    });
    activeDynamicHotspots = [];
}

function removeLegacyInfoSpot() {
    if (!krpano) return;
    try {
        if (krpano.get('hotspot[info_spot]')) {
            krpano.call('removehotspot(info_spot);');
        }
    } catch (error) {
        console.log('Skip removing legacy info_spot:', error);
    }
}

function removeAllInfoHotspotsInScene() {
    if (!krpano) return;
    const total = Number(krpano.get('hotspot.count')) || 0;
    for (let i = total - 1; i >= 0; i -= 1) {
        try {
            const name = krpano.get(`hotspot[${i}].name`);
            const style = krpano.get(`hotspot[${i}].style`) || '';
            if (!name) continue;
            if (name === 'info_spot' || name.startsWith('info_') || style === 'skin_info_hotspot') {
                krpano.call(`removehotspot(${name});`);
            }
        } catch (error) {
            console.log('Skip removing info hotspot:', error);
        }
    }
}

function renderSceneHotspots(sceneName) {
    if (!krpano) return;
    clearSceneHotspots();
    // removeAllInfoHotspotsInScene(); // <-- Do not remove static XML hotspots
    if (!INFO_HOTSPOTS_ENABLED) return;

    const sceneHotspots = hotspotData[sceneName] || [];
    console.log(`[Hotspot Diagnostic] scene=${sceneName}, dataCount=${sceneHotspots.length}, isGarden=${sceneName.includes('2201')}`);
    sceneHotspots.forEach((item) => {
        buildAndRenderSingleInfoHotspot(sceneName, item);
    });
    renderRuntimeHotspots(sceneName);
}

function disableNativeTitleTooltips() {
    const panoEl = document.getElementById('pano');
    if (!panoEl) return;

    const stripTitleAttrs = () => {
        panoEl.querySelectorAll('[title]').forEach((el) => el.removeAttribute('title'));
    };

    stripTitleAttrs();

    if (panoTitleObserver) {
        panoTitleObserver.disconnect();
    }
    panoTitleObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'title') {
                mutation.target.removeAttribute('title');
            }
        });
        stripTitleAttrs();
    });
    panoTitleObserver.observe(panoEl, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['title']
    });
}


/**
 * KRpano onready callback
 */
function onready(krpano_interface) {
    krpano = krpano_interface;
    console.log("KRpano Integrated Successfully");
    disableNativeTitleTooltips();
    initSidebar();
    updateSceneGroupEditorSceneList();
    const initialScene = krpano.get('xml.scene');
    if (initialScene) {
        handleSceneChange(initialScene);
    }
}

function normalizeSceneGroups(input) {
    if (!Array.isArray(input)) return [];
    return input
        .filter(group => group && typeof group.title === 'string' && Array.isArray(group.scenes))
        .map(group => ({
            title: group.title.trim(),
            scenes: Array.from(new Set(
                group.scenes
                    .filter(sceneName => typeof sceneName === 'string')
                    .map(sceneName => sceneName.trim())
                    .filter(Boolean)
            ))
        }))
        .filter(group => group.title);
}

function loadStoredSceneGroups() {
    try {
        const raw = localStorage.getItem(SCENE_GROUPS_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        const normalized = normalizeSceneGroups(parsed);
        customSceneGroups = normalized;
    } catch (error) {
        console.log('Skip loading stored scene groups:', error);
    }
}

function saveStoredSceneGroups(groups) {
    try {
        localStorage.setItem(SCENE_GROUPS_STORAGE_KEY, JSON.stringify(groups, null, 2));
    } catch (error) {
        console.log('Skip saving scene groups:', error);
    }
}

function clearStoredSceneGroups() {
    try {
        localStorage.removeItem(SCENE_GROUPS_STORAGE_KEY);
    } catch (error) {
        console.log('Skip clearing scene groups:', error);
    }
}

function getAllSceneNamesFromTour() {
    if (!krpano) return Object.keys(sceneData);
    const names = [];
    const count = Number(krpano.get('scene.count')) || 0;
    for (let i = 0; i < count; i += 1) {
        const name = krpano.get(`scene[${i}].name`);
        if (name) names.push(name);
    }
    return names.length > 0 ? names : Object.keys(sceneData);
}

function getSceneMeta(sceneName) {
    const meta = sceneData[sceneName] ? { ...sceneData[sceneName] } : {};
    // Always prefer scene thumb from tour.xml (startup-aligned thumbnail).
    if (krpano) {
        const thumb = krpano.get(`scene[${sceneName}].thumburl`);
        if (thumb) meta.thumb = thumb;
    }
    if (!meta.title && krpano) {
        meta.title = krpano.get(`scene[${sceneName}].title`) || sceneName;
    }
    if (!meta.description) {
        meta.description = 'Thông tin chi tiết đang được cập nhật...';
    }
    if (!meta.thumb) {
        let formattedSceneName = sceneName.replace('scene_', '');
        if (formattedSceneName.startsWith('gpbk')) {
            formattedSceneName = formattedSceneName.replace('gpbk', 'GPBK');
        }
        meta.thumb = `panos/${formattedSceneName}.tiles/thumb.jpg`;
    }
    return meta;
}

function getSidebarGroups() {
    const groups = {};
    const sourceGroups = (Array.isArray(customSceneGroups) && customSceneGroups.length > 0)
        ? customSceneGroups
        : sceneGroups;

    if (Array.isArray(sourceGroups) && sourceGroups.length > 0) {
        sourceGroups.forEach((group) => {
            if (!group || !group.title || !Array.isArray(group.scenes)) return;
            let mapped = group.scenes
                .map((sceneName) => ({ sceneName, ...getSceneMeta(sceneName) }))
                .filter((scene) => scene.sceneName && scene.thumb);
            if (mapped.length === 0) {
                mapped = Object.keys(sceneData)
                    .filter((sceneName) => (sceneData[sceneName]?.title || '').trim() === group.title)
                    .map((sceneName) => ({ sceneName, ...getSceneMeta(sceneName) }))
                    .filter((scene) => scene.sceneName && scene.thumb);
            }
            groups[group.title] = mapped;
        });
        return groups;
    }

    Object.keys(sceneData).forEach((sceneName) => {
        const data = getSceneMeta(sceneName);
        if (!groups[data.title]) {
            groups[data.title] = [];
        }
        groups[data.title].push({ sceneName, ...data });
    });
    return groups;
}

function getGroupTitleForScene(sceneName) {
    const sourceGroups = (Array.isArray(customSceneGroups) && customSceneGroups.length > 0)
        ? customSceneGroups
        : sceneGroups;

    if (Array.isArray(sourceGroups) && sourceGroups.length > 0) {
        for (const group of sourceGroups) {
            if (!group || !group.title || !Array.isArray(group.scenes)) continue;
            if (group.scenes.includes(sceneName)) return group.title;
            if (group.scenes.length === 0) {
                const fallbackTitle = (sceneData[sceneName]?.title || '').trim();
                if (fallbackTitle && fallbackTitle === group.title) return group.title;
            }
        }
    }

    const fallbackMeta = getSceneMeta(sceneName);
    return fallbackMeta.title || sceneName;
}

function isSceneInConfiguredGroups(sceneName) {
    // The user requested ALL scenes to be able to show popups.
    return true;
}

function setInfoButtonEnabled(enabled) {
    const infoBtn = document.getElementById('info-btn');
    if (!infoBtn) return;
    infoBtn.classList.toggle('disabled', !enabled);
    infoBtn.setAttribute('aria-disabled', enabled ? 'false' : 'true');
    infoBtn.tabIndex = enabled ? 0 : -1;
}

function getCurrentSceneGroupModel() {
    const sourceGroups = (Array.isArray(customSceneGroups) && customSceneGroups.length > 0)
        ? customSceneGroups
        : sceneGroups;

    if (Array.isArray(sourceGroups) && sourceGroups.length > 0) {
        return normalizeSceneGroups(sourceGroups);
    }
    // Default editor mode:
    // - show existing group titles
    // - keep scenes unassigned so users can drag manually.
    const titleSet = new Set();
    Object.keys(sceneData).forEach((sceneName) => {
        const title = (sceneData[sceneName]?.title || '').trim();
        if (title) titleSet.add(title);
    });
    return Array.from(titleSet).map(title => ({ title, scenes: [] }));
}

function buildSceneGroupEditorItem(sceneName) {
    const data = getSceneMeta(sceneName);
    const item = document.createElement('div');
    item.draggable = true;
    item.dataset.scene = sceneName;
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '8px';
    item.style.padding = '6px';
    item.style.marginBottom = '6px';
    item.style.border = '1px solid #dedede';
    item.style.borderRadius = '8px';
    item.style.background = '#fff';
    item.style.cursor = 'grab';
    item.innerHTML = `<img src="${data.thumb}" alt="" style="width:46px;height:26px;object-fit:cover;border-radius:4px;"> <span style="font-size:12px;color:#222;">${sceneName}</span>`;
    item.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', sceneName);
    });
    return item;
}

function updateSceneGroupEditorSceneList() {
    if (!sceneGroupEditorUI || !sceneGroupEditorUI.scenePool) return;
    const usedMap = {};
    sceneGroupEditorModel.forEach((group) => {
        group.scenes.forEach((sceneName) => {
            usedMap[sceneName] = group.title;
        });
    });
    const allScenes = getAllSceneNamesFromTour();
    sceneGroupEditorUI.scenePool.innerHTML = '';
    if (allScenes.length === 0) {
        sceneGroupEditorUI.scenePool.innerHTML = '<div style="font-size:12px;color:#666;">Không có scene trong tour</div>';
        return;
    }
    allScenes.forEach((sceneName) => {
        const item = buildSceneGroupEditorItem(sceneName);
        if (item) {
            const badge = document.createElement('span');
            badge.style.marginLeft = 'auto';
            badge.style.fontSize = '11px';
            badge.style.color = '#666';
            badge.innerText = usedMap[sceneName] ? `Trong: ${usedMap[sceneName]}` : 'Chưa xếp';
            item.appendChild(badge);
            sceneGroupEditorUI.scenePool.appendChild(item);
        }
    });
}

function persistSceneGroupsFromEditor(options = {}) {
    const { refreshSidebar = false, statusText = '' } = options;
    const normalized = normalizeSceneGroups(sceneGroupEditorModel);
    customSceneGroups = normalized;
    saveStoredSceneGroups(normalized);
    if (refreshSidebar) {
        initSidebar();
    }
    if (sceneGroupEditorUI && sceneGroupEditorUI.status && statusText) {
        sceneGroupEditorUI.status.innerText = statusText;
    }
}

function renderSceneGroupEditorGroups() {
    if (!sceneGroupEditorUI || !sceneGroupEditorUI.groupsWrap) return;
    sceneGroupEditorUI.groupsWrap.innerHTML = '';
    if (!sceneGroupEditorModel.length) {
        sceneGroupEditorUI.groupsWrap.innerHTML = '<div style="font-size:12px;color:#666;">Chưa có nhóm nào. Hãy nhập tên nhóm và bấm Thêm.</div>';
        return;
    }
    sceneGroupEditorModel.forEach((group, groupIndex) => {
        const box = document.createElement('div');
        box.style.border = '1px solid #d6d6d6';
        box.style.borderRadius = '10px';
        box.style.padding = '8px';
        box.style.marginBottom = '8px';
        box.style.background = '#fafafa';
        box.dataset.groupOrderIndex = String(groupIndex);
        box.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:6px;"><strong style="font-size:13px;color:#222;flex:1;">${group.title}</strong><button data-drag-group="${groupIndex}" draggable="true" title="Kéo để đổi thứ tự nhóm" style="border:1px solid #ccc;background:#fff;border-radius:6px;padding:2px 6px;cursor:grab;">↕</button><button data-rename-group="${groupIndex}" style="border:1px solid #ccc;background:#fff;border-radius:6px;padding:2px 6px;cursor:pointer;">Sửa tên</button><button data-remove-group="${groupIndex}" style="border:1px solid #ccc;background:#fff;border-radius:6px;padding:2px 6px;cursor:pointer;">Xóa</button></div>`;
        const headerRow = box.firstElementChild;
        if (headerRow) {
            headerRow.draggable = true;
            headerRow.style.cursor = 'grab';
            headerRow.addEventListener('dragstart', (event) => {
                draggingGroupIndex = groupIndex;
                event.dataTransfer.setData('text/plain', `group:${groupIndex}`);
            });
            headerRow.addEventListener('dragend', () => {
                draggingGroupIndex = null;
            });
        }
        box.addEventListener('dragover', (event) => {
            event.preventDefault();
        });
        box.addEventListener('drop', (event) => {
            event.preventDefault();
            const payload = event.dataTransfer.getData('text/plain');
            const fromIndex = payload.startsWith('group:')
                ? Number(payload.replace('group:', ''))
                : draggingGroupIndex;
            const toIndex = groupIndex;
            if (!Number.isFinite(fromIndex) || !Number.isFinite(toIndex) || fromIndex === toIndex) return;
            const [moved] = sceneGroupEditorModel.splice(fromIndex, 1);
            sceneGroupEditorModel.splice(toIndex, 0, moved);
            draggingGroupIndex = null;
            renderSceneGroupEditorGroups();
            updateSceneGroupEditorSceneList();
            persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã tự lưu thứ tự nhóm' });
        });
        const drop = document.createElement('div');
        drop.dataset.groupIndex = String(groupIndex);
        drop.style.minHeight = '36px';
        drop.style.border = '1px dashed #bfc6d1';
        drop.style.borderRadius = '8px';
        drop.style.padding = '6px';
        drop.style.background = '#f4f7fb';
        drop.addEventListener('dragover', (event) => event.preventDefault());
        drop.addEventListener('drop', (event) => {
            event.preventDefault();
            const sceneName = event.dataTransfer.getData('text/plain');
            const validSceneNames = new Set(getAllSceneNamesFromTour());
            if (!sceneName || !validSceneNames.has(sceneName)) return;
            sceneGroupEditorModel.forEach(g => {
                g.scenes = g.scenes.filter(s => s !== sceneName);
            });
            sceneGroupEditorModel[groupIndex].scenes.push(sceneName);
            renderSceneGroupEditorGroups();
            updateSceneGroupEditorSceneList();
            persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã tự lưu scene trong nhóm' });
        });

        group.scenes.forEach((sceneName, sceneIndex) => {
            const item = buildSceneGroupEditorItem(sceneName);
            if (item) {
                const removeSceneBtn = document.createElement('button');
                removeSceneBtn.type = 'button';
                removeSceneBtn.dataset.removeScene = `${groupIndex}:${sceneIndex}`;
                removeSceneBtn.style.marginLeft = '6px';
                removeSceneBtn.style.border = '1px solid #ccc';
                removeSceneBtn.style.background = '#fff';
                removeSceneBtn.style.borderRadius = '6px';
                removeSceneBtn.style.padding = '1px 6px';
                removeSceneBtn.style.cursor = 'pointer';
                removeSceneBtn.style.fontSize = '11px';
                removeSceneBtn.innerText = 'X';
                removeSceneBtn.addEventListener('click', (event) => {
                    event.preventDefault();
                    event.stopPropagation();
                });
                item.appendChild(removeSceneBtn);
                drop.appendChild(item);
            }
        });
        box.appendChild(drop);
        sceneGroupEditorUI.groupsWrap.appendChild(box);
    });

    sceneGroupEditorUI.groupsWrap.querySelectorAll('[data-drag-group]').forEach((btn) => {
        btn.addEventListener('dragstart', (event) => {
            const index = Number(btn.dataset.dragGroup);
            if (!Number.isFinite(index)) return;
            draggingGroupIndex = index;
            event.dataTransfer.setData('text/plain', `group:${index}`);
        });
        btn.addEventListener('dragend', () => {
            draggingGroupIndex = null;
        });
    });

    sceneGroupEditorUI.groupsWrap.querySelectorAll('[data-rename-group]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = Number(btn.dataset.renameGroup);
            if (!Number.isFinite(index) || !sceneGroupEditorModel[index]) return;
            const current = sceneGroupEditorModel[index].title || '';
            const nextTitle = window.prompt('Nhập tên nhóm mới:', current);
            if (nextTitle === null) return;
            const trimmed = nextTitle.trim();
            if (!trimmed) return;
            sceneGroupEditorModel[index].title = trimmed;
            renderSceneGroupEditorGroups();
            updateSceneGroupEditorSceneList();
            persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã tự lưu tên nhóm' });
        });
    });

    sceneGroupEditorUI.groupsWrap.querySelectorAll('[data-remove-group]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const index = Number(btn.dataset.removeGroup);
            if (!Number.isFinite(index)) return;
            sceneGroupEditorModel.splice(index, 1);
            renderSceneGroupEditorGroups();
            updateSceneGroupEditorSceneList();
            persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã tự lưu sau khi xóa nhóm' });
        });
    });

    sceneGroupEditorUI.groupsWrap.querySelectorAll('[data-remove-scene]').forEach((btn) => {
        btn.addEventListener('click', () => {
            const [groupIndexRaw, sceneIndexRaw] = String(btn.dataset.removeScene || '').split(':');
            const groupIndex = Number(groupIndexRaw);
            const sceneIndex = Number(sceneIndexRaw);
            if (!Number.isFinite(groupIndex) || !Number.isFinite(sceneIndex)) return;
            if (!sceneGroupEditorModel[groupIndex]) return;
            sceneGroupEditorModel[groupIndex].scenes.splice(sceneIndex, 1);
            renderSceneGroupEditorGroups();
            updateSceneGroupEditorSceneList();
            persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã tự lưu sau khi bỏ scene khỏi nhóm' });
        });
    });
}

function ensureSceneGroupEditorUI() {
    if (!ENABLE_SCENE_GROUP_EDITOR) return;
    if (sceneGroupEditorUI) return;
    const sidebarHeader = document.querySelector('.sidebar-header');
    if (!sidebarHeader) return;

    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.innerText = 'Sắp xếp nhóm';
    toggleBtn.style.marginTop = '10px';
    toggleBtn.style.border = '1px solid #ddd';
    toggleBtn.style.background = '#fff';
    toggleBtn.style.borderRadius = '8px';
    toggleBtn.style.padding = '6px 10px';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.fontSize = '12px';
    sidebarHeader.appendChild(toggleBtn);

    const panel = document.createElement('div');
    panel.style.position = 'fixed';
    panel.style.top = '16px';
    panel.style.left = '16px';
    panel.style.right = '16px';
    panel.style.bottom = '16px';
    panel.style.width = 'auto';
    panel.style.maxHeight = 'none';
    panel.style.overflow = 'auto';
    panel.style.zIndex = '4000';
    panel.style.background = '#ffffff';
    panel.style.color = '#222';
    panel.style.border = '1px solid #d9d9d9';
    panel.style.borderRadius = '12px';
    panel.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
    panel.style.padding = '12px';
    panel.style.display = 'none';
    panel.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
            <strong style="font-size:14px;">Kéo thả scene vào nhóm</strong>
            <button id="sg-close" style="border:1px solid #ccc;background:#fff;border-radius:6px;padding:2px 8px;cursor:pointer;">Đóng</button>
        </div>
        <div style="display:flex;gap:10px;height:calc(100% - 96px);min-height:420px;">
            <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
                <div style="font-size:12px;margin-bottom:6px;color:#555;">Scene chưa xếp</div>
                <div id="sg-scene-pool" style="flex:1;min-height:60px;border:1px solid #ddd;border-radius:8px;padding:6px;background:#f8f8f8;overflow:auto;"></div>
            </div>
            <div style="flex:1;min-width:0;display:flex;flex-direction:column;">
                <div style="display:flex;gap:6px;margin-bottom:6px;">
                    <input id="sg-new-title" placeholder="Tên nhóm mới" style="flex:1;padding:5px;border:1px solid #ccc;border-radius:6px;">
                    <button id="sg-add-group" style="border:1px solid #ccc;background:#fff;border-radius:6px;padding:4px 8px;cursor:pointer;">Thêm</button>
                </div>
                <div id="sg-groups-wrap" style="flex:1;overflow:auto;"></div>
            </div>
        </div>
        <div style="display:flex;gap:6px;margin-top:10px;">
            <button id="sg-apply" style="flex:1;border:1px solid #9bc2a4;background:#e8f7ec;border-radius:8px;padding:6px;cursor:pointer;">Áp dụng ngay</button>
            <button id="sg-copy" style="flex:1;border:1px solid #9aaee0;background:#edf2ff;border-radius:8px;padding:6px;cursor:pointer;">Copy config</button>
            <button id="sg-copy-all" style="flex:1;border:1px solid #9aaee0;background:#edf2ff;border-radius:8px;padding:6px;cursor:pointer;">Copy groups + info</button>
            <button id="sg-reset" style="flex:1;border:1px solid #e0b39a;background:#fff3eb;border-radius:8px;padding:6px;cursor:pointer;">Reset</button>
        </div>
        <div id="sg-status" style="margin-top:8px;font-size:12px;color:#666;"></div>
    `;
    document.body.appendChild(panel);

    sceneGroupEditorUI = {
        panel,
        toggleBtn,
        closeBtn: panel.querySelector('#sg-close'),
        scenePool: panel.querySelector('#sg-scene-pool'),
        groupsWrap: panel.querySelector('#sg-groups-wrap'),
        addGroupBtn: panel.querySelector('#sg-add-group'),
        newTitleInput: panel.querySelector('#sg-new-title'),
        applyBtn: panel.querySelector('#sg-apply'),
        copyBtn: panel.querySelector('#sg-copy'),
        copyAllBtn: panel.querySelector('#sg-copy-all'),
        resetBtn: panel.querySelector('#sg-reset'),
        status: panel.querySelector('#sg-status')
    };

    const openEditor = () => {
        sceneGroupEditorModel = getCurrentSceneGroupModel();
        renderSceneGroupEditorGroups();
        updateSceneGroupEditorSceneList();
        panel.style.display = 'block';
        sceneGroupEditorUI.status.innerText = 'Kéo scene vào nhóm, kéo nhóm để đổi thứ tự rồi bấm Áp dụng ngay';
    };

    toggleBtn.addEventListener('click', openEditor);
    sceneGroupEditorUI.closeBtn.addEventListener('click', () => { panel.style.display = 'none'; });
    sceneGroupEditorUI.addGroupBtn.addEventListener('click', () => {
        const title = sceneGroupEditorUI.newTitleInput.value.trim();
        if (!title) return;
        sceneGroupEditorModel.push({ title, scenes: [] });
        sceneGroupEditorUI.newTitleInput.value = '';
        renderSceneGroupEditorGroups();
        updateSceneGroupEditorSceneList();
        persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã tự lưu nhóm mới' });
    });
    sceneGroupEditorUI.applyBtn.addEventListener('click', () => {
        persistSceneGroupsFromEditor({ refreshSidebar: true, statusText: 'Đã áp dụng và lưu local' });
    });
    sceneGroupEditorUI.copyBtn.addEventListener('click', () => {
        copyTextToClipboard(`const sceneGroups = ${JSON.stringify(normalizeSceneGroups(sceneGroupEditorModel), null, 2)};`)
            .then(() => { sceneGroupEditorUI.status.innerText = 'Đã copy config sceneGroups'; })
            .catch(() => { sceneGroupEditorUI.status.innerText = 'Copy thất bại'; });
    });
    sceneGroupEditorUI.copyAllBtn.addEventListener('click', () => {
        copyTextToClipboard(buildPersistConfigSnippet())
            .then(() => { sceneGroupEditorUI.status.innerText = 'Đã copy config groups + popup info để dán vào app.js'; })
            .catch(() => { sceneGroupEditorUI.status.innerText = 'Copy thất bại'; });
    });
    sceneGroupEditorUI.resetBtn.addEventListener('click', () => {
        customSceneGroups = null;
        clearStoredSceneGroups();
        initSidebar();
        sceneGroupEditorModel = getCurrentSceneGroupModel();
        renderSceneGroupEditorGroups();
        updateSceneGroupEditorSceneList();
        sceneGroupEditorUI.status.innerText = 'Đã reset về mặc định';
    });
}

/**
 * Initialize the Sidebar with accordions
 */
function initSidebar() {
    const list = document.getElementById('scene-list');
    list.innerHTML = ''; // Clear existing

    const groups = getSidebarGroups();

    // Render accordions
    Object.keys(groups).forEach(title => {
        const groupScenes = groups[title];
        
        const groupContainer = document.createElement('div');
        groupContainer.className = 'accordion-group';
        // We can add an id mapping for easier access later
        groupContainer.dataset.group = title;
        
        const header = document.createElement('div');
        header.className = 'accordion-header';
        
        // Render title only (without scene count badge)
        header.innerHTML = `
            <span>${title}</span>
            <span class="accordion-icon">▼</span>
        `;
        
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

function loadSceneInfoOverrides() {
    try {
        sceneInfoOverrides = { ...sceneInfoOverridesInCode };
        const raw = localStorage.getItem(SCENE_INFO_OVERRIDES_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
            sceneInfoOverrides = { ...sceneInfoOverridesInCode, ...parsed };
        }
    } catch (error) {
        console.log('Skip loading scene info overrides:', error);
    }
}

function saveSceneInfoOverrides() {
    try {
        localStorage.setItem(SCENE_INFO_OVERRIDES_STORAGE_KEY, JSON.stringify(sceneInfoOverrides));
    } catch (error) {
        console.log('Skip saving scene info overrides:', error);
    }
}

function getMergedSceneInfo(sceneName) {
    const base = sceneData[sceneName] || {
        title: krpano.get(`scene[${sceneName}].title`) || sceneName,
        description: 'Thông tin chi tiết đang được cập nhật...'
    };
    const override = sceneInfoOverrides[sceneName] || {};
    const { title: _ignoredTitle, ...overrideWithoutTitle } = override;
    return { ...base, ...overrideWithoutTitle };
}

function setPopupEditable(editable) {
    const popup = document.getElementById('info-popup');
    if (popup) popup.classList.toggle('popup-editing', editable);
    ['popup-purpose', 'popup-desc'].forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.contentEditable = editable ? 'true' : 'false';
        el.style.outline = editable ? '1px dashed #d0d6df' : 'none';
        el.style.padding = editable ? '2px 4px' : '';
        el.style.borderRadius = editable ? '6px' : '';
        el.style.cursor = editable ? 'text' : 'default';
    });
}

function updatePopupEditButtons() {
    const editBtn = document.getElementById('popup-edit-btn');
    const saveBtn = document.getElementById('popup-save-btn');
    const cancelBtn = document.getElementById('popup-cancel-btn');
    if (!ENABLE_POPUP_INFO_EDIT) {
        if (editBtn) editBtn.style.display = 'none';
        if (saveBtn) saveBtn.style.display = 'none';
        if (cancelBtn) cancelBtn.style.display = 'none';
        setPopupEditable(false);
        return;
    }
    if (editBtn) editBtn.style.display = popupEditMode ? 'none' : 'inline-block';
    if (saveBtn) saveBtn.style.display = popupEditMode ? 'inline-block' : 'none';
    if (cancelBtn) cancelBtn.style.display = popupEditMode ? 'inline-block' : 'none';
}

function enterPopupEditMode() {
    popupEditMode = true;
    setPopupEditable(true);
    updatePopupEditButtons();
}

function exitPopupEditMode() {
    popupEditMode = false;
    setPopupEditable(false);
    updatePopupEditButtons();
}

function updatePopupSpeakButtonUI() {
    if (!popupSpeakBtn) return;
    popupSpeakBtn.innerText = popupSpeechActive ? '■ Dừng' : '🔊 Đọc';
    popupSpeakBtn.title = popupSpeechActive ? 'Dừng đọc nội dung' : 'Đọc nội dung thông tin';
}

function stopPopupSpeech() {
    if (popupTtsAudio) {
        try {
            popupTtsAudio.pause();
            popupTtsAudio.src = '';
        } catch (error) {
            console.log('Skip stopping translate TTS audio:', error);
        }
        popupTtsAudio = null;
    }
    if (popupSpeechUtterance && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
    } else if ('speechSynthesis' in window && popupSpeechActive) {
        window.speechSynthesis.cancel();
    }
    popupSpeechUtterance = null;
    popupSpeechActive = false;
    updatePopupSpeakButtonUI();
}

function getPopupSpeechText() {
    const title = document.getElementById('popup-title')?.innerText?.trim() || '';
    const purpose = document.getElementById('popup-purpose')?.innerText?.trim() || '';
    const description = document.getElementById('popup-desc')?.innerText?.trim() || '';

    const chunks = [];
    if (title) chunks.push(`Địa điểm ${title}.`);
    if (purpose) chunks.push(`Mục đích sử dụng: ${purpose}.`);
    if (description) chunks.push(`Mô tả thêm: ${description}.`);
    return chunks.join(' ');
}

// Ensure voices are loaded asynchronously
if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
    };
}

function getPreferredSpeechVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices() || [];
    
    // Some browsers use 'vi-VN', others might just be 'vi'
    const viVoice = voices.find((voice) => String(voice.lang || '').toLowerCase() === 'vi-vn')
        || voices.find((voice) => String(voice.lang || '').toLowerCase().startsWith('vi'));
        
    if (viVoice) return viVoice;

    // Use Google Vietnamese voice if available specifically on Chrome
    const googleVi = voices.find(v => v.name.includes('Google') && v.lang.includes('vi'));
    if (googleVi) return googleVi;

    // Temporary fallback when Vietnamese voice isn't installed yet.
    return voices.find((voice) => String(voice.lang || '').toLowerCase() === 'en-us')
        || voices.find((voice) => String(voice.lang || '').toLowerCase().startsWith('en'))
        || voices[0] || null;
}

async function speakPopupInfo() {
    const text = getPopupSpeechText();
    if (!text) return;

    stopPopupSpeech();
    popupSpeechActive = true;
    updatePopupSpeakButtonUI();

    if (!('speechSynthesis' in window)) {
        popupSpeechActive = false;
        updatePopupSpeakButtonUI();
        window.alert('Trinh duyet khong ho tro doc van ban.');
        return;
    }

    const selectedVoice = getPreferredSpeechVoice();
    if (!selectedVoice) {
        popupSpeechActive = false;
        updatePopupSpeakButtonUI();
        console.log('Khong tim thay voice doc tren trinh duyet.');
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedVoice.lang || 'en-US';
    utterance.voice = selectedVoice;
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.onend = () => {
        popupSpeechUtterance = null;
        popupSpeechActive = false;
        updatePopupSpeakButtonUI();
    };
    utterance.onerror = () => {
        popupSpeechUtterance = null;
        popupSpeechActive = false;
        updatePopupSpeakButtonUI();
    };

    popupSpeechUtterance = utterance;
    popupSpeechActive = true;
    updatePopupSpeakButtonUI();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

function togglePopupSpeech() {
    if (popupSpeechActive) {
        stopPopupSpeech();
        return;
    }
    speakPopupInfo().catch(() => {
        popupSpeechActive = false;
        updatePopupSpeakButtonUI();
    });
}


/**
 * Callback from KRpano on scene change
 */
function handleSceneChange(sceneName) {
    console.log("Active Scene:", sceneName);
    currentSceneName = sceneName;
    closeHotspotInfo();
    removeLegacyInfoSpot();
    renderSceneHotspots(sceneName);

    // Update Sidebar highlighting
    document.querySelectorAll('.scene-item').forEach(el => el.classList.remove('active'));
    
    // Mark active scene
    const activeItem = document.getElementById(`nav-${sceneName}`);
    if (activeItem) {
        activeItem.classList.add('active');
        const activeThumbFromKrpano = krpano ? krpano.get(`scene[${sceneName}].thumburl`) : '';
        const activeThumbFallback = (sceneData[sceneName] && sceneData[sceneName].thumb) ? sceneData[sceneName].thumb : '';
        const activeThumb = activeThumbFromKrpano || activeThumbFallback;
        const activeImg = activeItem.querySelector('img');
        if (activeImg && activeThumb) {
            activeImg.src = activeThumb;
        }
        const groupContainer = activeItem.closest('.accordion-group');
        if (groupContainer && !groupContainer.classList.contains('expanded')) {
            groupContainer.classList.add('expanded');
        }
        groupContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Update data for popup
    const data = getMergedSceneInfo(sceneName);

    const popup = document.getElementById('info-popup');
    if (popup) {
        document.getElementById('popup-title').innerText = getGroupTitleForScene(sceneName);
        document.getElementById('popup-desc').innerText = data.description || 'Thông tin chi tiết đang được cập nhật...';
        
        const purposeEl = document.getElementById('popup-purpose');
        
        if (purposeEl) purposeEl.innerText = data.purpose || 'Tham quan khuôn viên Học viện';
        
        const imgEl = document.getElementById('popup-img');
        if (imgEl) imgEl.src = data.thumb || `panos/${sceneName.replace('scene_', '')}.tiles/thumb.jpg`;
    }
    if (popupSpeechActive) stopPopupSpeech();

    // Gate "info" popup availability by configured scene groups.
    const infoAllowed = isSceneInConfiguredGroups(sceneName);
    setInfoButtonEnabled(infoAllowed);
    if (!infoAllowed) closeInfo();
}

/**
 * Modal Management
 */
function openInfo() {
    if (!isSceneInConfiguredGroups(currentSceneName)) return;
    document.getElementById('info-popup').classList.add('active');
    document.getElementById('popup-overlay').classList.add('active');
}

function closeInfo() {
    document.getElementById('info-popup').classList.remove('active');
    document.getElementById('popup-overlay').classList.remove('active');
    stopPopupSpeech();
    exitPopupEditMode();
}

function toggleInfo() {
    if (!isSceneInConfiguredGroups(currentSceneName)) return;
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

// Add global interaction to start sound
document.addEventListener('click', () => {
    if (!audioStarted && krpano) {
        // Only auto-start if it's the first real interaction and audio isn't started yet
        // We can choose to stay muted or just start. Let's start for a better UX if the user clicked something.
        toggleSound(); 
    }
}, { once: true });

function toggleFullscreen() {
    krpano.call("switch(fullscreen)");
}

function toggleSidebar() {
    const container = document.querySelector('.app-container');
    container.classList.toggle('sidebar-collapsed');
}


// Event Listeners initialization
document.addEventListener('DOMContentLoaded', () => {
    disableNativeTitleTooltips();
    loadSceneInfoOverrides();
    loadStoredSceneGroups();
    ensureSceneGroupEditorUI();

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
    if (infoBtn) {
        infoBtn.addEventListener('click', (e) => {
            if (infoBtn.classList.contains('disabled')) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            toggleInfo();
        });
    }

    // Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebar-toggle');
    if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);

    // Hotspot Info Panel
    const hotspotCloseBtn = document.getElementById('hotspot-info-close');
    if (hotspotCloseBtn) hotspotCloseBtn.addEventListener('click', closeHotspotInfo);
    const hotspotMoreBtn = document.getElementById('hotspot-info-more');
    if (hotspotMoreBtn) {
        hotspotMoreBtn.addEventListener('click', () => {
            if (!currentSceneName && krpano) {
                currentSceneName = krpano.get('xml.scene');
            }
            if (currentSceneName) {
                handleSceneChange(currentSceneName);
            }
            openInfo();
        });
    }

    const popupEditBtn = document.getElementById('popup-edit-btn');
    const popupSaveBtn = document.getElementById('popup-save-btn');
    const popupCancelBtn = document.getElementById('popup-cancel-btn');
    const popupActions = document.querySelector('.popup-edit-actions');

    if (popupActions && !document.getElementById('popup-speak-btn')) {
        const speakBtn = document.createElement('button');
        speakBtn.id = 'popup-speak-btn';
        speakBtn.type = 'button';
        popupActions.appendChild(speakBtn);
    }
    popupSpeakBtn = document.getElementById('popup-speak-btn');
    if (popupSpeakBtn) {
        popupSpeakBtn.addEventListener('click', togglePopupSpeech);
        updatePopupSpeakButtonUI();
    }

    if (ENABLE_POPUP_INFO_EDIT && popupEditBtn) popupEditBtn.addEventListener('click', enterPopupEditMode);
    if (ENABLE_POPUP_INFO_EDIT && popupCancelBtn) {
        popupCancelBtn.addEventListener('click', () => {
            if (currentSceneName) handleSceneChange(currentSceneName);
            exitPopupEditMode();
        });
    }
    if (ENABLE_POPUP_INFO_EDIT && popupSaveBtn) {
        popupSaveBtn.addEventListener('click', () => {
            if (!currentSceneName) return;
            sceneInfoOverrides[currentSceneName] = {
                purpose: document.getElementById('popup-purpose')?.innerText?.trim() || '',
                description: document.getElementById('popup-desc')?.innerText?.trim() || ''
            };
            saveSceneInfoOverrides();
            handleSceneChange(currentSceneName);
            exitPopupEditMode();
        });
    }
    updatePopupEditButtons();

    // Initialize gating state early.
    setInfoButtonEnabled(isSceneInConfiguredGroups(currentSceneName));
});

// Exposed for KRpano
window.handleSceneChange = handleSceneChange;
window.onready = onready;
window.openHotspotInfo = openHotspotInfo;
