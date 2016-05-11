var cbid ={};
//alert(navigator.userAgent);
if (/(android)/i.test(navigator.userAgent)) {
//  alert('android');
//  Google play
  // cbid={
  //   appid:"572d7ffa04b0165b745a6796",
  //   appSignature:"6064b3f3e24fde4f15719470015957ace607edea"
  // };
  // Amazon
   cbid={
    appid:"5732027043150f3f89ca2a35",
    appSignature:"aec8031b5b0734d9d540a5107f414e59e4e471ed"
  };
}
else if(/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {
//  alert('iOS');
  cbid={
    appid:"573201f643150f0757d39b59",
    appSignature:"e9470dc11926714fac1de29f113903482f956c81"
  };
}

var loadedLocations = new Array();

var rewardVedioCached = false;
var vedioCallBack ;

function cb_init()
{
  window.chartboost.setUp(cbid.appid,cbid.appSignature);
  window.chartboost.onInterstitialAdPreloaded = cb_OnIntersitialPreload;
  window.chartboost.onInterstitialAdShown = cb_OnIntersitialShown;
  window.chartboost.onRewardedVideoAdPreloaded = cb_OnRewardedVedioPreloaded;
  cb_preloadIntersitial('Default');
  window.chartboost.preloadRewardedVideoAd('Default');
 // cb_preloadIntersitial('Menu');
  //cb_preloadIntersitial('Pause');
  window.chartboost.preloadMoreAppsAd('Default');
  window.chartboost.onRewardedVideoAdCompleted = cb_OnRewardVideoAdCompleted;
  window.chartboost.onRewardedVideoAdHidden
  //window.chartboost.onInterstitialAdPreloaded = function(location){alert(location)};
  //alert('init chartboost');
}

function cb_OnRewardedVedioPreloaded(location)
{
  console.log("rewardVedioCached");
  rewardVedioCached = true;
}

function cb_preloadIntersitial(location)
{
  loadedLocations[location] = 0;
  window.chartboost.preloadInterstitialAd(location);
}

function cb_OnRewardVideoAdCompleted(location)
{
  console.log('Reward video completed :' + location);
  if (vedioCallBack && typeof vedioCallBack == "function") 
    {
      vedioCallBack(!0);
    };
}

function cb_OnrewardVideoAdHidden(location)
{
  console.log('Reward video hidden :' + location);
  if (vedioCallBack && typeof vedioCallBack == "function") 
    {
      vedioCallBack(0);
    };
}

function cb_OnIntersitialShown(location)
{
  console.log("intersitial shown " + location);
  cb_preloadIntersitial(location);
}
//
function cb_OnIntersitialPreload(location)
{
  loadedLocations[location] = 1;
  console.log("intersitial preload " + location);
}

//显示广告
function cb_show(location)
{
  if(loadedLocations[location])
  {
    window.chartboost.showInterstitialAd(location);
    return !0;
  }
  return 0;
}

//
function cb_showMoreApp()
{
  window.chartboost.showMoreAppsAd('Default');
}

//显示奖励广告
function cb_showRewardVedio(e)
{
  if(!rewardVedioCached)
  {
    if(e && typeof e == "function")
    {
      e(0);
    }
  }
  else
  {
    vedioCallBack = e;
    window.chartboost.showRewardedVideoAd('Default');
  }
}