function ad_init()
{
	cb_init();
	admob_init();
}

function ad_show(location)
{
	console.log("ad_show:"+location);
	if (!cb_show(location)) {
			admob_show();
		};
}

function ad_showMoreApp()
{
	cb_showMoreApp();
}

function ad_showRewardVedio(e)
{
	console.log('show reward vedio!');
	cb_showRewardVedio(e);
}