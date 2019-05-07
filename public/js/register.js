// register.js provide functions for user registration (Mohsen)
$("#regForm").on("click", function(event) {
  console.log("1");
  event.preventDefault();

  // Start: getting data of form elements
  var newUser = {
    userName: $("#firstName")
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
  function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  // eslint-disable-next-line no-unused-vars
  const isEmailValid = validateEmail(email);
  alert("email: " + email +" " + isEmailValid);
  // End: email verification

  // This line is the magic. It"s very similar to the standard ajax function we used.
  // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
  // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
  // depending on if a tables is available or not.

  // checking email verification and password match
  if (newUser.userPassword === newUser.verifyPassword && isEmailValid) {
    $.post("/api/userRegistration", newUser, function(userId) {
      // If a table is available... tell user they are booked.
      if (userId) {
        // redirect registered user with id to event sign up proccess
        window.location.href = "/signUpEvent/:id";
      }
      // If a table is available... tell user they on the waiting list.
      else {
        alert("Please try again! Something is wrong with user Registration.");
      }
    });
  } else {
    if (!isEmailValid) {
      alert("Please enter valid email");
    } else {
      alert("Passwords are not match!");
    }
  }
});
