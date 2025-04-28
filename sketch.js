let capture;

function setup() {
    // 設定畫布為視窗大小，背景顏色為 #ffe5ec
    createCanvas(windowWidth, windowHeight);
    background('#ffe5ec');

    // 啟用攝影機，設定寬高為視窗大小的 80%
    capture = createCapture(VIDEO);
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
    capture.hide(); // 隱藏原始的 HTML 視訊元素
}

function draw() {
    // 將攝影機影像繪製到畫布中央
    image(capture, (width - capture.width) / 2, (height - capture.height) / 2, capture.width, capture.height);
}

function windowResized() {
    // 當視窗大小改變時，重新調整畫布和攝影機大小
    resizeCanvas(windowWidth, windowHeight);
    capture.size(windowWidth * 0.8, windowHeight * 0.8);
}
