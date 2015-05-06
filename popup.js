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
          //success code
          console.log(data);
          $('.current-task .label').text(data.current_tt.title);

          var task_time = data.current_tt.amount + '/' + data.current_tt.estimate + ' (' + (data.current_tt.estimate - data.current_tt.amount) + ')';
          $('.current-task .task-time').text(task_time);
        }
      });
    }
  });
})(jQuery);