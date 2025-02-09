let floorBtns = [];
let p1Pos = [10.5, -12];
let p2Pos = [10.5, 12];
let bPos = [11, 11];
let bigger1 = false;
let bigger2 = false;
let started = false;
let ballwho = '2';
let rotate = 0; // 0：y移動時x不變、1：y每移動一格，x移動一格、2：y每移動兩格，x移動一格，以此類推
let p1score = 0;
let p2score = 0;
let path = window.location.pathname;
let mode = !path.split("/").pop().startsWith('1');
let going = false;

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
    if (bPos[1]!=0)
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
    if (bPos[1]!=0)
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
            if (p1Pos[0]==2.5) break;
            move(1, 0, '--');
            break;
        case 40: // 下
            if (p1Pos[1]==-1) break;
            move(1, 1, '++');
            break;
        case 39: // 右
            if (p1Pos[0]==18.5) break;
            move(1, 0, '++');
            break;
    }
    if (mode) {
        switch(e.keyCode) {
            case 87: // w 上
                if (p2Pos[1]==1) break;
                move(2, 1, '--');
                break;
            case 65: // a 左
                if (p2Pos[0]==2.5) break;
                move(2, 0, '--');
                break;
            case 83: // s 下
                if (p2Pos[1]==13) break;
                move(2, 1, '++');
                break;
            case 68: // d 右
                if (p2Pos[0]==18.5) break;
                move(2, 0, '++');
                break;
        }
    }
}

// 玩家擊球機制 
document.body.addEventListener('keydown', spaced)
function spaced(e) {
    switch(e.keyCode) {
        case 96:
            emp();
            bigger1 = true;
            if (started == false && ballwho == '1') {
                faBall('1');
                started = true;
                going = true;
                foloBall();
            }
            update();
            break;
    }
    if (mode) {
        switch(e.keyCode) {
            case 32:
                emp();
                bigger2 = true;
                if (started == false && ballwho == '2') {
                    faBall(ballwho);
                    started = true;
                }
                update();
                break;
        }
    }
}
document.body.addEventListener('keyup', spaceu)
function spaceu(e) {
    switch(e.keyCode) {
        case 96:
            emp();
            bigger1 = false;
            update();
            break;
    }
    if (mode) {
        switch(e.keyCode) {
            case 32:
                emp();
                bigger2 = false;
                update();
                break;
        }
    }
}

function faBall(who) {
    ballfly(who=="2"?-1:1);
}

// 球移動機制
let movement = 0;
function ballfly(toWho) {
    movement = 0;
    fly(toWho, rotate);
}

function fly(toWho, rot = 0) {
    movement++;
    emp();
    bPos[1] += toWho;
    if (rot!=0 && movement%Math.abs(rot)==0) bPos[0] += rot/Math.abs(rot);
    update();
    if ((bPos[1] == eval(`p${toWho==1?"2":"1"}Pos[1]`)-toWho && eval(`bigger${toWho==1?"2":"1"}`) == true) &&
        (bPos[0] == eval(`p${toWho==1?"2":"1"}Pos[0]+0.5`)||bPos[0] == eval(`p${toWho==1?"2":"1"}Pos[0]-0.5`)||
        bPos[0] == eval(`p${toWho==1?"2":"1"}Pos[0]+1.5`)||bPos[0] == eval(`p${toWho==1?"2":"1"}Pos[0]-1.5`))
        || 
    bPos[1] == 13 || bPos[1] == -13 || bPos[0] == 1 || bPos[0] == 20) {
        if (bPos[1] == eval(`p${toWho==1?"2":"1"}Pos[1]`)-toWho) {
            rotate = ((Math.floor(Math.random()*2)==1)?-1:1) * (Math.floor(Math.random()*4)+3);
            setTimeout(() => ballfly(-toWho), 100);
        }
        if (bPos[1] == 13) setTimeout(() => pause(1), 200);
        if (bPos[1] == -13) setTimeout(() => pause(2), 200);
        if ((bPos[0] == 1 || bPos[0] == 20) && bPos[1]>0) setTimeout(() => pause(1), 200);
        if ((bPos[0] == 1 || bPos[0] == 20) && bPos[1]<0) setTimeout(() => pause(2), 200);
        return;
    } else {
        setTimeout(() => fly(toWho, rotate), 100);
    }
}

// 得分機制
function pause(who) {
    going = false;
    emp();
    eval(`p${who}score += 1`);
    document.getElementById(`p${who}score`).innerHTML = eval(`p${who}score`);
    if (eval(`p${who}score >= 6`)) stop(who);
    p1Pos = [10.5, -12];
    p2Pos = [10.5, 12];
    bPos = who == 2? [11, 11] : [10, -11];
    ballwho = who;
    started = false;
    rotate = 0;
    update();
    pcgo();
}

// 遊戲結束機制
function stop(who) {
    document.getElementById('score').innerHTML = `<a style="color: red;">恭喜${who == '2' ? mode?'玩家2':'電腦' : '玩家1'} 獲得勝利！</a>`;
    setTimeout(() => document.getElementById('choice-chang').remove(), 1000);
}

// 1P 電腦發球
pcgo();
function pcgo() {
    if(!mode) {
        if (!started && ballwho == '2') {
            setTimeout(() => {
                emp();
                bigger2 = true;
                faBall(ballwho);
                started = true;
                update();
            }, 1000)
            going = true;
            setTimeout(() => {
                emp();
                bigger2 = false;
                update();
            }, 1500)
        }
        foloBall()
    }
}
// 1P 電腦跟隨球
function foloBall() {
    if (going == true && !mode) folo();
}
function folo() {
    if (bPos[0]<p2Pos[0]) {
        if (p2Pos[0]!=2.5) {
            move(2, 0, '--');
        }
    }
    if (bPos[0]>p2Pos[0]) {
        if (p2Pos[0]!=18.5) {
            move(2, 0, '++');
        }
    }
    if (bPos[1]==p2Pos[1]-2) {
        emp();
        bigger2 = true;
        update();
        setTimeout(() => {
            emp();
            bigger2 = false;
            update();
        }, 500)
    }
    setTimeout(() => {
        foloBall()
    }, 100)
}