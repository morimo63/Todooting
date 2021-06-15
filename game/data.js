class Dot{
    constructor(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

//画像を分割
let dots = [
    //j,png
    new Dot(2,0,26,25),//自機
    new Dot(1,28,5,5),//弾
    new Dot(2,34,26,25),//敵機
    new Dot(8,28,5,5)//弾
]