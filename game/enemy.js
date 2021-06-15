//敵弾クラス
class EnemyShot{
    constructor(x,y,vx,vy){
        this.dot = 3;
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

        if(!player.muteki && checkHit(this.x,this.y,this.r,player.x,player.y,player.r)){
            this.kill = true;
            player.life--;
            player.damage = 10;
            player.muteki = 60;
        }
    }

    draw(){
        drawDot(this.dot,this.x,this.y);
    }
}

//敵クラス
class Enemy{
	constructor(diff){
        this.x = (FIELD_W/2)<<8;
        this.y = (FIELD_H/6)<<8;
        this.vx = 500;
        this.vy = 0;
        this.kill = false;
        this.flag = false;
        this.r = 6;
        this.life = 3;
        this.count = 0;
        this.damage = 0;
        this.muteki = 0;
        this.diff = String(diff);
    }

	update(){
        this.count++;
        if(this.damage) this.damage--;
        if(this.muteki) this.muteki--;
        this.x += this.vx;

        if(this.x < 50000) this.vx += 10;
        if(this.x > 80000) this.vx -= 10;

        if(gameoverJudge) return;
        else{
            if(enemyShots.length < 1){
                switch(this.diff){
                    case "1":
                        enemyShots.push(new EnemyShot(this.x,this.y,0,500));
                        break;
                    case "2":
                        enemyShots.push(new EnemyShot(this.x,this.y,0,800));
                        break;
                    case "3":
                        enemyShots.push(new EnemyShot(this.x,this.y,300,600));
                        enemyShots.push(new EnemyShot(this.x,this.y,-300,600));
                        break;
                    case "4":
                        enemyShots.push(new EnemyShot(this.x,this.y,200,900));
                        enemyShots.push(new EnemyShot(this.x,this.y,-200,900));
                        break;
                    case "5":
                        enemyShots.push(new EnemyShot(this.x,this.y,300,800));
                        enemyShots.push(new EnemyShot(this.x,this.y,-300,800));
                        enemyShots.push(new EnemyShot(this.x,this.y,200,900));
                        enemyShots.push(new EnemyShot(this.x,this.y,-200,900));
                        break;
                }

            }
            if(enemyShots2.length < 1){
                let an,dx,dy;
                an = Math.atan2(player.y-this.y,player.x-this.x);
                dx = Math.cos(an) * 500;
                dy = Math.sin(an) * 500;
                enemyShots2.push(new EnemyShot(this.x,this.y,dx,dy));
            }
        }

        if(checkHit(this.x,this.y,this.r,player.x,player.y,player.r)){
            player.damage = 10;
        }
    }

	draw(){
        if(this.muteki && (this.count&1)) return;
        drawDot(2,this.x,this.y);
	}
}