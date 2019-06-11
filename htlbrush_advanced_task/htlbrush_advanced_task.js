auto.waitFor();
device.keepScreenDim();
var titles = [
  {text:"看小说赚金币",time:60},
  {text:"玩赚阅读赚金币",time:60},
  {text:"玩赚阅读送金币",time:60},
  {text:"玩赚新闻领金币",time:60},
  {text:"阅读新闻赚金币",time:60},
  {text:"最热新闻立即看，海量金币马上领",time:60},
  {text:"看新闻送金币",time:60},
  {text:"看新闻赚金币",time:60},
  {text:"看新闻拿金币",time:70},
  {text:"阅读文章赚金币",time:70},
  {text:"阅读文章领金币",time:70}
];
var nowIndex = 0;

// 执行跳转
function navigator() {
  if(currentActivity() != "com.cashtoutiao.account.ui.main.MainTabActivity") {
    return;
  }
  let delay = Number(titles[nowIndex].time)*1000+8000;
  let title = text(titles[nowIndex].text).findOnce();
  nowIndex++;
  if (title) {
    try{
      title.parent().click();
      sleep(1000);
      text("去赚钱").findOnce().click();
      sleep(1000);
    } catch(err) {
      console.log("点击去完成任务失败", err);
      navigator();
      return;
    }
    sleep(delay);
    id("toolbar_title_layout").findOnce().click();
    sleep(1000);
    try{
      text("立即领取").findOnce().click();
      sleep(1500);
      text("忽略").findOnce().click();
      sleep(1000);
    }catch(err){
      console.log("领取奖励失败!");
    };
    navigator();
    return;
  }
}

navigator();
