define([
  'app/constants/userConstants',
  'app/dispatcher/AppDispatcher',
  'app/utils/userUtils'
], function(UserConstants, Dispatcher, UserUtils) {

  'use strict';

  return {
    // GET api/v1/users/current
    get: function() {
      $.get("/auth/is_signed_in.json", function(res) {
        // Success
        Dispatcher.handleServerAction({
          type: UserConstants.GET_CURRENT_USER_SUCCESS,
          response: res
        });

      }).fail(function(jqXHR, textStatus, errorThrown) {

        // Failure
        Dispatcher.handleServerAction({
          type: UserConstants.GET_CURRENT_USER_FAIL,
          msg: textStatus + " " + errorThrown
        });
      });
    },

    signIn: function(data) {
      $.ajax({
        method: "POST",
        url: "/users/sign_in.json",
        data: {
          user: data,
          authenticity_token: UserUtils.getMetaContent("csrf-token")
        }
      }).done(function(data){
        location.reload();
      });
    },

    signOut: function() {
      $.ajax({
        method: "DELETE",
        url: "/users/sign_out.json",
        data: {
          authenticity_token: UserUtils.getMetaContent("csrf-token")
        }
      }).done(function(){
        location.reload();
      });
    },

    signUp: function(data) {
      $.ajax({
        method: "POST",
        url: "/users.json",
        data: {
          user: data,
          authenticity_token: UserUtils.getMetaContent("csrf-token")
        }
      })
      .done(function(data){
        location.reload();
      });
    }

  };
});