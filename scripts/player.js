let floorBtns = [];
let p1Pos = [10.5, -12];
let p2Pos = [10.5, 12];
let bPos = [11, 11];
let bigger1 = false;
let bigger2 = false;

// 按鈕物件抓取
for (let i=0; i<638; i++) {
    let btn = document.getElementById(`floor${i}`);
    floorBtns.push(btn);
}

// 玩家及球初始化及更新
function update() {
    floorBtns[p(p1Pos[0]+0.5, p1Pos[1])].setAttribute("class", "player");
    floorBtns[p(p1Pos[0]-0.5, p1Pos[1])].setAttribute("class", "player");
    if (bigger1) floorBtns[p(p1Pos[0]+1.5, p1Pos[1])].setAttribute("class", "player");
    if (bigger1) floorBtns[p(p1Pos[0]-1.5, p1Pos[1])].setAttribute("class", "player");
    floorBtns[p(p2Pos[0]+0.5, p2Pos[1])].setAttribute("class", "player");
    floorBtns[p(p2Pos[0]-0.5, p2Pos[1])].setAttribute("class", "player");
    if (bigger2) floorBtns[p(p2Pos[0]+1.5, p2Pos[1])].setAttribute("class", "player");
    if (bigger2) floorBtns[p(p2Pos[0]-1.5, p2Pos[1])].setAttribute("class", "player");
    floorBtns[p(bPos[0], bPos[1])].setAttribute("class", "ball");
}
update();
function emp() {
    floorBtns[p(p1Pos[0]+0.5, p1Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p1Pos[0]-0.5, p1Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p1Pos[0]+1.5, p1Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p1Pos[0]-1.5, p1Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p2Pos[0]+0.5, p2Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p2Pos[0]-0.5, p2Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p2Pos[0]+1.5, p2Pos[1])].setAttribute("class", "normal");
    floorBtns[p(p2Pos[0]-1.5, p2Pos[1])].setAttribute("class", "normal");
    floorBtns[p(bPos[0], bPos[1])].setAttribute("class", "normal");
}

// 按鈕座標轉換編號（x（0~21）座標以球場左端為原點；y（-14~14）座標依中線為原點）
function p(x, y) {
    return 22*(y+14)+x;
}

// 玩家移動機制
document.body.addEventListener('keydown', keyboard)
function move(who, which, where) {
    emp();
    eval(`p${who}Pos[${which}]${where}`);
    update();
}
function keyboard(e) {
    switch(e.keyCode) {
        case 38: // 上
            if (p1Pos[1]==-13) break;
            move(1, 1, '--');
            break;
        case 37: // 左
            if (p1Pos[0]==1.5) break;
            move(1, 0, '--');
            break;
        case 40: // 下
            if (p1Pos[1]==-1) break;
            move(1, 1, '++');
            break;
        case 39: // 右
            if (p1Pos[0]==19.5) break;
            move(1, 0, '++');
            break;
        case 87: // w 上
            if (p2Pos[1]==1) break;
            move(2, 1, '--');
            break;
        case 65: // a 左
            if (p2Pos[0]==1.5) break;
            move(2, 0, '--');
            break;
        case 83: // s 下
            if (p2Pos[1]==13) break;
            move(2, 1, '++');
            break;
        case 68: // d 右
            if (p2Pos[0]==19.5) break;
            move(2, 0, '++');
            break;
    }
}

// 玩家擊球機制 
document.body.addEventListener('keydown', spaced)
function spaced(e) {
    switch(e.keyCode) {
        case 32:
            emp();
            bigger2 = true;
            update();
            break;
        case 96:
            emp();
            bigger1 = true;
            update();
            break;
    }
}
document.body.addEventListener('keyup', spaceu)
function spaceu(e) {
    switch(e.keyCode) {
        case 32:
            emp();
            bigger2 = false;
            update();
            break;
        case 96:
            emp();
            bigger1 = false;
            update();
            break;
    }
}