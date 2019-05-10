/* global $ M */
$(document).ready(() => {
  $("table").on("click", "button", function (event) {
    event.preventDefault();
    console.log($(this));
    $.ajax({
      url: `/api/shift/${$(this).attr("data-id")}`,
      method: "PUT"
    })
      .then(response => {
        M.toast({ html: "You are signed up!" });
      })
      .catch(err => {
        if (err) {
          M.toast({ html: "Please sign in or register" });
        }
      });
  });
});
