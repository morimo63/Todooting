'use strict';

let rowNumber = 0;
const addButton = document.getElementById('addTaskButton');

//タスク追加した処理
addButton.addEventListener('click', function() {
    const input = document.getElementById('inputTask');
    const text = input.value; // 入力された内容を保持する
    const difficulty = document.getElementById('difficulty'); //難易度を保持する

    if(text != '' && difficulty.value != 'zero'){
        const table = document.getElementById('taskTableBody');
        let newRow = table.insertRow();
        rowNumber++;

        // タスクナンバー
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(rowNumber));
        newRow.appendChild(th);

        // タスク内容
        let newCell = newRow.insertCell(-1);
        let newText = document.createTextNode(text);
        newCell.setAttribute("id","taskField");
        newCell.appendChild(newText);

        // 難易度
        newCell = newRow.insertCell(-1);
        const txt = difficulty.options[difficulty.selectedIndex].text;
        newText = document.createTextNode(txt);
        newCell.setAttribute("id","diffField");
        newCell.appendChild(newText);

        // 削除ボタン
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<input type="button" id="dltButton" value="削除" onclick="onClickDelete(this);" />';

        // localStorage登録処理
        registerTask(rowNumber,text,txt);

        // 初期値に変更
        input.value = '';
        difficulty.selectedIndex = 0;
    }
});

// タスクを削除する処理
function removeRow(obj){
    const tr = obj.parentNode.parentNode;
    const index = tr.sectionRowIndex;
    tr.parentNode.deleteRow(index);

    // ナンバー入れ替え
    const table = document.getElementById('taskTable');
    for (let i=index; i<table.rows.length; i++) {
        if(i==0) continue;
        table.rows[i].cells[0].innerText = i;
    }

    // localStorage削除処理
    removeTask(index);

    rowNumber--;
}

// 削除ボタンを押下した処理
async function onClickDelete(obj){
    document.getElementById("trigger").checked = true;
    await sleep(500);
    Start(obj.parentNode.parentNode.children[2].textContent);
    removeRow(obj);
}

// 待機同期処理
function sleep(msec) {
    return new Promise(function(resolve) {
       setTimeout(function(){resolve()}, msec);
    })
}
