auto.waitFor();
device.keepScreenDim();
var titles = [];
var nowIndex = 0;
var maxTitle = 0;
var baseScrollTime = 60;
var maxSleepTime = 60;

// 执行跳转
function navigator() {
  let activityStr = currentActivity();
  console.log("当前activity", activityStr, "cn.etouch.ecalendar.MainActivity");
  if(activityStr != "cn.etouch.ecalendar.MainActivity") {
    return;
  }
  var title = titles[nowIndex] && titles[nowIndex].parent();
  nowIndex ++;
  if (title && title.clickable && title.enabled) {
      //click(title.bounds().left,title.bounds().top-200);
      try{
        title.click();
        sleep(1200);
        //clickRedHeart(60)
      } catch(err) {
        console.log("点击看视频失败", err);
        navigator();
        return;
      }
      sleep(maxSleepTime * 1000);
      back();
      sleep(1000);
      navigator();
  }
  if (nowIndex >= maxTitle) {
      nowIndex = 0;
      console.log("屏幕宽:"+device.width+"屏幕高"+device.height+"可点集长:"+maxTitle+"暂停时长:"+maxSleepTime+"当前在点哪一项"+nowIndex);
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
    titles = id("tv_duration").find();
    maxTitle = titles.length;
    maxSleepTime = randomSleepTime();
    console.log("视频个数",maxTitle);
}

// 执行点赞操作
function clickRedHeart(count) {
  let heart = id("tv_count_down").findOne();
  let countTotal = randomSleepTime(count);
  let countNow = 0;
  let timer = null;
  let random = Math.random();
  console.log("random:",random);
  if (random < 0.1 || !heart) {
    return;
  }
  console.log("heart.bounds:",heart.bounds().centerX(), heart.bounds().centerY());
  timer = setInterval(function() {
    countNow ++;
    //heart.click();
    click(heart.bounds().centerX(), heart.bounds().centerY());
    if (countNow >= countTotal) {
      clearInterval(timer);
    }
  }, 800);
}

// 随机一个最大停止时间
function randomSleepTime(baseTime) {
  if (!baseTime) {
    baseTime=baseScrollTime
  }
  return Math.ceil(baseTime + Math.random()*30)
}

initSelect();
navigator();
