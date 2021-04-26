'use strict';

new Vue({
    el: `#app`,
    data: {
        selected: '',
        options: [
            { difficult: 1},
            { difficult: 2},
            { difficult: 3},
            { difficult: 4},
            { difficult: 5}
        ],
        //タスク配列
        todos: [
            // {num:1 ,name:'task1',diff:1},
            // {num:2 ,name:'task2',diff:2},
            // {num:3 ,name:'task3',diff:3},
            // {num:4 ,name:'task4',diff:4},
            // {num:5 ,name:'task5',diff:5}
        ],
        //一時避難用
        onepoints:[
        ],
        count: 0,
        currentNum: 0,
        textInput: ""
    },


    methods: {
        doAdd: function(){
            // 未入力なら追加しない
            if (!this.textInput.length){
                // 以下は難易度が選択されていない場合追加しないが未実装なのでコメントアウト
                // || this.selected === "") {
                return
            }
            //カウントする
            this.currentNum = this.count++
            this.todos.push({
                num:this.count, name:this.textInput, diff:this.selected
            })
            this.onepoints.push({
                num:this.count, name:this.textInput, diff:this.selected
            })
            //フィールドのリセット
            this.textInput = ""
            this.selected = ""
        },
        doRemove: function(item){
            //消去したいタスクの番号を取り出す
            var index = this.todos.indexOf(item)

            //最後に追加したタスクを消す場合そのままcountを減らす
            if(index === this.currentNum){
                this.todos.splice(index, 1)
                this.onepoints.splice(index, 1)
                this.count--
                this.currentNum--
            }
            //途中のタスクを消す場合countを減らし、登録した番号を変更する(ずらす)
            else{
                //各配列の長さを取得
                var len = this.todos.length
                var onelen = this.onepoints.length
                //ボタンを押して消去したもの以降を消去
                for (let i = index+1; i <= len; i++) {
                    //todosの選んだ以下を消去する
                    this.todos.splice(index,1)
                    // onepointsの消去したいやつだけ消すif文
                    if( i === index+1)
                        this.onepoints.splice(i-1,1)
                }

                //配列に追加する
                for (let i = 1; i <= onelen-index-1; i++) {
                    this.todos.push({num:index+i ,name:this.onepoints[index+i-1].name,diff:this.onepoints[index+i-1].diff})
                }

                //onepoints更新
                //全削除
                this.onepoints.splice(0, this.onepoints.length)
                //配列に追加する
                for (let i = 0; i < len-1; i++) {
                    this.onepoints.push({num:i+1 ,name:this.todos[i].name,diff:this.todos[i].diff})
                }

                //削除したのでカウントを調整する
                this.count--
                this.currentNum--
            }
        }
    }
})