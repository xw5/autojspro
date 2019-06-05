auto.waitFor();
device.keepScreenDim();
var baseScrollTime = 10;
var pageScrollTime = 18;  // 页面最大可滚动次数
var titles = [];
var nowIndex = 0;
var maxTitle = 0;
var actionClick = false; //是否模拟了人工操作

// 执行跳转
function navigator() {
  if(currentActivity() != "com.sohu.quicknews.homeModel.activity.HomeActivity") {
    return;
  }
    var title = titles[nowIndex];
    nowIndex ++;
    if (title) {
        //click(title.bounds().left,title.bounds().top-200);
        try{
          title.parent().parent().click();
        } catch(err) {
          console.log("点击去文章失败", err);
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
    titles = id("article_time").find();
    maxTitle = titles.length;
    pageScrollTime = randomScrollCount();
}

// 进入页面滚动操作
function scrollDownAction() {
    let activityStr = currentActivity();
    if(activityStr != "com.sohu.quicknews.articleModel.activity.DetailActivity" && 
    activityStr != "com.sohu.quicknews.articleModel.activity.VideoDetailActivity") {
      return;
    }
    if (pageScrollTime < 0) {
        actionClick = false;
        pageScrollTime = randomScrollCount();
        back();
        sleep(1000);
        navigator()
        return;
    }
    simulateAction();
    sleep(3500);
    if (activityStr == "com.sohu.quicknews.articleModel.activity.DetailActivity") {
      swipe(device.width/2,500,device.width/2,300,500);
      sleep(1000);
    }
    pageScrollTime --;
    console.log("滚动次数",pageScrollTime);
    scrollDownAction();
}

// 随机一个最大滚动次数
function randomScrollCount() {
  return Math.ceil(baseScrollTime + Math.random()*10)
}

// 模拟态度表态操作
function simulateAction() {
  try{
    let actionBtn = id("emotion_count_top").find();
    let btnLen = actionBtn.length;
    if (actionBtn && !actionClick) {
      actionClick = true;
      let nowBtn = actionBtn[Math.floor(Math.random()*btnLen)];
      nowBtn.parent().click();
      console.log("模拟了一次人工操作", btnLen);
    }
  }catch(err) {
    console.log("模拟人工操作失败", err);
  }
}

initSelect();
navigator();
