// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//https://www.drupal.org/node/2013781#comment-7507759



(function ($) {
  //var host = "http://erpal.brightsolutions.de";
  var host = "http://erpal.local";
  var url = host + "/services/session/token";
  var tt_url = host + "/rest/projects/timetracking/statistics.json";

  var day_limit = '8.00';
  var week_limit = '40.00';
  var month_limit = '160.00';

  $.ajax({
    url: url,
    type: "get",
    dataType: "text",
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
          console.log(data);
          if (data.current.title != undefined) {
            $('.current-task .label').text(data.current.title);
            $('.current-task .time').html(time_output(data.current.amount, data.current.estimate));
          }

          $('.details .day .time').html(time_output(data.day, day_limit));
          $('.details .week .time').html(time_output(data.week, week_limit));
          $('.details .month .time').html(time_output(data.month, month_limit));

          var rest = data.work_days.all - data.work_days.current;
          var rest_time = (month_limit - data.month) / rest;
          var rest_text = rest + ' * ' + rest_time.toFixed(2);
          $('.work-days .time').html(time_output(data.work_days.current, data.work_days.all, rest_text));

          $('.loading').fadeOut(200, function() {
            $(this).removeClass("processed");
          });
        }
      });
    }
  });
  var time_output = function(current, limit, rest) {
    if (rest == undefined) {
      rest = limit - current;
      rest = rest.toFixed(2);
    }
    var output = '';
    output += '<span class="">' + current + '</span>';
    output += ' / ';
    output += '<span class="">' + limit + '</span>';
    output += '<span class="rest"> (' + rest + ')</span>';
    return output;
  }
})(jQuery);