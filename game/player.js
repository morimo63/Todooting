//自機弾クラス
class Shot{
    constructor(x,y,vx,vy){
        this.dot = 1;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.kill = false;
        this.r = 3;
    }

    update(){
        this.x += this.vx;
        this.y += this.vy;

        if(this.x<0 || this.x >FIELD_W<<8 || this.y<0 || this.y >FIELD_H<<8)
            this.kill = true;

        if(!enemy.muteki && checkHit(this.x,this.y,this.r,enemy.x,enemy.y,enemy.r)){
            enemy.life--;
            enemy.damage = 10;
            enemy.muteki = 60;
        }
    }

    draw(){
        drawDot(this.dot,this.x,this.y);
    }
}

// 自機クラス
class Player{
    constructor(){
        this.x = (FIELD_W/2)<<8;
        this.y = (FIELD_H/1.25)<<8;
        this.speed = 650;
        this.reload = 0;
        this.relo2 = 0;
        this.r = 6;
        this.damage = 0;
        this.muteki = 0;
        this.count = 0;
        this.life = 2;
        this.kill = false;
    }

    //移動
    update(){
        this.count++;
        if(this.damage) this.damage--;
        if(this.muteki) this.muteki--;
        if(key[32] && this.reload == 0){
            // 弾の配列に追加
            playerShots.push(new Shot(this.x,this.y,0,-800));
            // この数字の値に1発打つことができる
            this.reload = 1;
            // if文内の数打ったら遅くする
            if(++this.relo2 == 1){
                this.reload = 20;
                this.relo2 = 0;
            }
        }
        if(!key[32]) this.reload = this.relo2 = 0;
        if(this.reload > 0) this.reload--;
        if(key[37]) this.x -= this.speed;
        if(key[38]) this.y -= this.speed;
        if(key[39]) this.x += this.speed;
        if(key[40]) this.y += this.speed;

        //ここで範囲チェックする
		if(this.x < 0) this.x = 0;
		if(this.x >= (FIELD_W<<8)) this.x = (FIELD_W<<8)-1;
		if(this.y < 0) this.y = 0;
		if(this.y >= (FIELD_H<<8)) this.y = (FIELD_H<<8)-1;

        if(checkHit(this.x,this.y,this.r,enemy.x,enemy.y,enemy.r)){
            enemy.damage = 10;
        }
    }

    //描画
    draw(){
        if(this.muteki && (this.count&1)) return;
        drawDot(0,this.x,this.y);
    }
}