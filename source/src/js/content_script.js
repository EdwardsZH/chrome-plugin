// Content scripts是在Web页面内运行的javascript脚本。
// 通过使用标准的DOM，它们可以获取浏览器所访问页面的详细信息，并可以修改这些信息,能够在浏览器已经加载的页面内部运行的javascript脚本。可以将content script看作是网页的一部分

var dataList = []; 

function getJDData(itemlist) {
  for (let item of itemlist) {
    var data = {}; 
    var arr  = []
    var imgs = item.children[1].children[2].children  // 评论图片	

    data.evaluateContent = item.children[1].children[1].innerText  // 评论内容	
    data.userName  = item.children[0].children[0].innerText               // 评论内容
    data.userImage = item.children[0].children[0].children[0].currentSrc  // 用户头像	可选	String	
    for (let i of imgs) {
      arr.push(i.children[0].currentSrc)
      data.evaluateImage = arr;
    }
   
    dataList.push(data)
  }
  console.log(dataList)
  // 给background.js发送msg
  chrome.runtime.sendMessage(dataList);
  dataList = [];
}

if(window.location.href.includes('https://item.jd.com')) {
  var li;
  li = $("#detail .tab-main ul li:nth-child(5)") 
  if (!li.length) li = $(".detail .tab-main ul li").find("s").parent();
  
  li.click(function() {
    setTimeout( function() {
      var itemlist = $("#comment-0 .comment-item")
      getJDData(itemlist);

      // var nextA = $("#comment-0 .com-table-footer .ui-page-wrap  .ui-page .ui-pager-next");
      // nextA.click(function(){
      //   setTimeout( function(){
      //     var itemlist = $("#comment-0 .comment-item")
      //     getJDData(itemlist);
      //     console.log('被点击')
      //   }, 1500);
      // });
    }, 1500);
  });
}

if(window.location.href.includes('http://192.168.1.194:88')) {
  var port = chrome.extension.connect({name: "copy"});
  port.postMessage({question: "jd copy"});

  port.onMessage.addListener(function(msg) {
    if (msg.answer == "jd is ok") {
      console.log(msg)
      localStorage.setItem('jdData', msg.resJD);
      
    } else if (msg.answer == "Madame who?") {
      // do something
      // port.postMessage({question: "Madame who?"});

    }
  });
}

