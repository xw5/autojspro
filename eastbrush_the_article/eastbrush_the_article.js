auto.waitFor();
device.keepScreenDim();
var baseScrollTime = 20;
var pageScrollTime = 20;  // 页面最大可滚动次数
var titles = [];
var nowIndex = 0;
var maxTitle = 0;

// 执行跳转
function navigator() {
  console.log(currentActivity(),"com.songheng.eastfirst.common.view.activity.MainActivity")
  if(currentActivity() != "com.songheng.eastfirst.common.view.activity.MainActivity") {
    return;
  }
  var title = titles[nowIndex];
  nowIndex ++;
  if (title) {
      //click(title.bounds().left,title.bounds().top-200);
      try{
        //collectTimeAward();
        closetTjfn();
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
      swipe(device.width/2,device.height+400,device.width/2,300,800);
      //scrollDown();
      //className("android.widget.HorizontalScrollView").findOne().scrollDown();
      sleep(1500);
      initSelect();
      sleep(500);
      navigator();
  }
}

// 去掉推荐弹窗
function closetTjfn() {
  let closeTj = text("忽  略").findOnce();
  console.log(closeTj);
  if (closeTj) {
    closeTj.click();
    sleep(800);
  }
}


// 更新选择选择元素
function initSelect() {
    //titles = id("tv_stick").find();
    let titlesTemp0 = id("a_5").find();
    let titlesTemp1 = id("go").find();
    titles = [];
    for (let i =0;i<titlesTemp0.length;i++) {
      titles.push(titlesTemp0[i]);
    }
    for (let i =0;i<titlesTemp1.length;i++) {
      titles.push(titlesTemp1[i]);
    }
    maxTitle = titles.length;
    console.log(maxTitle);
    pageScrollTime = randomScrollCount();
}

// 进入页面滚动操作
function scrollDownAction() {
    let activityStr = currentActivity();
    if(activityStr != "com.songheng.eastfirst.business.newsdetail.view.activity.NewsDetailH5Activity") {
      return;
    }
    if (pageScrollTime < 0) {
        pageScrollTime = randomScrollCount();
        back();
        sleep(1000);
        navigator()
        return;
    }
    sleep(800);
    gesture(500,[device.width/2,device.height/2+400],[device.width/2,device.height/2-300]);
    sleep(800);
    clickMore();
    pageScrollTime --;
    console.log("滚动次数",pageScrollTime);
    scrollDownAction();
}

// 随机一个最大滚动次数
function randomScrollCount() {
  return Math.ceil(baseScrollTime + Math.random()*10)
}

// 点击查看更多
function clickMore() {
  try{
    var more = textStartsWith("点击查看全文").findOnce();
    if (more) {
      more.parent().click();
      sleep(600);
      console.log("点击了一次点击查看全文");
    }
  } catch(err) {
    console.log("点击查看全文失败", err);
  }
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
