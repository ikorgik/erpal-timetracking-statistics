chrome.browserAction.setBadgeText({text: myFunction()});
chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});


setInterval(function() {
  chrome.browserAction.setBadgeText({text: myFunction()});

  chrome.browserAction.setBadgeBackgroundColor({color:[0, 0, 0, 100]});
}, 1000 * 2);

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