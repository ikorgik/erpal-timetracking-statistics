(function ($) {
  var host = "https://erpal.brightsolutions.de";
  //var host = "http://erpal.local";
  var url = host + "/services/session/token";
  var tt_url = host + "/rest/projects/timetracking/statistics.json";

  var day_limit = "8.00";
  var week_limit = "40.00";
  var month_limit = "160.00";

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
        type : "post",
        dataType : "json",
        crossDomain: true,
        cache: false,
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
        },
        error : function(data) {
          if (data.status == 403) {
            $(".loading-page").fadeOut(200, function() {

              $(".login-page")
                .addClass("processed")
                .find("a.login")
                .attr("href", host);
            });
          }
          else {
            console.log("Error", data);
          }
        },
        success : function(data) {
          // Fill current task container.
          if (data.current.title != undefined) {
            var $current_task = $(".current-task");
            $(".label", $current_task).text(data.current.title);
            $(".time", $current_task).html(time_output(data.current.amount, data.current.estimate));

            $(".task-active .fa", $current_task).addClass("fa-play");
            if (!data.current.active) {
              $(".task-active .fa", $current_task).removeClass("fa-play").addClass("fa-pause");
            }
          }

          // Fill details container.
          var $details = $(".details");
          $(".day .time", $details).html(time_output(data.day, day_limit));
          $(".week .time", $details).html(time_output(data.week, week_limit));
          $(".month .time", $details).html(time_output(data.month, month_limit));

          // Fill working days container.
          var rest = data.working_days.all - data.working_days.current;
          var rest_time = (month_limit - parseFloat(data.month) + parseFloat(data.day)) / rest;
          var rest_text = rest + " * " + rest_time.toFixed(2);
          $(".working-days .time").html(time_output(data.working_days.current, data.working_days.all, rest_text));

          // Fill chart container.
          var percent = data.day / day_limit * 100;
          rest = day_limit - data.day;
          var $chart = $(".chart");
          $chart.attr("data-percent", percent);
          $(".chart-time", $chart).html(data.day);
          $(".chart-limit", $chart).html(day_limit);
          $(".chart-rest", $chart).html(rest.toFixed(2));
          $chart.easyPieChart({
            barColor: "#97D5B6"
          });

          // Show timetracking container.
          $(".loading-page").fadeOut(200, function() {
            $(this).removeClass("processed");
            $(".current-task, .actions").animate({opacity: 1.0}, 300);
            $details.animate({opacity: 1.0}, 700);
            $(".working-days").delay(150).animate({opacity: 1.0}, 700);
          });

          // Adds behaviour for actions links.
          $("a.tt-link").attr("href", host + "/projects/timetrackings/tmp");
          $("a.close").click(function (event) {
            window.close();
          });
        }
      });
    }
  });

  /**
   * Theming function to output time in "current / limit (rest)" format.
   */
  var time_output = function(current, limit, rest) {
    if (rest == undefined) {
      rest = parseFloat(limit) - parseFloat(current);
      rest = rest.toFixed(2);
    }
    var output = "";
    output += "<span class=''>" + current + "</span>";
    output += " / ";
    output += "<span class=''>" + limit + "</span>";
    output += "<span class='rest'> (" + rest + ")</span>";
    return output;
  }

})(jQuery);
