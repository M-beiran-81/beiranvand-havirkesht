// part1
const form = document.getElementById("Change_password_form");
const old_password = document.getElementById("old_password");
const password = document.getElementById("new_password");
const passwordRepeat = document.getElementById("new_password_repeat");
const submit = document.getElementById("set");
// part2
const togglePass = document.getElementById("toggle-pass3");
const backslash = document.querySelector(".set_new_password_backslash");
// part4: errors
const old_password_error = document.querySelector(".old_password_error");
const passwordError = document.querySelector(".password_error");
const passwordRepeatError = document.querySelector(".password_repeat_error");

// focus
old_password.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

old_password.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

password.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

password.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

passwordRepeat.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

passwordRepeat.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

// submit
const inputs = [
  { field: old_password, error: old_password_error },
  { field: password, error: passwordError },
  { field: passwordRepeat, error: passwordRepeatError },
];

submit.addEventListener("click", function () {
  let hasError = false;

  inputs.forEach(({ field, error }) => {
    if (field.value.trim() === "") {
      hasError = true;
      error.style.visibility = "visible";
      field.style.border = "2px solid red";
    } else {
      error.style.visibility = "hidden";
      field.style.border = "2px solid #ababab";
    }
  });

  if (password.value !== passwordRepeat.value) {
    hasError = true;
    passwordRepeatError.textContent =
      " رمز عبور جدید و تکرار آن مطابقت ندارند!";
    passwordRepeatError.style.visibility = "visible";
    passwordRepeat.style.border = "2px solid red";
  }

  if (password.value.trim() === "") {
    hasError = true;
    passwordError.textContent = "وارد کردن رمز جدید الزامی است.";
    passwordError.style.visibility = "visible";
    password.style.border = "2px solid red";
  } else {
    if (passwordRepeat.value.trim() === "") {
      hasError = true;
      passwordRepeatError.textContent = "تکرار رمز جدید الزامی است.";
      passwordRepeatError.style.visibility = "visible";
      passwordRepeat.style.border = "2px solid red";
    } else if (password.value !== passwordRepeat.value) {
      hasError = true;
      passwordRepeatError.textContent =
        "رمز عبور جدید و تکرار آن مطابقت ندارند!";
      passwordRepeatError.style.visibility = "visible";
      passwordRepeat.style.border = "2px solid red";
    } else {
      passwordRepeatError.style.visibility = "hidden";
      passwordRepeat.style.border = "2px solid #ababab";
    }
  }

  if (hasError) {
    event.preventDefault();
  }
});

// Show password_Hide password
togglePass.addEventListener("click", function () {
  if (password.type === "password" || passwordRepeat.type === "password") {
    old_password.type = "text";
    password.type = "text";
    passwordRepeat.type = "text";
    togglePass.textContent = "👁";
    backslash.style.visibility = "visible";
  } else {
    old_password.type = "password";
    password.type = "password";
    passwordRepeat.type = "password";
    togglePass.textContent = "👁";
    backslash.style.visibility = "hidden";
  }
});

backslash.addEventListener("click", function () {
  if (password.type === "password" || passwordRepeat.type === "password") {
    old_password.type = "text";
    password.type = "text";
    passwordRepeat.type = "text";
    togglePass.textContent = "👁";
    backslash.style.visibility = "visible";
  } else {
    old_password.type = "password";
    password.type = "password";
    passwordRepeat.type = "password";
    togglePass.textContent = "👁";
    backslash.style.visibility = "hidden";
  }
});

$(document).ready(function () {
  $("#set").click(function () {
    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "index.html";
      return;
    }

    const oldPassword = $("#old_password").val().trim();
    const newPassword = $("#new_password").val().trim();
    const newPasswordRepeat = $("#new_password_repeat").val().trim();

    if (!oldPassword || !newPassword || !newPasswordRepeat) return;

    $.ajax({
      url: "https://edu-api.havirkesht.ir/changepassword/",
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        old_password: oldPassword,
        new_password: newPassword,
        new_password_repeat: newPasswordRepeat,
      }),
      success: function (response) {
        alert("رمز عبور با موفقیت تغییر کرد!");
        console.log(response);
      },
      error: function (xhr) {
        console.error(xhr.responseText);
        alert("خطا در تغییر رمز عبور");
      },
    });
  });
});
