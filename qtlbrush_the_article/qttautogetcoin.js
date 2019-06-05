auto.waitFor();
device.keepScreenDim();
var baseScrollTime = 10;
var pageScrollTime = 18;  // 页面最大可滚动次数
var titles = [];
var nowIndex = 0;
var maxTitle = 0;

// 执行跳转
function navigator() {
  if(currentActivity() != "com.jifen.qkbase.main.MainActivity") {
    return;
  }
    var title = titles[nowIndex];
    nowIndex ++;
    if (title) {
        //click(title.bounds().left,title.bounds().top-200);
        try{
          //collectTimeAward();
          title.parent().click();
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
    titles = id("a8b").find();
    maxTitle = titles.length;
    pageScrollTime = randomScrollCount();
}

// 进入页面滚动操作
function scrollDownAction() {
    let activityStr = currentActivity();
    if(activityStr != "com.jifen.qukan.content.newsdetail.news.NewsDetailNewActivity" && 
    activityStr != "com.jifen.qukan.content.newsdetail.video.VideoNewsDetailNewActivity" &&
    activityStr != "com.jifen.qukan.content.imagenews.ImageNewsDetailNewActivity") {
      return;
    }
    if (pageScrollTime < 0) {
        pageScrollTime = randomScrollCount();
        back();
        sleep(1000);
        navigator()
        return;
    }
    sleep(3500);
    if (activityStr == "com.jifen.qukan.content.newsdetail.news.NewsDetailNewActivity") {
      swipe(device.width/2,500,device.width/2,300,500);
      sleep(1000);
    }
    if (activityStr == "com.jifen.qukan.content.imagenews.ImageNewsDetailNewActivity") {
      swipe(device.width/2+200,device.height/2,device.width/2 - 200,device.height/2,500);
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

// 收集时段奖励
function collectTimeAward() {
  try{
    var awardBtn = id("x4").findOnce();
    if (awardBtn) {
      awardBtn.parent().click();
      sleep(600);
      text("忽略").findOnce().parent().click();
      sleep(400);
      console.log("领取了一次时段奖励");
    }
  }catch(err) {
    console.log("领取时段奖励失败", err);
  }
}

initSelect();
navigator();
