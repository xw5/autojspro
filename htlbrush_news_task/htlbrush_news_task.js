auto.waitFor();
device.keepScreenDim();
var title = null;

// 执行跳转
function navigator() {
  if(currentActivity() != "com.cashtoutiao.recommend.ui.BaiduPolymerActivity") {
    return;
  }
  title = text("+50金币").findOne();
  if (title) {
    //click(title.bounds().left,title.bounds().top-200);
    try{
      title.parent().click();
    } catch(err) {
      console.log("点击去完成任务失败", err);
      navigator();
      return;
    }
    sleep(61000);
    back();
    sleep(1000);
    text("立即领取").findOne().click();
    sleep(1500);
    text("忽略").findOne().click();
    sleep(1000);
    navigator();
    return;
  }
}

navigator();
