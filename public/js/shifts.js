// shifts.js provide functions for user shift signup - Mohsen
// If we have this section in our url, we pull out the post id from the url
$(document).ready(function() {
  var url = window.location.search;
  var id;
  if (url.indexOf("?id=") !== -1) {
    id = url.split("=")[1].trim();
    if (id !== null && id !== "") {
      $.get("/api/shifts/" + id, function(data) {
        if (data) {
          $("#tbodyShifts").html(data);
        }
      });
    } else {
      window.location.href = "/events.html";
    }
  } else {
    window.location.href = "/events.html";
  }
  // Shift sign up
  // eslint-disable-next-line no-unused-vars
});
function signupshift(eventId, shiftId) {
  //let eshId = $(this).data("eshid");
  //let eventId = eshId.split("-")[0];
  //let shiftId = eshId.split("-")[1];
  alert(eventId + " " + shiftId);
}
