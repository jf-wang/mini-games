/**
 * Created by eragon on 2016/12/31.
 */
$(function(){
    var boxArr = [];//创建方块数组
    var score = 0; //分数变量
    initialBox();//初始化界面
    $("#start").click(function(){ //绑定点击开始游戏
        RanBoxNumber();
        RanBoxNumber();
    });



//初始化方框函数
    function initialBox(){
        for(var i=0;i<4;i++){
            for(var j=0;j<4;j++){
                var smallBox = $("#small_box_"+i+"_"+j);//获取所有方块即小盒子
                smallBox.css("top",(20+i*120)+"px");//设置小方块的top值,即前一个方块的边距和宽度在加上自身的边距 即以此按顺序排列起来
                smallBox.css("left",(20+j*120)+"px");//设置小方块left值

            }
        }
        for(var i=0;i<4;i++){
            boxArr[i] = [];//创建二维数组，即小方块行列数组；
            for(var j=0; j<4;j++){
                boxArr[i][j]=0; //将小方块的行列数组中每个元素的值设置为0;
            }
        }
        numberBox();//执行随机小方块插入函数
    }

//随机方框的样式函数
    function numberBox(){
        $(".number_box").remove();//先清除已有的随机方块
        for(var i=0;i<4;i++){
            for (var j=0;j<4;j++) {
                var numberbox = $("<div></div>");//创建随机方块div
                $("#box").append(numberbox);//将随机方块插入到box中
                numberbox.attr("class", "number_box");//设置随机方块的class属性
                numberbox.attr("id", "number_box_" + i + "_" + j);//设置随机方块的id属性
                var number_box = $("#number_box_" + i + "_" + j);//获取添加的随机方块
                if (boxArr[i][j] == 0) { //如果而为数组的值是0，即没有数字的方快，按顺序排列，将宽高设置为0，即隐藏起来
                    number_box.css({ //
                        "width": 0,
                        "height":0,
                        "top": (20 + i * 120) + "px",
                        "left": (20 + j * 120) + "px"
                    });
                } else {
                    number_box.css({ //如果小方块里有值，将其设置为100成100方块，调整位置为当前i,j值的数乘以方块宽度+20的外边距
                        "width": 100 + "px",
                        "height": 100 + "px",
                        "top": (20 + i * 120) + "px",
                        "left": (20 + j * 120) + "px",
                        "background": NumberFontColor(boxArr[i][j]),//将背景颜色设置为当前数值对应的颜色
                        "font-size":NumberFontSize(boxArr[i][j])+"px",
                        "color": "#fff"
                    });
                    number_box.text(boxArr[i][j]);//将随机方块里的数字设置为数组对应的数字
                }
            }
        }
    }
    //创建随机数函数
    function RanBoxNumber(){
        if(spaceBox(boxArr))return false;//如果spaceBox(boxArr)函数返回的true即没有空方块结束此函数即返回false
            var X = parseInt(Math.floor(Math.random()*4));//获取随机数0-3,即随机方块的在数组中的横坐标位置
            var Y = parseInt(Math.floor(Math.random()*4));//获取随机数0-3,即随机方块的在数组中的纵坐标位置
            while (true){ //无限执行while循环
                if(boxArr[X][Y]==0) break;//如果找到空的放开就结束跳出循环
                    //反之如果没有找到空的方块就在继续循环获取随机位置横纵坐标值
                    X = parseInt(Math.floor(Math.random()*4));
                    Y = parseInt(Math.floor(Math.random()*4));
            }
            var RnumberText = Math.random()<0.5 ? 2:4;//用三元运算符随机获取2和4 ，几率各占百分之50
            boxArr[X][Y] = RnumberText;//将随机出现的方框里的值设置为随机数2或4
            RanBoxShow(X,Y,RnumberText);//执行随机方块出现的动画
        }

    //创建随机方块背景颜色设置函数
    function NumberFontColor(number) {
        switch (number) {
            case 2:
                return "#eee4da";
                break;
            case 4:
                return "#7eeeeb";
                break;
            case 8:
                return "#f26179";
                break;
            case 16:
                return "#f59563";
                break;
            case 32:
                return "#f67c5f";
                break;
            case 64:
                return "#f65e36";
                break;
            case 128:
                return "#edcf72";
                break;
            case 256:
                return "#edcc61";
                break;
            case 512:
                return "#9c0";
                break;
            case 1024:
                return "#3365a5";
                break;
            case 2048:
                return "#09c";
                break;
            default:
                return "#000";
        }
    }
    //创建字体大小函数
    function NumberFontSize(number) {
        switch (number) {
            case 2:
                return 80;
                break;
            case 4:
                return 80;
                break;
            case 8:
                return 80;
                break;
            case 16:
                return 75;
                break;
            case 32:
                return 75;
                break;
            case 64:
                return 75;
                break;
            case 128:
                return 60;
                break;
            case 256:
                return 60;
                break;
            case 512:
                return 60;
                break;
            case 1024:
                return 45;
                break;
            case 2048:
                return 45;
                break;
        }
    }


    //创建是检查是否有空方块的函数
    function spaceBox(boxArr){
        for(var i=0;i<4;i++){ //遍历方块数组
            for(var j=0;j<4;j++){
                if(boxArr[i][j]==0){ //如果有空方块返回false
                    return false;
                }
            }
        }
        return true;//否则直接返回true;
    }
    //随机方块出现的动画
    function RanBoxShow(X,Y,RnumberText){
        var number_box = $("#number_box_" + X + "_" + Y);//获取添加的随机方块
        number_box.css({ //设置随机方块的样式
            "background":NumberFontColor(boxArr[X][Y]),
            "font-size":NumberFontSize(boxArr[X][Y])+"px",
            "color":"#fff"
        });
        number_box.text(RnumberText);
        number_box.animate({ //随机方块显示动画
            "width":100+"px",
            "height":100+"px",
            // "top": (20 + X * 120) + "px",
            // "left": (20 + Y * 120) + "px"
        },50);
    }


    //向左移动函数
    function Box_MoveLeft() {
        if (!P_box_moveLeft()) return false;//如果判断左侧移动函数返回的是false，就直接停止函数执行,

            for (var i = 0; i < 4; i++) { //循环遍历所有行
                for (var j = 1; j < 4; j++) {//循环遍历2，3，4列，因为第一列不能移动所以j=1，不遍历第一列
                    if(boxArr[i][j]!=0){
                        for(var n=0;n<j;n++){ //即遍历当前方块的左侧方块
                            if(boxArr[i][n]==0&&BoxLR(i,n,j,boxArr)){ //如果当前方块的左侧方块是空的并且没有其他方块
                                boxMergeAn(i,j,i,n);//执行移动的动画
                                boxArr[i][n]=boxArr[i][j];//将当前方块的值赋给左侧的方块
                                boxArr[i][j]=0;//清空当前方块的值；
                                continue;//结束本次循环，继续从新开始循环
                             }else if(boxArr[i][n]==boxArr[i][j]&&BoxLR(i,n,j,boxArr)){ //如果当前方块和左侧方块的值相等并且中间没有其他方块
                                boxMergeAn(i,j,i,n);//执行移动的动画
                                boxArr[i][n]+=boxArr[i][j];//将两个方块的值相加
                                boxArr[i][j]=0;//清空当前方块的值；
                                score+=boxArr[i][n];//记录分数
                                $("#score").text(score);
                                continue;
                            }
                        }
                    }
                }
            }
        setTimeout(numberBox,210);//刷新方块样式
            return true;
        }
    //左侧移动判断
    function P_box_moveLeft(){
        for(var i=0;i<4;i++){ //循环遍历所有行
            for(var j=1;j<4;j++){//循环遍历2，3，4列，因为第一列不能移动所以j=1，不遍历第一列
                if(boxArr[i][j]!=0){//如果当前方块不是空的
                    if(boxArr[i][j-1]==0||boxArr[i][j-1]==boxArr[i][j]){ //在判断左侧的方块是否是空的或者左侧的方块的值等于当天盒子的值
                        return true;//返回true; 即方块是可以向左移动的
                    }

                }
            }
        }
        return false;//返回false；即不能向左移动
    }

    //向右移动函数
    function Box_MoveRight() {
        if (!P_box_moveRight()) return false;//如果判断右侧移动函数返回的是false，就直接停止函数执行,

        for (var i = 0; i < 4; i++) { //循环遍历所有行
            for (var j = 2; j >=0; j--) {//循环遍历1，2，3列，因为最后一列不能移动所以j=2
                if(boxArr[i][j]!=0){
                    for(var n=3;n>j;n--){ //即遍历当前方块的左侧方块
                        if(boxArr[i][n]==0&&BoxLR(i,j,n,boxArr)){ //如果当前方块的右侧方块是空的并且没有其他方块
                            boxMergeAn(i,j,i,n);//执行移动的动画
                            boxArr[i][n]=boxArr[i][j];//将当前方块的值赋给左侧的方块
                            boxArr[i][j]=0;//清空当前方块的值；
                            continue;//结束本次循环，继续从新开始循环
                        }else if(boxArr[i][n]==boxArr[i][j]&&BoxLR(i,j,n,boxArr)){ //如果当前方块和右侧方块的值相等并且中间没有其他方块
                            boxMergeAn(i,j,i,n);//执行移动的动画
                            boxArr[i][n]+=boxArr[i][j];//将两个方块的值相加
                            boxArr[i][j]=0;//清空当前方块的值；
                            score+=boxArr[i][n];//记录分数
                            $("#score").text(score);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(numberBox,210);//刷新方块样式
        return true;
    }
//右侧移动判断
    function P_box_moveRight(){
        for(var i=0;i<4;i++){ //循环遍历所有行
            for(var j=0;j<3;j++){//循环遍历1，2，3列，因为最后一列不能移动所以j=2，不遍历左后一列
                if(boxArr[i][j]!=0){//如果当前方块不是空的
                    if(boxArr[i][j+1]==0||boxArr[i][j+1]==boxArr[i][j]){ //在判断右侧的方块是否是空的或者右侧侧的方块的值等于当前方块的值
                        return true;//返回true; 即方块是可以向右移动的
                    }

                }
            }
        }
        return false;//返回false；即不能向右移动
    }

    //判断两个方块之间左右移动是否有其他方块的函数
    function BoxLR(X,x1,x2,boxArr){
        for(var i=x1+1;i<x2;i++){ //遍历两个放宽之间的方块，即xy1+1,就是左侧的方块到要移动的方块之间的小方块
            if(boxArr[X][i]!=0||boxArr[i][X]!=boxArr[i][X]){//如果中间有方块就返回false
                return false;
            }
        }
        return true;//当前函数返回true
    }


//向上移动函数
    function Box_MoveUp() {
        if (!P_box_moveUp()) return false;//如果判断向上移动函数返回的是false，就直接停止函数执行,
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j<4; j++) {//循环遍历2，3，4行，因为第一行不能移动所以j=1，不遍历第一行
                if(boxArr[j][i]!=0){//如果第二行的方块不是空的
                    for(var n=0;n<j;n++){ //即遍历上一行方块
                        if(boxArr[n][i]==0&&BoxUD(n,j,i,boxArr)){ //如果一行的的方块是空的并且两行之间没有其他方块
                            boxMergeAn(j,i,n,i);//执行移动的动画
                            boxArr[n][i]=boxArr[j][i];//将当前行方块的值赋给上一样
                            boxArr[j][i]=0;//清空当前行方块的值；
                            continue;//结束本次循环，继续从新开始循环
                        }else if(boxArr[n][i]==boxArr[j][i]&&BoxUD(n,j,i,boxArr)){ //如果当前方块和上一行方块的值相等并且中间没有其他方块
                            boxMergeAn(j,i,n,i);//执行移动的动画
                            boxArr[n][i]+=boxArr[j][i];//将两个方块的值相加
                            boxArr[j][i]=0;//清空当前方块的值；
                            score+=boxArr[n][i];//记录分数
                            $("#score").text(score);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(numberBox,210);//刷新方块样式
        return true;
    }

//向上移动判断
    function P_box_moveUp(){
        for(var i=1;i<4;i++){ //循环遍历2，3，4行，因为第一行不能移动所以i=1，不遍历第一行
            for(var j=0;j<4;j++){
                if(boxArr[i][j]!=0){//如果当前方块不是空的
                    if(boxArr[i-1][j]==0||boxArr[i-1][j]==boxArr[i][j]){ //在判断上一行的方块是否是空的或者上一行的方块的值等于当前方块的值
                        return true;//返回true; 即方块是可以向上移动的
                    }

                }
            }
        }
        return false;//返回false；即不能向上移动
    }

    //向下移动函数
    function Box_MoveDown() {
        if (!P_box_moveDown()) return false;//如果判断向下移动函数返回的是false，就直接停止函数执行,

        for (var i = 0; i < 4; i++) { //循环遍历所有行
            for (var j = 2; j>=0; j--) {//循环遍历1，2，3行，因为最后一行不能移动所以j=2，
                if(boxArr[j][i]!=0){//如果第三行的方块不是空的
                    for(var n=3;n>j;n--){ //即遍历下一行方块
                        if(boxArr[n][i]==0&&BoxUD(j,n,i,boxArr)){ //如果下一行的的方块是空的并且两行之间没有其他方块
                            boxMergeAn(j,i,n,i);//执行移动的动画
                            boxArr[n][i]=boxArr[j][i];//将当前行方块的值赋给下一行
                            boxArr[j][i]=0;//清空当前行方块的值；
                            continue;//结束本次循环，继续从新开始循环
                        }else if(boxArr[n][i]==boxArr[j][i]&&BoxUD(j,n,i,boxArr)){ //如果当前方块和下一行的方块的值相等并且中间没有其他方块
                            boxMergeAn(j,i,n,i);//执行移动的动画
                            boxArr[n][i]+=boxArr[j][i];//将两个方块的值相加
                            boxArr[j][i]=0;//清空当前方块的值；
                            score+=boxArr[n][i];//记录分数
                            $("#score").text(score);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout(numberBox,210);//刷新方块样式
        return true;
    }

//向下移动移动判断
    function P_box_moveDown(){
        for(var i=0;i<3;i++){ //循环遍历1，2，3行，因为最后一行不能移动所以i<3，不遍历最后一行
            for(var j=0;j<4;j++){
                if(boxArr[i][j]!=0){//如果当前方块不是空的
                    if(boxArr[i+1][j]==0||boxArr[i+1][j]==boxArr[i][j]){ //在判断下一行的方块是否是空的或者下一行的方块的值等于当前方块的值
                        return true;//返回true; 即方块是可以向下移动的
                    }

                }
            }
        }
        return false;//返回false；即不能下移
    }


//判断两个方块之间上下移动是否有其他方块的函数
    function BoxUD(y1,y2,Y,boxArr){
        for(var i=y1+1;i<y2;i++){ //遍历两行方块之间的方块，i=y1+1,就是遍历要移动的放宽和目标方块行之间又没有方块
            if(boxArr[i][Y]!=0){//如果中间有方块就返回false
                return false;
            }
        }
        return true;//当前函数返回true
    }




//移动方块的动画函数
    function boxMergeAn(n1,n2,n3,n4){
        var number_box = $("#number_box_" + n1 + "_" + n2);//获取当前要移动的方块
        number_box.animate({ //随机方块滑动效果动画
            "top": (20 + n3 * 120) + "px", //移动的位置相当与目标方块的top和left值
            "left": (20 + n4 * 120) + "px"
        },200);
    }
//创建游戏失败结束构建函数
    function GameOverFunc(){
        this.boxNoMove = function(){ //检查四个方向是否还可以移动
            if(P_box_moveLeft()||P_box_moveRight()||P_box_moveUp()||P_box_moveDown()){
                return false;//如果4个方向只要有一个可以动就返回false，
            }
            return true; //即当没有可移动的位置时,就返回true，此时四个方向都不能动
          }

          this.gameover = function(){//没有空位也不能移动
              if(spaceBox(boxArr)&&this.boxNoMove()){ //当没有空方块且四个方向不能移动时返回true，
                  return true;
              }
              return false;//不满足条件继续返回false
          }
          this.GameOverText = function(){
             $("#gmOverShow").fadeIn(200);//将提示框设置为看是
              $("#gmOverShow button").click(function(){
                  $(this).parent().hide();
                  initialBox();//初始化界面
                  RanBoxNumber();
                  RanBoxNumber();
                  score=0;//分数清零
                  $("#score").text(score);

              })
           }
        }
var GameOver = new GameOverFunc();//创建对象实例;

    //控制操作
$(document).keyup(function(e){
    var ev = e||window.event;
    switch(ev.keyCode){

        case 37: //左移
            if(Box_MoveLeft()){//如果移动函数返回是ture就随机添加一个数字即随机小方块
                setTimeout(RanBoxNumber,210);
            }
            if(GameOver.gameover()){ //如果满足失败条件，就执行游戏结束提示函数
                    setTimeout(GameOver.GameOverText,260);
                }
        break;

        case 39://右移
            if(Box_MoveRight()){
                setTimeout(RanBoxNumber,210);
            }
                if(GameOver.gameover()){
                    setTimeout(GameOver.GameOverText,260);
                }
            break;

        case 38://上移
            if(Box_MoveUp()) {
                setTimeout(RanBoxNumber,210);
            }
                if(GameOver.gameover()){
                    setTimeout(GameOver.GameOverText,260);
                }
            break;

        case 40://下移
            if(Box_MoveDown()){
                setTimeout(RanBoxNumber,210);
            }
                if(GameOver.gameover()){
                    setTimeout(GameOver.GameOverText,260);
                }
            break;
     }
  })

});
