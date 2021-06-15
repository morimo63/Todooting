'use strict';

let taskNumber = 0;

// ページ読み込み時にlocalStorageを読み込むメソッド
function loadTask(){
    if(localStorage.length != 0){
        const table = document.getElementById('taskTableBody');
        for(let i=0;i<localStorage.length;i++){
            let data = localStorage.getItem("task"+i);
            let newRow = table.insertRow();
            // タスクナンバー
            const th = document.createElement('th');
            th.appendChild(document.createTextNode(JSON.parse(data)[0]));
            newRow.appendChild(th);

            // タスク内容
            let newCell = newRow.insertCell(-1);
            let newText = document.createTextNode(JSON.parse(data)[1]);
            newCell.appendChild(newText);

            // 難易度
            newCell = newRow.insertCell(-1);
            newText = document.createTextNode(JSON.parse(data)[2]);
            newCell.appendChild(newText);

            // 削除ボタン
            newCell = newRow.insertCell(-1);
            newCell.innerHTML = '<input type="button" id="dltButton" value="完了" onclick="onClickDelete(this);" />';
        }
        rowNumber = localStorage.length;
        taskNumber = localStorage.length;
    }
}

window.onload = loadTask;

//localStorage用登録メソッド
function registerTask(num,task,diff){
    let data = [num,task,diff];
    let json = JSON.stringify(data, undefined, 1);
    localStorage.setItem("task"+taskNumber, json);
    taskNumber++;
}

//localStorage用削除メソッド
function removeTask(num){
    // 消去する番号以降のtaskを一時的に取得
    let data　= new Array();
    for(let i=num+1;i<localStorage.length;i++){
        data.push(localStorage.getItem("task"+i));
    }

    // 消去する番号以降削除
    let len = localStorage.length;
    for(let i=num;i<len;i++){
        localStorage.removeItem("task"+i);
    }

    // 一時的に取得していたtaskをlocalに入れ直す
    for(let i=num;i<num+data.length;i++){
        let emp = [i+1,JSON.parse(data[i-num])[1],JSON.parse(data[i-num])[2]];
        let json = JSON.stringify(emp, undefined, 1);
        localStorage.setItem("task"+i,json);
    }

    taskNumber--;
}