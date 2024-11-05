const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");

const username_error = document.getElementById("username_error");

form.addEventListener("submit", (e) => {
  if (username.value === "" || username.value == null) {
    e.preventDefault();
    name_error.innerHTML = "Username is required";
  } else {
    username_error.innerHTML = "";
  }

  if (passsword.value.length <= 5) {
    e.preventDefault();
    pass_error.innerHTML = "Password must be more than 6 characters";
  } else {
    pass_error.innerHTML = "";
  }

  if (passsword.value.length > 20) {
    e.preventDefault();
    pass_error.innerHTML = "Password cannot be more than 20 characters";
  }

  if (passsword.value === "password") {
    e.preventDefault();
    pass_error.innerHTML = "Password cannot be password";
  }
});
