// part1
const user_name = document.getElementById("username");
const password = document.getElementById("password");
// part2
const result = document.querySelector(".result");
const forgetPasswordButton = document.querySelector(".forgetPassword");
const exitButton = document.querySelector(".exit_button");
// part3
const user_name_error = document.querySelector(".Log_in_user_name_error");
const password_error = document.querySelector(".Log_in_password_error");
// part4
const log_in_form = document.getElementById("log_in_form");
// part5
const togglePass = document.getElementById("toggle-pass");
const backslash = document.querySelector(".Log_in_backslash");

// focus
user_name.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

user_name.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

password.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

password.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

// submit
const Login_inputs = [
  { field: user_name, error: user_name_error },
  { field: password, error: password_error },
];

log_in_form.addEventListener("submit", function (event) {
  let hasError = false;

  Login_inputs.forEach(({ field, error }) => {
    if (
      field == password &&
      field.value.trim().length < 11 &&
      field.value.trim().length > 0
    ) {
      hasError = true;
      error.style.visibility = "visible";
      error.textContent = " رمز عبور باید 11 رقم باشد.";
      field.style.border = "2px solid red";
    } else {
      if (field.value.trim() === "") {
        hasError = true;
        error.style.visibility = "visible";
        field.style.border = "2px solid red";
      } else {
        error.style.visibility = "hidden";
        field.style.border = "2px solid #ababab";
      }
    }
  });

  if (hasError) {
    event.preventDefault();
  }
});

// numeral_inputs
password.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

// Show password_Hide password
togglePass.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    togglePass.textContent = "👁";
    backslash.style.visibility = "visible";
  } else {
    password.type = "password";
    togglePass.textContent = "👁";
    backslash.style.visibility = "hidden";
  }
});

backslash.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
    togglePass.textContent = "👁";
    backslash.style.visibility = "visible";
  } else {
    password.type = "password";
    togglePass.textContent = "👁";
    backslash.style.visibility = "hidden";
  }
});

// click on forget_password button
forgetPasswordButton.addEventListener("click", function () {
  showResult();
});

// click on exit button
exitButton.addEventListener("click", function () {
  hideResult();
});

// function for show result
function showResult() {
  result.classList.remove("hide");
  result.classList.add("show");
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// function for hide result
function hideResult() {
  result.classList.remove("show");
  result.classList.add("hide");
}

$(document).ready(function () {
  $("#log_in_form").submit(function (e) {
    e.preventDefault();

    const username = $("#username").val();
    const password = $("#password").val();

    if (!username || !password) return;

    // ساخت فرم دیتا
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    $.ajax({
      url: "https://edu-api.havirkesht.ir/token",
      method: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("refresh_token", response.refresh_token);

        window.location.href = "Main_page.html";
      },
      error: function (xhr, status, error) {
        console.error("Error:", xhr.responseText);
        window.location.href = "Login_error.html";
      },
    });
  });
});
