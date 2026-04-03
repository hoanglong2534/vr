const fs = require('fs');
const path = '/home/long/STUDY_SPACE/PTIT/NAM_4/ky_2/thuc_tạp_vr_360/vtour/';
let tourHtml = fs.readFileSync(path + 'tour.html', 'utf8');

tourHtml = tourHtml.replace(/<div class="block b-ttdmst">.*?<\/div>/s, '<div class="block b-ttdmst"></div>');
tourHtml = tourHtml.replace(/<div class="block b-labvr">.*?<\/div>/s, '<div class="block b-labvr"></div>');
tourHtml = tourHtml.replace(/<div class="block b-cangtin">.*?<\/div>/s, '<div class="block b-cangtin"></div>');
tourHtml = tourHtml.replace(/<div class="block b-daynha">.*?<\/div>/s, '<div class="block b-daynha"></div>');
tourHtml = tourHtml.replace(/<div class="block b-sanbcv">.*?<\/div>/s, '<div class="block b-sanbcv"></div>');
tourHtml = tourHtml.replace(/<div class="block b-a3">.*?<\/div>/s, '<div class="block b-a3"></div>');
tourHtml = tourHtml.replace(/<div class="block b-thuvien">.*?<\/div>/s, '<div class="block b-thuvien"></div>');
tourHtml = tourHtml.replace(/<div class="block b-beca">.*?<\/div>/s, '<div class="block b-beca"></div>');
tourHtml = tourHtml.replace(/<div class="block b-hoa">.*?<\/div>/s, '<div class="block b-hoa"></div>');
tourHtml = tourHtml.replace(/<div class="block b-hta2">.*?<\/div>/s, '<div class="block b-hta2"></div>');
tourHtml = tourHtml.replace(/<div class="block b-a2">.*?<\/div>/s, '<div class="block b-a2"></div>');
tourHtml = tourHtml.replace(/<div class="block b-ktxb1">.*?<\/div>/s, '<div class="block b-ktxb1"></div>');
tourHtml = tourHtml.replace(/<div class="block b-ktxb5">.*?<\/div>/s, '<div class="block b-ktxb5"></div>');
tourHtml = tourHtml.replace(/<div class="block b-sanbr">.*?<\/div>/s, '<div class="block b-sanbr"></div>');
tourHtml = tourHtml.replace(/<div class="block b-hta1">.*?<\/div>/s, '<div class="block b-hta1"></div>');
tourHtml = tourHtml.replace(/<div class="block b-sanbd">.*?<\/div>/s, '<div class="block b-sanbd"></div>');
tourHtml = tourHtml.replace(/<div class="block b-baixe">.*?<\/div>/s, '<div class="block b-baixe"></div>');
tourHtml = tourHtml.replace(/<div class="block b-love">.*?<\/div>/s, '<div class="block b-love"></div>');
tourHtml = tourHtml.replace(/<div class="block b-a1">.*?<\/div>/s, '<div class="block b-a1"></div>');
tourHtml = tourHtml.replace(/<div class="block b-cong">.*?<\/div>/s, '<div class="block b-cong"></div>');

tourHtml = tourHtml.replace(/app\.js\?v=\d+/g, 'app.js?v=15');
tourHtml = tourHtml.replace(/style\.css\?v=\d+/g, 'style.css?v=15');

fs.writeFileSync(path + 'tour.html', tourHtml);
console.log('Stripped labels and bumped version to 15');
