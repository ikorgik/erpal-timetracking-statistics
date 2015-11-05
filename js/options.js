// Saves options to chrome.storage.sync.
function save_options() {
  var erpalHost = document.getElementById('erpal-host').value;
  var hoursPerDay = document.getElementById('hour-per-day').value;

  chrome.storage.sync.set({
    erpalHost: erpalHost,
    hoursPerDay: hoursPerDay
  }, function() {

    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved!';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores preferences stored in chrome.storage.
function restore_options() {

  chrome.storage.sync.get({
    erpalHost: 'https://erpal.your-site.com',
    hoursPerDay: '8'
  }, function(items) {
    document.getElementById('erpal-host').value = items.erpalHost;
    document.getElementById('hour-per-day').value = items.hoursPerDay;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options, false);
