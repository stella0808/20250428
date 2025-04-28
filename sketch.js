let capture;
let overlayGraphics;

function setup() {
  // 設定畫布為視窗大小，背景顏色為 #ffe5ec
  createCanvas(windowWidth, windowHeight);
  background('#ffe5ec');

  // 啟用攝影機，設定寬高為視窗大小的 80%
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機畫面大小相同的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.clear(); // 確保背景透明
}

function draw() {
  // 設定背景顏色
  background('#ffe5ec');

  // 翻轉畫布以修正左右顛倒
  push(); // 儲存當前畫布狀態
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像繪製到畫布中央
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2, capture.width, capture.height);

  // 將 overlayGraphics 繪製到攝影機影像上方
  image(overlayGraphics, (width - capture.width) / 2, (height - capture.height) / 2);

  pop(); // 恢復畫布狀態

  // 在 overlayGraphics 上繪製內容
  overlayGraphics.clear(); // 清除之前的內容
  //overlayGraphics.fill(255, 0, 0, 150); // 半透明紅色
  overlayGraphics.noStroke();
  //overlayGraphics.fill(255, 0, 0); // 紅色
    overlayGraphics.ellipseMode(CENTER); // 設定圓形繪製模式為中心
  overlayGraphics.ellipse(overlayGraphics.width / 2, overlayGraphics.height / 2, 100, 100); // 繪製紅色圓形
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布和攝影機大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新建立與攝影機畫面大小相同的 Graphics
  overlayGraphics = createGraphics(capture.width, capture.height);
  overlayGraphics.clear();
}
