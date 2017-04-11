$(function(){
    var info="游戏说明：<br/>1、该游戏为一款好玩的闯关挑战类游戏，可以锻炼玩家的判断力，提高玩家的敏捷思维能力。<br/>2、可以选择闯关模式或者挑战模式开始游戏。进入闯关模式后点击上方按钮可选择已解锁的关卡。<br/>3、闯关模式总共有十个关卡，每通过一个关卡，游戏难度会逐渐增大。如果玩家玩通关闯关模式，会获得W币奖励。<br/>4、挑战模式会计算积分，玩家可以在线存档，也可以提交自己的积分来查看自己的排行。<br/>5、本游戏引入了金币机制，即W币，初始金币为3个，玩家可以通过每日签到(+1 W币，连续签到从第二天起+2 W币)和完成每日的挑战任务(随机+7或8或9 W币)或玩通关闯关模式(随机+10或11或12 W币)来获得W币，W币可以用来购买道具。本游戏目前含有四种道具，分别是原地复活道具、水波特效道具、蝴蝶跟随鼠标特效道具和下雪特效道具。原地复活道具只可以在挑战模式使用，其它三种道具均为特效道具，每次购买后有七天使用期限，七天后需再次购买才可继续使用。";

    var imgUrlArr = ["img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/6.jpeg",
        "img/8.jpg",
        "img/9.jpg",
        "img/10.jpg",
        "img/11.jpg",
        "img/12.jpg",
        "img/13.jpg",
        "img/14.jpg",
        "img/15.jpg"
    ];//随机背景图片地址数组
    var randBgImg = parseInt(Math.random()*imgUrlArr.length); //随机任意取数组的背景图片地址
    $("body").attr("background",imgUrlArr[randBgImg]);//随机设置背景属性值，为数组对应的元素;

    $("#game-info").click(function(){ //给游戏说明按钮绑定鼠标点击事件
        var gameDialogDiv = $("<div class='gameDialog'>"+"</div>");//创建游戏说明提示框div
        var infoDiv = $("<div class='info'>"+info+"</div>");//创建游戏说明文本div
        var closeBtn = $("<button class='close'>"+"关闭"+"</button>");//创建游戏说明提示框关闭按钮;
        var shadow = $("<div class='shadow'>"+"111"+"</div>");//创建遮罩层div
        $("body").append(gameDialogDiv);//将游戏提示框添加到body中;
        gameDialogDiv.append(infoDiv);//将提示文本提示插入到提示框中
        gameDialogDiv.append(closeBtn);//将关闭按钮插入到提示框;
        $("body").append(shadow);//将遮罩层插入到body中；
        return false; //阻止a标签默认打开页面行为
    });

    $("body").on("click",".close",function(){ //给提示框按钮添加鼠标点击事件，由于是动态加载所以用on()方法添加
        $(this).parent().remove(); //删除提示框
        $("body .shadow").remove();//删除遮罩层
    });
});
