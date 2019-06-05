auto.waitFor();
device.keepScreenDim();
var baseScrollTime = 10;
var pageScrollTime = 20;  // 页面最久停留时间
var like = null;

// 更新选择选择元素
function initSelect() {
  //titles = id("tv_stick").find();
  like = id("ll_like").findOnce();
  pageScrollTime = randomPlayTime();
  console.log("当前停留时间", pageScrollTime);
}

// 进入页面滚动操作
function scrollDownAction() {
  let activityStr = currentActivity();
  let swiperX = Math.floor(device.width/2);
  let swiperY = device.height;
  let ad = id("tv_ad_src").findOnce();
  console.log("当前的activity", activityStr);
  if (activityStr == "com.cashtoutiao.alivideodetail.AliSmallVideoActivity") {
    if (!ad) {
      sleep(pageScrollTime*1000);
      collectClick();
    }
    swipe(swiperX,swiperY-500,swiperX,100,500);
    sleep(1000);
  }
  initSelect();
  scrollDownAction();
}

// 随机一个最大停留时间
function randomPlayTime() {
  return Math.ceil(baseScrollTime + Math.random()*10)
}

// 模拟一次点赞操作
function collectClick() {
  try{
    if (Math.random() * 10 >= 7) {
      like.click();
      sleep(300);
      console.log("点赞成功");
    }
  }catch(err) {
    console.log("点赞失败", err);
  }
}

initSelect();
scrollDownAction()