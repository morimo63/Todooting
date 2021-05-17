'use strict';


const addButton = document.getElementById('addTaskButton');
let rowNumber = 1;

//タスク追加した処理
addButton.addEventListener('click', function() {
    const input = document.getElementById('inputTask');
    const text = input.value; // 入力された内容を保持する
    const difficulty = document.getElementById('difficulty'); //難易度を保持する

    if(text != '' && difficulty.value != 'zero'){
        input.value = '';

        const table = document.getElementById('taskTable');
        let newRow = table.insertRow();

        // タスクナンバー
        const th = document.createElement('th');
        th.appendChild(document.createTextNode(rowNumber));
        rowNumber++;
        newRow.appendChild(th);

        // タスク内容
        let newCell = newRow.insertCell(-1);
        let newText = document.createTextNode(text);
        newCell.appendChild(newText);

        // 難易度
        newCell = newRow.insertCell(-1);
        const txt = difficulty.options[difficulty.selectedIndex].text;
        // 難易度選択を初期値へ戻す
        difficulty.selectedIndex = 0;
        newText = document.createTextNode(txt);
        newCell.appendChild(newText);

        // 削除ボタン
        newCell = newRow.insertCell(-1);
        newCell.innerHTML = '<input type="button" value="削除" onclick="removeRow(this);" />';
    }
});

// タスクを削除する処理
function removeRow(obj){
    const tr = obj.parentNode.parentNode;
    const index = tr.sectionRowIndex;
    tr.parentNode.deleteRow(index);

    rowNumber--;

    // ナンバー入れ替え
    const table = document.getElementById('taskTable');
    for (let i=index; i<table.rows.length; i++) {
        table.rows[i].cells[0].innerText = i;
    }
}