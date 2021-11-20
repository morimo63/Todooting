// キー処理
document.onkeydown = function(e){
    if(e.keyCode == 91) return false;
    key[e.keyCode] = true;
    if(gameoverJudge && e.keyCode == 82){// リトライ
        delete player;
        player = new Player();
        enemy.life = 3;
        playerShots = [];
        enemyShots = [];
        enemyShots2 = [];
        gameoverJudge = false;
    }
    // if(gameoverJudge && e.keyCode == 68){// 難易度変更
    //     if(enemyDiff != 1) enemyDiff--;
    //     delete player;
    //     player = new Player();
    //     delete enemy;
    //     enemy = new Enemy(enemyDiff);
    //     gameoverJudge = false;
    // }
}
document.onkeyup = function(e){
    key[e.keyCode] =false;
}

// 円同士の当たり判定
function checkHit(x1,y1,r1,x2,y2,r2){
	let a = (x2-x1)>>8;
	let b = (y2-y1)>>8;
	let r = r1+r2;
	return r*r >= a*a + b*b ;
}

// ドットを表示
function drawDot (dot,x,y){
    let sx= dots[dot].x;
    let sy= dots[dot].y;
    let sw= dots[dot].w;
    let sh= dots[dot].h;
    let px = (x>>8) - sw/2;
    let py = (y>>8) - sh/2;

    //表示範囲外で動かないように
    if(px+sw<camera_x || px>=camera_x+SCREEN_W || py+sh<camera_y || py>=camera_y+SCREEN_H) return;
    vcon.drawImage(dotImage,sx,sy,sw,sh,px,py,sw,sh);
}

// ランダムメソッド
function rand(min,max){
    return Math.floor(Math.random()*(max-min+1)) + min;
}

// 残機表示
function lifeDisplay(con){
    con.font = '50px Arial';
    con.fillStyle = "white";
    if(player.life == 3){
        con.fillText("♥♥♥",10,500);
    }
    if(player.life == 2){
        con.fillText("♥♥",10,500);
    }
    if(player.life == 1){
        con.fillText("♥",10,500);
    }

    con.fillStyle = "black";
    if(enemy.life == 3){
        con.fillText("♥♥♥",930,35);
    }
    if(enemy.life == 2){
        con.fillText("♥♥",930,35);
    }
    if(enemy.life == 1){
        con.fillText("♥",930,35);
    }
}