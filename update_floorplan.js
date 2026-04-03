const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';

// 1. Clean tour.xml
let tourXml = fs.readFileSync(path + 'tour.xml', 'utf8');
tourXml = tourXml.replace(/<hotspot\s+name="info_[^>]+>/g, '');
fs.writeFileSync(path + 'tour.xml', tourXml);

// 2. Update tour.html
let tourHtml = fs.readFileSync(path + 'tour.html', 'utf8');
const abstractBgRegex = /<div class="map-abstract-bg">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const customFloorplanHtml = `
                <div class="map-abstract-bg">
                    <div class="custom-floorplan">
                        <div class="block b-ktx-b1">KÍ TÚC XÁ B1</div>
                        <div class="block b-ktx-b5">KÍ TÚC XÁ B5</div>
                        <div class="block b-san-b5">SÂN B5</div>
                        <div class="block b-san-bong"><div class="fb-center"></div><div class="fb-line"></div></div>
                        <div class="block b-cang-tin">CĂNG TIN</div>
                        <div class="block b-phong-rieng">PHÒNG<br>RIÊNG</div>
                        <div class="block b-ht-a1">HỘI TRƯỜNG A1</div>
                        <div class="block b-ht-a2">HỘI<br>TRƯỜNG<br>A2</div>
                        <div class="block b-a2">TÒA NHÀ A2</div>
                        <div class="block b-a3">TÒA NHÀ A3</div>
                        <div class="block b-vuon">VƯỜN THƯỢNG<br>UYỂN</div>
                        <div class="block b-nha-xe">NHÀ<br>GỬI<br>XE</div>
                        <div class="block b-coffee">P.coffee</div>
                        <div class="block b-a1">TÒA NHÀ A1</div>
                        <div class="block b-vp">VĂN PHÒNG<br>MỘT CỬA</div>
                        <div class="road-system">
                            <div class="road-dashed"></div>
                        </div>
                        <div class="gate-wrap">
                            <div class="gate-arch"></div>
                            <div class="gate-text">Cổng trường</div>
                            <div class="gate-arrow"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
tourHtml = tourHtml.replace(abstractBgRegex, customFloorplanHtml.trim());
fs.writeFileSync(path + 'tour.html', tourHtml);

// 3. Update style.css
let styleCss = fs.readFileSync(path + 'style.css', 'utf8');
// remove the old .map-abstract-bg
styleCss = styleCss.replace(/\.map-abstract-bg\s*\{[\s\S]*?\}/, '');
// append the floorplan CSS right before @media
const newMapCSS = `
/* --- SCHEMATIC FLOORPLAN --- */
.map-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
    margin: 15px;
    border-radius: 0;
    background: transparent;
    border: none;
}
.map-abstract-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: #faedce;
    border: 3px solid #000;
    box-shadow: 0 0 0 10px #ba3b39;
}
.custom-floorplan {
    position: relative;
    width: 100%;
    height: 100%;
}
.custom-floorplan .block {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-family: 'Arial', sans-serif;
    font-size: 8px;
    line-height: 1.1;
    font-weight: bold;
    color: #fff;
    border-radius: 1px;
}
.b-ktx-b1 { top: 7%; left: 7%; width: 20%; height: 9%; background: #ba3b39; }
.b-ktx-b5 { top: 18%; left: 7%; width: 22%; height: 8%; background: #ba3b39; }
.b-san-b5 { top: 28%; left: 7%; width: 20%; height: 5%; background: #009641; }
.b-san-bong { top: 35%; left: 7%; width: 13%; height: 16%; background: #327357; border: 1px solid #1a3c2e; flex-direction: column; overflow: hidden; }
.b-san-bong .fb-line { width: 100%; height: 1px; background: rgba(0,0,0,0.5); position: absolute; top: 50%; }
.b-san-bong .fb-center { width: 10px; height: 10px; border: 1px solid rgba(0,0,0,0.5); border-radius: 50%; position: absolute; }
.b-ht-a1 { top: 36%; left: 22%; width: 18%; height: 10%; background: #ba3b39; }
.b-cang-tin { top: 10%; left: 35%; width: 10%; height: 14%; background: #ba3b39; }
.b-phong-rieng { top: 10%; left: 45%; width: 9%; height: 10%; background: #c68081; color: #fff;}
.b-ht-a2 { top: 31%; left: 43%; width: 20%; height: 18%; background: #ba3b39; }
.b-a2 { top: 28%; left: 63%; width: 20%; height: 21%; background: #ba3b39; }
.b-a3 { top: 8%; left: 68%; width: 21%; height: 17%; background: #ba3b39; }

.b-vuon { top: 49%; left: 16%; width: 14%; height: 6%; background: #c68081; color: #fff; font-size: 6px !important; }
.b-nha-xe { top: 48%; left: 32%; width: 7%; height: 10%; background: #ba3b39; font-size: 7px !important;}
.b-coffee { top: 46%; left: 43%; width: 8%; height: 4%; background: #c68081; font-size: 6px !important; }

.b-a1 { top: 62%; left: 17%; width: 30%; height: 12%; background: #ba3b39; font-size: 10px !important;}
.b-vp { top: 68%; left: 74%; width: 13%; height: 7%; background: #ba3b39; font-size: 7px !important;}

.road-system {
    position: absolute;
    bottom: 8%; left: 10%; width: 80%;
    border-top: 2px solid #000;
    border-bottom: 2px solid #000;
    height: 8%;
}
.road-dashed {
    position: absolute; top: 50%; width: 100%; border-top: 1px dashed #000;
}
.gate-wrap {
    position: absolute;
    bottom: 8%; left: 55%; width: 16%; height: 15%;
}
.gate-arch {
    position: absolute; bottom: 0; left: 10%; width: 80%; height: 70%;
    border: 3px solid #000; border-bottom: none; border-radius: 50% 50% 0 0; background: #faedce; z-index: 1;
}
.gate-text {
    position: absolute; top: 0; left: 0%; width: 100%; text-align: center;
    font-size: 8px; color: #ba3b39; font-weight: bold; z-index: 2;
}
.gate-arrow {
    position: absolute; bottom: -8px; left: 50%; width: 0; height: 0;
    transform: translateX(-50%);
    border-left: 6px solid transparent; border-right: 6px solid transparent; border-bottom: 8px solid #555;
}

/* Fix point styling to stand out against bright map */
.map-point {
    background: #000;
    border-color: #fff;
}
.map-point.active {
    background: #FFD700;
    border-color: #000;
    box-shadow: 0 0 10px #FFD700, 0 0 5px #000;
}
.map-point.active::before { border-color: #FFD700; }
.map-label { color: #fff; font-weight: bold; }
`;
styleCss = styleCss.replace('/* Mobile Responsiveness */', newMapCSS + '\n/* Mobile Responsiveness */');
fs.writeFileSync(path + 'style.css', styleCss);

// 4. Update Map Nodes Coordinates in app.js
let appJs = fs.readFileSync(path + 'app.js', 'utf8');
const mapNodesRegex = /const mapNodes = \[([\s\S]*?)\];/;
const newMapNodes = `
const mapNodes = [
    { title: 'Cổng trường', x: 63, y: 88 },
    { title: 'Sân trường', x: 50, y: 55 }, 
    { title: 'Sân bóng rổ', x: 13, y: 43 },
    { title: 'Hội trường', x: 53, y: 40 },
    { title: 'Hội trường A1', x: 31, y: 41 },
    
    { match: 'Tòa A1', title: 'Tòa A1', x: 32, y: 68 },
    { match: 'Tòa A2', title: 'Tòa A2', x: 73, y: 38 },
    { match: 'Tòa A3', title: 'Tòa A3', x: 78, y: 16 },
    
    { title: 'Thư viện PTIT', x: 80, y: 71 }, /* vp mot cua */
    { title: 'Khu vực cây xanh', x: 23, y: 52 },
    { title: 'Nhà xe sinh viên', x: 35, y: 53 },
    
    { title: 'Nhà ăn Học viện', x: 40, y: 17 },
    { title: 'Ký túc xá B1', x: 17, y: 11 },
    { title: 'Ký túc xá B5', x: 18, y: 22 },
    
    { title: 'TT ĐTQT', x: 81, y: 50 },
    { title: 'Trung tâm khởi nghiệp Đổi mới sáng tạo', x: 13, y: 60 },
    { title: 'Sân bóng chuyền', x: 13, y: 36 },
    { title: 'Dãy nhà B14', x: 81, y: 55 },
    { title: 'Khu vực gửi xe', x: 35, y: 53 },
    { title: 'I love PTIT', x: 45, y: 75 }
];
`;
appJs = appJs.replace(mapNodesRegex, newMapNodes.trim());
fs.writeFileSync(path + 'app.js', appJs);

console.log("Successfully generated schematic map and removed info hotspots");

