// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//https://www.drupal.org/node/2013781#comment-7507759



(function ($) {
  var url = "http://erpal.brightsolutions.de/services/session/token";
  //var url = "http://erpal.local/services/session/token";
  var tt_url = "http://erpal.local/rest/projects/timetracking/statistics.json";
  //var tt_url = "http://erpal.brightsolutions.de/rest/projects/timetracking/statistics.json";

  $.ajax({
    url:"http://erpal.local/services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
    success: function (token) {
      $.ajax({
        url : tt_url,
        type : 'post',
        dataType : 'json',
        crossDomain: true,
        cache: false,
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
        error : function(data) {
          //error code
          console.log('Error', data);
        },
        success : function(data) {
          var day_limit = '8.00';
          var week_limit = '40.00';
          var month_limit = '160.00';

          console.log(data);
          $('.current-task .label').text(data.current.title);

          var task_time = data.current.amount + '/' + data.current.estimate + ' (' + (data.current.estimate - data.current.amount) + ')';
          $('.current-task .task-time').text(task_time);

          var day = data.day + '/' + day_limit + ' (' + (day_limit - data.day) + ')';
          $('.details .day .time').text(day);

          var week = data.week + '/' + week_limit + ' (' + (week_limit - data.week) + ')';
          $('.details .week .time').text(week);

          var month = data.month + '/' + month_limit + ' (' + (month_limit - data.month) + ')';
          $('.details .month .time').text(month);

          $('.loading').fadeOut(200, function() {
            $(this).removeClass("processed");
          });
        }
      });
    }
  });
})(jQuery);