// event.js provide functions for user event signup - Mohsen
$(document).ready(function() {
  $.ajax({
    url: "/api/events",
    type: "POST",
    cache: false,
    success: function(data) {
      $("#tbodyEvents").html(data);
    },
    error: function(jqXHR, textStatus, err) {
      alert("text status: " + textStatus + ", err: " + err);
    }
  });
});
