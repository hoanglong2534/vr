const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';

// 1. Rewrite tour.html map structure
let tourHtml = fs.readFileSync(path + 'tour.html', 'utf8');
const mapBgRegex = /<div class="map-abstract-bg">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;
const newHtml = `
                <div class="map-abstract-bg">
                    <div class="custom-floorplan">
                        <div class="block b-ttdmst">TRUNG TÂM ĐỔI MỚI SÁNG TẠO</div>
                        <div class="block b-labvr">LAB THỰC TẬP VR</div>
                        <div class="block b-cangtin">CĂNG TIN</div>
                        <div class="block b-daynha">DÃY NHÀ</div>
                        <div class="block b-sanbcv">SÂN BÓNG<br>CHUYỀN</div>
                        <div class="block b-a3">A3</div>
                        <div class="block b-thuvien">THƯ VIỆN</div>
                        <div class="block b-beca">BỂ CÁ</div>
                        <div class="block b-hoa">HOA</div>
                        <div class="block b-hta2">HỘI TRƯỜNG A2</div>
                        <div class="block b-a2">A2</div>
                        <div class="block b-ktxb1">KTX B1</div>
                        <div class="block b-ktxb5">KTX B5</div>
                        <div class="block b-sanbr">SÂN BÓNG RỔ</div>
                        <div class="block b-hta1">HỘI TRƯỜNG A1</div>
                        <div class="block b-sanbd">SÂN BÓNG ĐÁ</div>
                        <div class="block b-baixe">BÃI ĐỂ XE</div>
                        <div class="block b-love">I LOVE PTIT</div>
                        <div class="block b-a1">A1</div>
                        <div class="block b-cong">CỔNG VÀO</div>
                    </div>
                </div>
            </div>
        </div>
`;
tourHtml = tourHtml.replace(mapBgRegex, newHtml.trim());
fs.writeFileSync(path + 'tour.html', tourHtml);

// 2. Rewrite style.css for schematic floorplan
let styleCss = fs.readFileSync(path + 'style.css', 'utf8');
// remove older schematic floorplan
styleCss = styleCss.replace(/\/\* --- SCHEMATIC FLOORPLAN --- \*\/[\s\S]*?\/\* Mobile Responsiveness \*\//, '/* Mobile Responsiveness */');

const newCSS = `
/* --- SCHEMATIC FLOORPLAN --- */
.map-wrapper {
    flex: 1;
    position: relative;
    overflow: hidden;
    margin: 10px;
    border-radius: 8px;
    background: #fdfdfd;
    border: 1px solid #ccc;
}
.map-abstract-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: #fafafa;
    background-image: linear-gradient(#e5e5e5 1px, transparent 1px), linear-gradient(90deg, #e5e5e5 1px, transparent 1px);
    background-size: 20px 20px;
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
    font-family: 'Inter', 'Segoe UI', sans-serif;
    font-size: 7px;
    line-height: 1.2;
    color: #444;
    background: #fff;
    border: 1px solid #777;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.1);
}
.b-ttdmst { left: 35%; width: 30%; top: 10%; height: 5%; font-weight: bold; }
.b-labvr { left: 20%; width: 8%; top: 25%; height: 5%; }
.b-cangtin { left: 35%; width: 13%; top: 17%; height: 21%; }
.b-daynha { left: 50%; width: 10%; top: 17%; height: 26%; }
.b-sanbcv { left: 35%; width: 13%; top: 40%; height: 10%; }
.b-a3 { left: 50%; width: 10%; top: 45%; height: 5%; }
.b-thuvien { left: 60%; width: 10%; top: 45%; height: 5%; }
.b-hta2 { left: 35%; width: 15%; top: 60%; height: 10%; }
.b-a2 { left: 50%; width: 20%; top: 60%; height: 10%; }
.b-beca { left: 52%; width: 6%; top: 53%; height: 5%; border-radius: 50%; }
.b-hoa { left: 62%; width: 6%; top: 53%; height: 5%; border-radius: 50%; }
.b-ktxb1 { left: 10%; width: 8%; top: 44%; height: 4%; }
.b-ktxb5 { left: 10%; width: 8%; top: 55%; height: 4%; }
.b-sanbr { left: 10%; width: 8%; top: 60%; height: 4%; }
.b-sanbd { left: 10%; width: 8%; top: 68%; height: 5%; }
.b-hta1 { left: 20%; width: 10%; top: 62%; height: 5%; }
.b-baixe { left: 20%; width: 10%; top: 68%; height: 4%; }
.b-love { left: 20%; width: 10%; top: 73%; height: 4%; }
.b-a1 { left: 11%; width: 19%; top: 78%; height: 17%; font-size: 10px !important; font-weight: bold; }
.b-cong { left: 40%; width: 10%; top: 94%; height: 5%; }

/* Redesigned nodes for bright map */
.map-point {
    background: #ff5252;
    border-color: #fff;
    opacity: 0.85;
}
.map-point.active {
    background: #ff0000;
    border-color: #000;
    box-shadow: 0 0 10px #ff0000, 0 0 5px #000;
    opacity: 1;
}
.map-point.active::before { border-color: #ff0000; }
.map-label { color: #fff; background: rgba(0,0,0,0.8); }

`;
styleCss = styleCss.replace('/* Mobile Responsiveness */', newCSS + '\n/* Mobile Responsiveness */');
fs.writeFileSync(path + 'style.css', styleCss);

// 3. Update app.js map nodes
let appJs = fs.readFileSync(path + 'app.js', 'utf8');
const mapNodesRegex = /const mapNodes = \[([\s\S]*?)\];/;
const newMapNodes = `
const mapNodes = [
    { title: 'Cổng trường', x: 45, y: 96 },
    { match: 'Tòa A1', title: 'Tòa A1', x: 20, y: 86 },
    { title: 'Nhà xe sinh viên', x: 25, y: 70 },
    { title: 'Khu vực gửi xe', x: 25, y: 70 },
    { title: 'I love PTIT', x: 25, y: 75 },
    { title: 'Hội trường A1', x: 25, y: 64 },
    { title: 'Hội trường', x: 42, y: 65 }, /* Hội trường A2 */
    { match: 'Tòa A2', title: 'Tòa A2', x: 60, y: 65 },
    
    // Left side column
    { title: 'Sân bóng đá', x: 14, y: 70 },
    { title: 'Sân bóng rổ', x: 14, y: 62 },
    { title: 'Ký túc xá B5', x: 14, y: 57 },
    { title: 'Ký túc xá B1', x: 14, y: 46 },
    
    // Middle column
    { title: 'Sân bóng chuyền', x: 41, y: 45 },
    { title: 'Sân trường', x: 32, y: 40 },
    { title: 'Nhà ăn Học viện', x: 41, y: 27 },
    { title: 'Trung tâm khởi nghiệp Đổi mới sáng tạo', x: 50, y: 12 },
    { title: 'TT ĐTQT', x: 24, y: 27 },
    
    // Right side column
    { title: 'Dãy nhà B14', x: 55, y: 30 },
    { title: 'Khu vực cây xanh', x: 55, y: 56 }, /* Bể cá/Hoa */
    { match: 'Tòa A3', title: 'Tòa A3', x: 55, y: 47 },
    { title: 'Thư viện PTIT', x: 65, y: 47 }
];
`;
appJs = appJs.replace(mapNodesRegex, newMapNodes.trim());
fs.writeFileSync(path + 'app.js', appJs);

console.log("Updated map fully to match new provided grid blueprint.");
