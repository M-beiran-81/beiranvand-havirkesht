const text_area = document.querySelector(".textarea");
const form = document.getElementById("contact-form");
const select = document.getElementById("myselect");
const errorMessageSelect = document.querySelector(".Contact_us_error1");
const errorMessagePhoneNumber = document.querySelector(".Contact_us_error2");
const errorMessageTextarea = document.querySelector(".Contact_us_error3");
const phoneNumber = document.getElementById("phone_number");

// focus
text_area.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

text_area.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #e6e6e6";
});

phoneNumber.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

phoneNumber.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #e6e6e6";
});

// submit
const inputs = [
  { field: select, error: errorMessageSelect },
  { field: phoneNumber, error: errorMessagePhoneNumber },
  { field: text_area, error: errorMessageTextarea },
];

form.addEventListener("submit", function (event) {
  let hasError = false;

  inputs.forEach(({ field, error }) => {
    if (
      field == phoneNumber &&
      field.value.trim().length < 11 &&
      field.value.trim().length > 0
    ) {
      hasError = true;
      error.style.visibility = "visible";
      error.textContent = "شماره موبایل باید 11 رقم باشد.";
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

// change select color
select.style.color = "#999";

select.addEventListener("change", function () {
  if (select.value === "") {
    select.style.color = "#999";
  } else {
    select.style.color = "#000";
  }
});

// numeral_inputs
phoneNumber.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});
