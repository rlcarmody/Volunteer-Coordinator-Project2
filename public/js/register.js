// register.js provide functions for user registration - Mohsen
$("#regForm").on("click", function(event) {
  event.preventDefault();
  // Start: getting data of form elements
  var newUser = {
    userFirstName: $("#firstName")
      .val()
      .trim(),
    userLastName: $("#lastName")
      .val()
      .trim(),
    userNickName: $("#nickName")
      .val()
      .trim(),
    usrePhone: $("#userPhone")
      .val()
      .trim(),
    userEmail: $("#userEmail")
      .val()
      .trim(),
    userSkills: $("#userSkills")
      .val()
      .trim(),
    userPassword: $("#userPassword")
      .val()
      .trim(),
    verifyPassword: $("#verifyPassword")
      .val()
      .trim()
  };
  // End: getting data of form elements
  // Start: email verification
  const email = newUser.userEmail;
  const pwd = newUser.userPassword;
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  function validatePassword(password) {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
    return regex.test(password);
  }
  // eslint-disable-next-line no-unused-vars
  const isEmailValid = validateEmail(email);
  const isPWDValid = validatePassword(pwd);
  // End: email verification

  // This line is the magic. It"s very similar to the standard ajax function we used.
  // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
  // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
  // depending on if a tables is available or not.

  // checking email verification and password match
  if (
    newUser.userPassword === newUser.verifyPassword &&
    isEmailValid &&
    isPWDValid
  ) {
    $.post("/api/register", newUser, function(result) {
      // If a table is available... tell user they are booked.
      if (result === "Success") {
        // redirect registered user with id to event sign up proccess
        window.location.href = "/events.html";
      }
      // If a table is available... tell user they on the waiting list.
      else {
        alert("Please try again! Something is going wrong.");
      }
    });
  } else {
    if (!isEmailValid) {
      alert("Please enter valid email");
    } else if (!isPWDValid) {
      alert(
        "Weak Password! Try a stronger password including minimum 6 characters, lowercase, an uppercase character, and digits!"
      );
    } else {
      alert("Passwords are not match!");
    }
  }
});
