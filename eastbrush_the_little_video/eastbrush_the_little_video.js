auto.waitFor();
device.keepScreenDim();
var baseScrollTime = 15;
var pageScrollTime = 20;  // 页面最大可滚动次数
var like = null;

// 更新选择选择元素
function initSelect() {
    //titles = id("tv_stick").find();
    like = id("a2s").findOnce();
    pageScrollTime = randomScrollCount();
    console.log("当前停留时间", pageScrollTime);
}

// 进入页面滚动操作
function scrollDownAction() {
    let activityStr = currentActivity();
    let swiperX = Math.floor(device.width/2);
    let swiperY = Math.floor(device.height/2);
    console.log("当前的activity", activityStr,swiperX,swiperY+400,swiperY-300);
    if (activityStr == "com.songheng.eastfirst.business.xiaoshiping.videodetail.view.activity.DouYinVideoActivity") {
      sleep(pageScrollTime*1000);
      collectClick();
      // gesture(600, [swiperX+400,swiperY], [swiperX-300,swiperY]);
      scrollDown();
      sleep(1000);
    }
    initSelect();
    scrollDownAction();
}

// 随机一个最大滚动次数
function randomScrollCount() {
  return Math.ceil(baseScrollTime + Math.random()*10)
}

// 模拟一次点赞操作
function collectClick() {
  try{
    if (Math.random() * 10 >= 8) {
      like.click();
      sleep(600);
      console.log("点赞成功");
    }
  }catch(err) {
    console.log("点赞失败", err);
  }
}

initSelect();
scrollDownAction()