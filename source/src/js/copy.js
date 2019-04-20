// 控制popup.html的内容;

document.addEventListener('DOMContentLoaded', function () {
    var jdData = chrome.extension.getBackgroundPage().localStorage.getItem('jdData');
    var jdObj = JSON.parse(jdData);
    console.log('jdObj: ', jdObj);

	if (!jdData) {
		$("#jd-data").text('获取京东数据失败 !').css({"color": "red"});
		$("#platform").text('暂无数据.').css({"color": "red"});
		$("#productname").text('暂无数据.').css({"color": "red"});
	} else {
        $("#jd-data").text('获取京东数据成功 !').css({"color": "green"});
        $("#platform").text('京东').css({"color": "green"});
		$("#productname").text(jdObj.sender.title).css({"color": "green"});        
    }
   
});