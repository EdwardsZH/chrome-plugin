// 后台常驻js
chrome.runtime.onMessage.addListener(function(request, sender, sendRequest){
  if(!request.length)	return;
  // console.log(request, sender, sendRequest)
  var data = {}
  data.request = request;
  data.sender = sender.tab;
  localStorage.setItem('jdData', JSON.stringify(data));
});



// 把消息内容发给content_script.js
chrome.extension.onConnect.addListener(function(port) {

  port.onMessage.addListener(function(msg) {
    if (msg.question == "jd copy") {
      var data = localStorage.getItem('jdData');
      port.postMessage({answer: "jd is ok", resJD: data});
      localStorage.remove('jdData')
    } else if (msg.answer == "Madame") {
      port.postMessage({question: "Madame who?"});

    } else if (msg.answer == "Madame... Bovary") {
      port.postMessage({question: "I don't get it."});

    }
  });
});