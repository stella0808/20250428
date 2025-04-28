let capture;
let graphics;

function setup() {
  // 設定畫布為視窗大小，背景顏色為 #ffe5ec
  createCanvas(windowWidth, windowHeight);
  background('#1e6091');

  // 啟用攝影機，設定寬高為視窗大小的 80%
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);
  capture.hide(); // 隱藏原始的 HTML 視訊元素

  // 建立與攝影機畫面大小相同的 Graphics
  graphics = createGraphics(capture.width, capture.height);
  graphics.clear(); // 確保背景透明
}

function draw() {
  // 設定背景顏色
  background('#1e6091');

  // 翻轉畫布以修正左右顛倒
  push(); // 儲存當前畫布狀態
  translate(width, 0); // 將畫布原點移到右上角
  scale(-1, 1); // 水平翻轉畫布

  // 將攝影機影像繪製到畫布中央
  image(capture, (width - capture.width) / 2, (height - capture.height) / 2, capture.width, capture.height);

  // 將 graphics 繪製到攝影機影像上方
  image(graphics, (width - capture.width) / 2, (height - capture.height) / 2);

  pop(); // 恢復畫布狀態

  // 在 graphics 上繪製內容
  graphics.background(0); // 設定背景為黑色
  for (let x = 0; x < graphics.width; x += 20) {
    for (let y = 0; y < graphics.height; y += 20) {
      // 從 capture 中取得對應位置的顏色
      let col = capture.get(x, y);
      graphics.fill(col); // 設定圓的顏色
      graphics.noStroke();
      graphics.ellipse(x, y, 15, 15); // 繪製圓形
    }
  }
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布和攝影機大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新建立與攝影機畫面大小相同的 Graphics
  graphics = createGraphics(capture.width, capture.height);
  graphics.clear();
}
