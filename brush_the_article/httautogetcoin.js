auto.waitFor();
device.keepScreenDim();
var maxScrollTime = 18;
var pageScrollTime = maxScrollTime;  // 页面最大可滚动次数
var titles = [];
var nowIndex = 0;
var maxTitle = 0;

// 执行跳转
function navigator() {
    var title = titles[nowIndex];
    nowIndex ++;
    if (title) {
        //click(title.bounds().left,title.bounds().top-200);
        try{
          title.parent().click();
        } catch(err) {
          navigator();
          return;
        }
        sleep(1000);
        scrollDownAction();
    }
    if (nowIndex >= maxTitle) {
        nowIndex = 0;
        console.log("屏幕宽:"+device.width+"屏幕高"+device.height+"可点集长:"+maxTitle+"可滚动次数:"+pageScrollTime+"当前在点哪一项"+nowIndex);
        swipe(device.width/2,device.height-400,device.width/2,300,800);
        //scrollDown();
        //className("android.widget.HorizontalScrollView").findOne().scrollDown();
        sleep(1500);
        initSelect();
        sleep(500);
        navigator();
    }
}


// 更新选择选择元素
function initSelect() {
    //titles = id("tv_stick").find();
    titles = id("iv_shielding").find();
    maxTitle = titles.length;
    pageScrollTime = maxScrollTime;
}

// 进入页面滚动操作
function scrollDownAction() {
    if (pageScrollTime < 0) {
        pageScrollTime = maxScrollTime;
        back();
        sleep(1000);
        navigator()
        return;
    }
    sleep(3500);
    swipe(device.width/2,500,device.width/2,300,500);
    sleep(1000);
    pageScrollTime --;
    console.log("滚动次数",pageScrollTime);
    scrollDownAction();
}

initSelect();
navigator();
