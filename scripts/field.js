let field = document.getElementById('choice-chang');
let floors = '';

// 場地按鈕初始化
let num = 0;
for (let i=0; i<29; i++) {
    floors += `<tr><td><button id="floor${num}" class="line" oncontextmenu="return false;">0</button></td>`
    num++;
    for (let n=0; n<20; n++) {
        floors += `<td><button id="floor${num}" class="${i==0||i==14||i==28?'line':' normal'}" oncontextmenu="return false;">0</button></td>`
        num++;
    }
    floors += `<td><button id="floor${num}" class="line" oncontextmenu="return false;">0</button></td></tr>`
    num++;
}
field.innerHTML = floors;