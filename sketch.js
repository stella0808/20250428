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
      let g = green(col); // 取得 G 值
      graphics.fill(0, g, 100); // 設定方框顏色 (R=0, G=G 值, B=100)
      graphics.noStroke();
      graphics.rect(x - 9, y - 9, 18, 18); // 繪製方框 (中心對齊)

      // 繪製黑色星星
      graphics.fill(0); // 星星顏色為黑色
      drawStar(graphics, x, y, 2.5, 5, 5); // 在方框中心繪製星星
    }
  }
}

function drawStar(pg, x, y, radius1, radius2, npoints) {
  // 繪製星星的輔助函式
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  pg.beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    pg.vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    pg.vertex(sx, sy);
  }
  pg.endShape(CLOSE);
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布和攝影機大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新建立與攝影機畫面大小相同的 Graphics
  graphics = createGraphics(capture.width, capture.height);


}  graphics.clear();  graphics.clear();

