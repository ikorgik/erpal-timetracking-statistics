// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
//https://www.drupal.org/node/2013781#comment-7507759



(function ($) {

  var name = 'admin';
  var pass =  'test';
  var url = "http://erpal.local/rest/projects/user/login.json";
  var tt_url = "http://erpal.local/rest/projects/timetracking/statistics.json";

  $.ajax({
    url:"http://erpal.local/services/session/token",
    type:"get",
    dataType:"text",
    error:function (jqXHR, textStatus, errorThrown) {
      console.log(errorThrown);
    },
    success: function (token) {
      console.log(token);
      // Call system connect with session token.
      $.ajax({
        url : tt_url,
        type : 'post',
        dataType : 'json',
        crossDomain: true,
        cache: false,
        beforeSend: function (request) {
          request.setRequestHeader("X-CSRF-Token", token);
          //request.setRequestHeader("Cookie", cookie);
        },
        error : function(data) {
          //error code
          console.log('Error',data);
        },
        success : function(data) {
          //success code
          console.log(data);
        }
      });
    }
  });
//
//  $.ajax({
//    url: url,
//    type: "POST",
//    data: 'username=' + encodeURIComponent(name) + '&password=' + encodeURIComponent(pass),
//    dataType : 'json',
//    crossDomain: true,
//    cache: false,
//    error : function(data) {
//
//      //error code
//      console.log(data);
//    },
//    success : function(data) {
//      console.log(data);
////      //success code
////      var sessid = data.sessid;
////      var session_name = data.session_name;
////
////      //var user = data.user;
////      //console.log('session_name',session_name);
////      //console.log('sessid',sessid);
////
////      $.cookie(session_name, sessid);
////      var cookie = data.session_name + "=" + data.sessid;
//
//      $.ajax({
//        url : tt_url,
//        type : 'post',
//        dataType : 'json',
//        crossDomain: true,
//        cache: false,
//        beforeSend: function (request) {
//          //request.setRequestHeader("X-CSRF-Token", data.token);
//          //request.setRequestHeader("Cookie", cookie);
//        },
//        error : function(data) {
//          //error code
//          console.log('Error',data);
//        },
//        success : function(data) {
//          //success code
//          console.log('Cookie Accepted',data);
//        }
//      });
//
//    }
//  });
})(jQuery);