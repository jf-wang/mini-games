$(function(){
    var promptKu = new determinedClass();//创建对象
    promptKu.randomlyWell(2);//创建随机墙初始两道墙
    promptKu.replacPlay();//下一关按钮执行函数调用
    promptKu.rondBg();//随机背景

    //控制棍子的按钮
    var stickOff = true; //棍子衔接的开关量
    var setUp=1;//记录关卡的变量
    var wellIn=0;//记录墙的变量
    $(".btnClick").mousedown(function(){ //给.btnClick绑定鼠标按下事件
        var StMaxW = $(".container").offset().top;//获取包裹墙的外层div到浏览器可视窗口最顶端的距离，即棍子伸展的最大长度;
        if(stickOff){ //stickOff的值是true
            $(".stick").animate({"width":StMaxW+"px"},1000); //将StMaxW设置为棍子的最大的宽度
        }
    }).mouseup(function(){ //给.btnClick绑定鼠标抬起事件
          $(".stick").stop();//停止棍子正在执行的拉伸宽度的动画；
        if(stickOff){
            $(".stick").addClass("stickDown");//给棍子添加class属性；
            setTimeout(ManMove,300);//棍子铺平后执行小人移动函数
        }
        stickOff = false; //将开关量设为false;
    });
    //小人移动函数
    function ManMove(){
        var ManWidth = $(".man").width();//获取小人的宽度；
        var StickWidth = $(".stick").width();//获取棍子的宽度
        var StickLeft = parseInt($(".stick").css("left"));//获取棍子距窗口左边的距离
        var ManDis = (StickLeft+StickWidth)-ManWidth/2;//小人移动的距离是棍子距离左侧的窗口的距离加上棍子本身的长度再减去小人一半的宽度；
        $(".man img").attr("src","img/stick.gif");//将小人的图片换成跑动
        $(".man").animate({"left":ManDis+"px"},1000);
        setTimeout(stickManMove,1010);

    }
     //棍子和小人移动函数
    function stickManMove(){
        $(".man img").attr("src","img/stick_stand.png");//执行完移动后将小人的图片还原成精致状态
        var ManWidth = $(".man").width();//获取小人的宽度；
        var StickWidth = $(".stick").width();//再获取棍子的宽度
        var wellWidth = $(".well:eq("+wellIn+")").width();//获取当前墙的宽度
        var wellLeft = parseInt($(".well:eq("+wellIn+")").css("left"));//获取当前墙距离窗口左边的距离
        var wellNextWidth = $(".well:eq("+wellIn+")").next().width();//获取下一个墙的宽度
        var wellNextLeft = parseInt($(".well:eq("+wellIn+")").next().css("left"));//获取下一个墙距离窗口左边的距离
        var stickWell = wellNextLeft-(wellWidth+wellLeft);//获取两墙之间的距离
        var WellNexWL = wellNextWidth+wellNextLeft;//获取下一道墙最右边到窗口左边的距离
        if(StickWidth>=stickWell&&StickWidth<=stickWell+wellNextWidth){ //如果棍子的长度大于等于两墙之间的距离并且小于两墙距离加上下一个墙的宽度
            //然后将棍子的位置调整为下一个墙到窗口左边的距离,将棍子的宽度设置为0,移除棍子的class属性stickDown；
            $(".stick").css("left",WellNexWL+"px").width(0).removeClass("stickDown");
            //小人移动后停止的位置是下一个墙的最右边到窗口左边的距离减去小人的宽度
            $(".man").css("left",(WellNexWL-ManWidth)+"px");
            //创建自定义动画移动包裹墙的div每次移动的距离是下一个墙左边到窗口的距离
            $(".container").animate({"left":"-"+wellNextLeft+"px"},1000,function(){
                wellIn++;//记录墙的变量执行加一操作，即记录成功跑过的墙数
                if(wellIn==$(".well").length-1){
                    promptKu.promptK();//执行对象的promptK属性，即创建成功提示框；
                }else{
                    stickOff = true;//否则将控制棍子的按钮开关量设置为true;
                }
            });
        }else{
            $(".man img").addClass("rotate");
            promptKu.promptK();//执行对象的promptK属性，即创建失败提示框
        }
    }
    //创建随机墙提示框对象
    function determinedClass(){
        var determined = [
            '勇敢坚毅真正之才智乃刚毅之志向。 —— 拿破仑',
            '志向不过是记忆的奴隶，生气勃勃地降生，但却很难成长。 —— 莎士比亚',
            '骏马是跑出来的，强兵是打出来的。',
            '只有登上山顶，才能看到那边的风光。',
            '如果惧怕前面跌宕的山岩，生命就永远只能是死水一潭。',
            '平时没有跑发卫千米，占时就难以进行一百米的冲刺。',
            '梯子的梯阶从来不是用来搁脚的，它只是让人们的脚放上一段时间，以便让别一只脚能够再往上登。',
            '没有激流就称不上勇进，没有山峰则谈不上攀登。',
            '真正的才智是刚毅的志向。 —— 拿破仑',
            '山路曲折盘旋，但毕竟朝着顶峰延伸。',
            '只有创造，才是真正的享受，只有拚搏，才是充实的生活。',
            '敢于向黑暗宣战的人，心里必须充满光明。',
            '种子牢记着雨滴献身的叮嘱，增强了冒尖的勇气。',
            '自然界没有风风雨雨，大地就不会春华秋实。',
            '只会幻想而不行动的人，永远也体会不到收获果实时的喜悦。',
            '勤奋是你生命的密码，能译出你一部壮丽的史诗。',
            '对于攀登者来说，失掉往昔的足迹并不可惜，迷失了继续前时的方向却很危险。',
            '奋斗者在汗水汇集的江河里，将事业之舟驶到了理想的彼岸。',
            '忙于采集的蜜蜂，无暇在人前高谈阔论。',
            '勇士搏出惊涛骇流而不沉沦，懦夫在风平浪静也会溺水。'

        ]; //创建成功提示框插入的文本数组
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
        //随机背景
        this.rondBg=function() {
            var randBgImg = parseInt(Math.random() * imgUrlArr.length); //随机任意取数组的背景图片地址
            $("body").attr("background", imgUrlArr[randBgImg]);//随机设置背景属性值，为数组对应的元素;
        };
        //提示框函数
        this.promptK = function(){
           var randText = determined[parseInt(Math.random()*determined.length)];//创建随机提示框内容
            var dialog = $("<div class='dialog'>"+"</div>");//创建提示框
            var cGsb = $("<p>"+"</p>");//创建成功失败标题的p元素
            var Pel1 = $("<p>"+randText+"</p>");//创建包办说明文本的p元素；
            var Pel2 = $("<p class='dialog-btn'>"+"</p>");//创建包含按钮的p元素；
            var ABtn = $("<a href='#'>"+"</a>");//创建按钮;
            $("body").append(dialog);//将提示框插入到body中
            dialog.append(cGsb);//插入成功失败标题
            dialog.append(Pel1);//将说明文本的p元素；插入到提示框中
            dialog.append(Pel2);//将包含按钮的p元素插入到提示框中
            if($(".man img").attr("class")=="rotate"){ //如果小人的class属性为rotate即失败
                Pel2.append(ABtn);//将重新开始按钮插入到包含按钮的p元素；
                ABtn.html("重新完一次本关");
                cGsb.html("闯关失败");
            }else{
                Pel2.append(ABtn);//将下一关按钮插入到第包含按钮的p元素；
                ABtn.html("下一关");
                cGsb.html("成功过关");
            }
        };
        //初始化数据
        this.initialData = function() {
            wellIn=0;//墙数记录变量归零
            stickOff = true;//棍子开关量设置为true;
            var oneWell = $(".well:eq(0)").width();//获取道墙的宽度
            var ManWidth = $(".man").width();//获取小人的宽度；
            $(".man").css("left",(oneWell-ManWidth)+"px");//小人的距离调整到第一到墙右边的位置，即第一套墙的宽度减去小人的宽度
            $(".stick").css("left",oneWell+"px");//棍子调整到第一道墙的右边

        };
        this.randomlyWell = function(wellS){ //随机墙
             $(".well-box").empty();//清空包裹墙的div里的数据,即清除当前关的墙
             var wellLeft = 0; //声明一个墙左边距的变量；
             var wellWidth = 100;//固定墙的宽度为100；
            for(var i=0;i<wellS;i++){ //循环创建随机墙，以关卡的数量为基准创建
                var well = $("<div class='well'>"+"</div>");//创建墙
                $(".well-box").append(well);//插入随机墙
                var max = $(".container").offset().top;//声明一个最大值为包裹墙的div到窗口顶部的高度
                var min = $(".man").width();//最小值是人的宽度
                var suiLeft_jjl = parseInt(Math.random()*(max-min+1)+min);//随机公式获取到随机的墙左侧边距
                well.css({"width":wellWidth+"px","left":wellLeft+"px"});//设置随机墙的宽度和左距离
                wellLeft+=wellWidth+suiLeft_jjl;//将随机墙的宽度累加，即次添加的墙距离左边是前面墙的宽度加上前面墙到左边的距离在加上自身到左边的距离
            }
        };
        this.replacPlay = function(){ //提示框单击事件函数
            $("body").on("click",".dialog-btn a",function(){
                $(this).parents(".dialog").remove();//删除提示框
                $(".container").css("left",0);//将包裹墙的div位置调整为0即距离窗口出事位置
                if($(".man img").attr("class")=="rotate") { //如果小人的class属性为rotate即失败
                    promptKu.initialData();//执行数据初始化
                    $(".stick").width(0).removeClass("stickDown");//移除棍子的样式
                    $(".man img").removeClass("rotate");//将小人的掉落样式移除
                }else{ //如果成功
                    setUp++;//记录关卡的变量执行加一操作
                    promptKu.randomlyWell(setUp+1);//以关卡数值为基准创建随机墙，初始两道墙，累计增加墙数
                    promptKu.initialData();//执行数据初始化
                    promptKu.rondBg();//执行随机背景
                }
                $(".set-text .play-title").html("关卡"+setUp);//将关卡显示的值设置为关卡记录变量，即显示第几关;

            })
        };
    }

})
