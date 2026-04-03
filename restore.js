const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/tour.html';

let html = fs.readFileSync(path, 'utf8');

// The file is corrupted starting from `</aside>`.
const splitIndex = html.indexOf('</aside>');

const headerHtml = html.substring(0, splitIndex).replace(/style\.css\?v=\d+/g, 'style.css?v=28');

const correctBodyHtml = `</aside>

    <!-- Main Pano Area -->
    <main class="app-main">
        <div id="pano">
            <noscript><table style="width:100%;height:100%;"><tr style="vertical-align:middle;text-align:center;"><td>ERROR:<br><br>Javascript not activated<br><br></td></tr></table></noscript>
            <script src="tour.js"></script>
            <script src="app.js?v=28"></script>
            <script>
                embedpano({
                    xml:"tour.xml", 
                    target: "pano",
                    html5: "always",
                    mobilescale: 1.0,
                    passQueryParameters: "startscene,startlookat",
                    onready: onready
                });
            </script>
        </div>

        <!-- Info Popup Modal -->
        <div id="info-popup">
            <button class="close-btn" title="Đóng">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <div class="popup-content">
                <h2 id="popup-title">Tiêu đề</h2>
                <p id="popup-desc">Mô tả thông tin chi tiết về cảnh quay này.</p>
            </div>
        </div>

        <!-- Modal Overlay -->
        <div id="popup-overlay"></div>

        <!-- Minimap Modal -->
        <div id="minimap-modal" class="minimap-container">
            <button class="close-btn" id="map-close" title="Đóng bản đồ">
                <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </button>
            <h3>Sơ đồ khuôn viên</h3>
            <div class="map-wrapper" id="map-nodes">
                <div class="map-abstract-bg">
                    <div class="custom-floorplan">
                        <div class="block b-ttdmst"></div>
                        <div class="block b-labvr"></div>
                        <div class="block b-cangtin"></div>
                        <div class="block b-daynha"></div>
                        <div class="block b-sanbcv"></div>
                        <div class="block b-a3"></div>
                        <div class="block b-thuvien"></div>
                        <div class="block b-beca"></div>
                        <div class="block b-hoa"></div>
                        <div class="block b-hta2"></div>
                        <div class="block b-a2"></div>
                        <div class="block b-ktxb1"></div>
                        <div class="block b-ktxb5"></div>
                        <div class="block b-sanbr"></div>
                        <div class="block b-hta1"></div>
                        <div class="block b-sanbd"></div>
                        <div class="block b-baixe"></div>
                        <div class="block b-love"></div>
                        <div class="block b-a1"></div>
                        <div class="block b-cong"></div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</div>

</body>
</html>
`;

fs.writeFileSync(path, headerHtml + correctBodyHtml);
console.log("Restored tour.html and bumped version to 28!");
