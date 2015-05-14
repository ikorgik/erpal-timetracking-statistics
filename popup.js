// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//https://www.drupal.org/node/2013781#comment-7507759

(function ($) {
  var host = "https://erpal.brightsolutions.de";
  //var host = "http://erpal.local";
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
      console.log('token', token);
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
            $('.current-task .task-active .fa').addClass('fa-play');
            if (!data.current.active) {
              $('.current-task .task-active .fa').removeClass('fa-play').addClass('fa-pause');
            }
          }

          $('.details .day .time').html(time_output(data.day, day_limit));
          $('.details .week .time').html(time_output(data.week, week_limit));
          $('.details .month .time').html(time_output(data.month, month_limit));

          var rest = data.working_days.all - data.working_days.current;
          var rest_time = (month_limit - parseFloat(data.month) + parseFloat(data.day)) / rest;
          var rest_text = rest + ' * ' + rest_time.toFixed(2);
          $('.working-days .time').html(time_output(data.working_days.current, data.working_days.all, rest_text));

          $('.loading').fadeOut(200, function() {
            $(this).removeClass("processed");
            $('.current-task, .actions').animate({opacity: 1.0}, 300);
            $('.details').animate({opacity: 1.0}, 700);
            $('.working-days').delay(150).animate({opacity: 1.0}, 700);
          });

          $('a.close').click(function (event) {
            window.close();
          });
          $('a.tt-link').attr('href', host + "/projects/timetrackings/tmp");
        }
      });
    }
  });
  var time_output = function(current, limit, rest) {
    if (rest == undefined) {
      rest = parseFloat(limit) - parseFloat(current);
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