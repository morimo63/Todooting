//画面サイズ
const SCREEN_W = 512;
const SCREEN_H = 256;
//キャンバスサイズ
const CANVAS_W = SCREEN_W*2;
const CANVAS_H = SCREEN_H*2;
//フィールドサイズ
const FIELD_W = SCREEN_W;
const FIELD_H = SCREEN_H;
//キャンバス
let can = document.getElementById("gameCanvas");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;
const SMOOTHING = false;
con.mozimageSmoothingEnagbled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;
//フィールド(仮想画面)
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;
//カメラ座標
let camera_x = 0;
let camera_y = 0;


let gameoverJudge = false;
let winJudge = false;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//ゲームスピード(ms)
const GAME_SPEED = 1000/60;

let dotImage;

let key = [];

let player;
let enemy;
let enemyDiff;

let playerShots = [];
let enemyShots = [];
let enemyShots2 = [];

var intervalId;

//スタートメソッド
function Start(diff){
    enemyDiff = diff;
    gameInit();
}

//ゲーム初期設定
function gameInit(){
    player = new Player();
    enemy = new Enemy(enemyDiff);
    dotImage = new Image();
    dotImage.src = "char.png";
    intervalId = setInterval(gameLoop,GAME_SPEED);
    console.log("ID"+intervalId);
}

//ゲーム関数
function gameLoop(){
    if(player.life == 0)
        gameoverJudge = true;
    if(enemy.life == 0)
        winJudge = true;

    if(!winJudge){
        enemy.update();
        for(let i = enemyShots.length-1; i>=0; i--){
            enemyShots[i].update();
            if(enemyShots[i].kill) enemyShots.splice(i,1);
        }
        for(let i = enemyShots2.length-1; i>=0; i--){
            enemyShots2[i].update();
            if(enemyShots2[i].kill) enemyShots2.splice(i,1);
        }
    }
    if(!gameoverJudge){
        player.update();
        for(let i = playerShots.length-1; i>=0; i--){
            playerShots[i].update();
            if(playerShots[i].kill) playerShots.splice(i,1);
        }
    }

    //描画処理
    vcon.fillStyle = "gray";
    vcon.fillRect(camera_x,camera_y,SCREEN_W,SCREEN_H);

    if(!winJudge){
        enemy.draw();
        for(let i=0; i<enemyShots.length; i++) enemyShots[i].draw();
        for(let i=0; i<enemyShots2.length; i++) enemyShots2[i].draw();
    }
    if(!gameoverJudge){
        player.draw();
        for(let i=0; i<playerShots.length; i++) playerShots[i].draw();
    }

    //自機の範囲 0~FIELD_W
    //カメラの範囲 0~FIELD_W-SCREEN_W
    camera_x = (player.x>>8)/FIELD_W * (FIELD_W-SCREEN_W);
    camera_y = (player.y>>8)/FIELD_H * (FIELD_H-SCREEN_H);

    //上記までは仮想画面に表示されている
    //仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan,camera_x,camera_y,SCREEN_W,SCREEN_H,0,0,CANVAS_W,CANVAS_H);

    if(winJudge){
        enemy.kill = true;
        con.font = '30px Arial';
        con.fillStyle = "white";
        let t = "GAME CLEAR";
        let w = con.measureText(t).width;
        let x = CANVAS_W/2 - w/2;
        let y = CANVAS_H/2 - 20;
        con.fillText(t,x,y);
        winFinish();
    }

    if(gameoverJudge){
        player.kill = true;
        con.font = '30px Arial';
        con.fillStyle = "white";
        let t = "GAME OVER";
        let w = con.measureText(t).width;
        let x = CANVAS_W/2 - w/2;
        let y = CANVAS_H/2 - 20;
        con.fillText(t,x,y);
        con.font = '20px Arial';
        t = "Push 'R' key to restart !";
        w = con.measureText(t).width;
        x = CANVAS_W/2 - w/2;
        y = CANVAS_H/2 - 20+30;
        con.fillText(t,x,y);
        t = "Push 'D' key to decrease the difficulty and restart !";
        w = con.measureText(t).width;
        x = CANVAS_W/2 - w/2;
        y = CANVAS_H/2 - 20+50;
        con.fillText(t,x,y);
    }

    lifeDisplay(con);
}

async function winFinish(){
    await sleep(4000);
    document.getElementById("trigger").checked = false;
    clearInterval(intervalId);
    delete player;
    player = new Player();
    delete enemy;
    enemy = new Enemy();
    playerShots = [];
    enemyShots = [];
    enemyShots2 = [];
    winJudge = false;
    gameoverJudge = false;
    location.reload();
}
