chrome.browserAction.setBadgeText({text: myFunction()});
chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});


setInterval(function() {
  //var aa = Math.floor((Math.random() * 200) + 1);
  chrome.browserAction.setBadgeText({text: myFunction()});
  chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});
}, 1000 * 10);

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function myFunction() {
  var d = new Date();
  var h = addZero(d.getHours());
  var m = addZero(d.getMinutes());
  return h + ":" + m;
}