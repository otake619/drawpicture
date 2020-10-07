//描画領域に関するcanvasの設定
let canvas = document.getElementById("picture");
let ctx = canvas.getContext("2d");
//ダウンロードに関する入力ボタンを取得
let downloadCanvas = document.getElementById("download");
//右クリックを離す、またはcanvas外へ出てしまう前の描画座標
let xPosition = null;
let yPosition = null;
//右クリックを押し続けているかのフラグ
let isHold = false;
//canvasに描画された内容をjpgでダウンロード
downloadCanvas.onclick = download();
//描画する線の色
let drawingColor;
//描画する線の太さ
let drawingWidth;
//画面描画後の処理
window.addEventListener('load', () => {
    //canvas要素の大きさを指定(単位はpx)
    canvas.width = 700;
    canvas.height = 600;
    //描画する線の太さ(初期設定は3.0)
    drawingWidth = 5.0;
    //ペイントの初期設定(最初は黒)
    drawingColor = "#000000";
    //マウスのイベントに対する各種操作
    canvas.addEventListener('mousedown', (event) => {
        drawStart(event);
        draw(event);
    });
    canvas.addEventListener('mouseup', () => {
        mouseout();
    });
    canvas.addEventListener('mousemove', (event) => {
        draw(event);
    });

    //線の色を変更する要素を取得
    document.getElementById("red").onclick = changeRed;
    document.getElementById("black").onclick = changeBlack;
    document.getElementById("aqua").onclick = changeAqua;
    document.getElementById("purple").onclick = changePurple;
    document.getElementById("white").onclick = changeWhite;
    document.getElementById("gray").onclick = changeGray;
    document.getElementById("green").onclick = changeGreen;
    document.getElementById("blue").onclick = changeBlue;
    //線の太さを変更
    document.getElementById("width").onclick = changeWidth;
    //消しゴムを選択
    document.getElementById("reset").onclick = reset;
    //現在の色を表示
    document.getElementById("currentColor").style.backgroundColor = drawingColor;

});

//canvas領域に描画された内容をpng画像へと変換
function download() {
    var download = document.getElementById("download");
    var image = document.getElementById("picture").toDataURL("image/png").replace("image/png", "image/octet-stream");
    download.setAttribute("href", image);
}

//pngの背景色を白に変更
function setBgColor(){
    // canvasの背景色を設定
    var bgColor = "#FFFFFF";
    ctx.fillStyle = bgColor;
    //左上の(0,0)の位置からcanvasWidth,canvasHeight
    //分の領域を描画領域として確保
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//canvas要素に描画する
function draw(e){
    //右クリックが押されていた時だけ描画
    if(isHold === true){
        //座標設定
        x = e.layerX;
        y = e.layerY;
        //線の太さ
        ctx.lineWidth = drawingWidth;
        //ペイントする際の先端の形状
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        //描画に関する色設定
        ctx.strokeStyle = drawingColor;
        //描画する始点をxPosition,yPositionへ変更
        ctx.moveTo(x, y);
        //パスを繋ぐメソッド
        ctx.lineTo(xPosition, yPosition);
        //パスを描画する
        
        ctx.stroke();
        //次の描画位置
        xPosition = x;
        yPosition = y;
    } else {
        //右クリックが離されていたら、描画しない
        //設定を変更することもあり得るため、関数を抜ける
        return;
    }
}

//線の色を赤へ変更
function changeRed(){
    sourceOver();
    //ペイントの色を赤へ変更
    drawingColor = "#ff0000";
    //現在の色を表示
    displayColor();
}

//線の色を黒へ変更
function changeBlack(){
    sourceOver();
    drawingColor = "#000000";
    //現在の色を表示
    displayColor();
}

//線の色を白へ変更
function changeWhite(){
    //透明で塗りつぶし
    //重なった線は表示されない
    ctx.globalCompositeOperation = 'destination-out';
    drawingColor = "#ffffff";
    //現在の色を表示
    displayColor();
}

//線の色を紫へ変更
function changePurple(){
    sourceOver();
    drawingColor = "#800080";
    //現在の色を表示
    displayColor();
}

//線の色を緑へ変更
function changeGreen(){
    sourceOver();
    drawingColor = "#008000";
    //現在の色を表示
    displayColor();
}

//線の色をアクアへ変更
function changeAqua(){
    sourceOver();
    drawingColor = "#00ffff";
    //現在の色を表示
    displayColor();
}

//線の色をグレーへ変更
function changeGray(){
    sourceOver();
    drawingColor = "#808080";
    //現在の色を表示
    displayColor();
}

//線の色を青へ変更
function changeBlue(){
    sourceOver();
    drawingColor = "#0000ff";
    //現在の色を表示
    displayColor();
}

function changeWidth(){
    //描画する線の太さ
    drawingWidth = document.getElementById("width").value;
}

//描画された内容を消去
function reset(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//右クリックが押されて、描画が開始した状態
function drawStart(e){
    isHold = true;
    //canvasに新しくパスを作成
    ctx.beginPath();
    //カーソルをペンの画像へ変更
    document.body.style.cursor = "url(./image/pen.png), auto";
    //イベントが起きた座標を取得
    xPosition = e.layerX;
    yPosition = e.layerY;
}

//右クリックから指が離れた状態
function mouseout(){
    isHold = false;
    //作成したパスを閉じる
    ctx.closePath();
    //マウスカーソルの形状をデフォルトへ戻す
    document.body.style.cursor = "auto";
    //座標をリセット
    xPosition = null;
    yPosition = null;
}

//現在編集中の色を表示
function displayColor(){
    //現在の色を表示
    document.getElementById("currentColor").style.backgroundColor = drawingColor;
}

function sourceOver(){
    //描画の方法。
    //線が重なった場合、新規の線が一番上に表示される。
    ctx.globalCompositeOperation = 'source-over';
}