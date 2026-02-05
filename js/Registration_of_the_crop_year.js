// part1
const crop_year_name = document.getElementById("crop_year_name");
const Registration_of_the_crop_year = document.getElementById(
  "Registration_of_the_crop_year",
);
const title = document.querySelector(".Registration_of_the_crop_year");
// part2
const Generate_new_crop_year_main_box = document.querySelector(
  ".Generate_new_crop_year_main_box",
);
const new_crop_year = document.querySelector(".new_crop_year");
const exitButton = document.querySelector(
  ".Generate_new_crop_year_exit_button",
);
// part3
const Generate_new_crop_year_error = document.querySelector(
  ".Generate_new_crop_year_error",
);
// part4
const Generate_new_crop_year_form = document.getElementById(
  "Generate_new_crop_year_form",
);

// focus
crop_year_name.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

crop_year_name.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

// submit
const Generate_new_crop_year_inputs = [
  { field: crop_year_name, error: Generate_new_crop_year_error },
];

Generate_new_crop_year_form.addEventListener("submit", function (event) {
  let hasError = false;

  Generate_new_crop_year_inputs.forEach(({ field, error }) => {
    if (field.value.trim() === "") {
      hasError = true;
      error.style.visibility = "visible";
      field.style.border = "2px solid red";
    } else {
      error.style.visibility = "hidden";
      field.style.border = "2px solid #ababab";
    }
  });

  if (hasError) {
    event.preventDefault();
  }
});

// numeral_inputs
crop_year_name.addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

// click for show form
new_crop_year.addEventListener("click", function () {
  showForm();
});

// function for show form
function showForm() {
  Generate_new_crop_year_main_box.style.visibility = "visible";
  Registration_of_the_crop_year.style.opacity = "0.5";
  new_crop_year.style.opacity = "0.5";
  title.style.opacity = "0.5";
}

// click on exit button
exitButton.addEventListener("click", function () {
  hideForm();
});

// function for hide form
function hideForm() {
  Generate_new_crop_year_main_box.style.visibility = "hidden";
  Registration_of_the_crop_year.style.opacity = "1";
  new_crop_year.style.opacity = "1";
  title.style.opacity = "1";
  Generate_new_crop_year_error.style.visibility = "hidden";
  crop_year_name.style.border = "2px solid #ababab";
  crop_year_name.value = "";
}

// receive ------------------------------------------------------------
$(document).ready(function () {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  function loadProvinces() {
    $.ajax({
      url: "https://edu-api.havirkesht.ir/crop-year/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (response) {
        $("#Loading").hide();
        $("#Registration_of_the_crop_year tr:not(:first)").remove();

        response.items.forEach((item) => {
          $("#Registration_of_the_crop_year").append(`
            <tr>
              <td>${item.crop_year_name}</td>
              <td>${item.created_at}</td>
              <td><button class="delete_crop_year_btn">حذف</button></td>
            </tr>
          `);
        });
      },
      error: function (xhr) {
        console.error(xhr.responseText);
      },
    });
  }

  loadProvinces();

  // حذف استان
  $("#Registration_of_the_crop_year").on(
    "click",
    ".delete_crop_year_btn",
    function () {
      const row = $(this).closest("tr");
      const crop_year_Name = row.find("td:first").text().trim();
      const token = localStorage.getItem("access_token");

      if (!crop_year_Name) {
        alert("سال زراعی پیدا نشد.");
        return;
      }

      if (
        !confirm(
          `آیا مطمئن هستید که می‌خواهید سال زراعی "${crop_year_Name}" را حذف کنید؟`,
        )
      ) {
        return;
      }

      $.ajax({
        url: `https://edu-api.havirkesht.ir/crop-year/${encodeURIComponent(
          crop_year_Name,
        )}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function () {
          alert(`سال زراعی "${crop_year_Name}" با موفقیت حذف شد ✅`);
          row.remove();
        },
        error: function (xhr) {
          console.error(xhr.responseText);
          alert("حذف سال زراعی با مشکل مواجه شد.");
        },
      });
    },
  );
});

// send ------------------------------------------------------------
$(document).ready(function () {
  $("#Generate_new_crop_year_form").submit(function (e) {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "index.html";
      return;
    }

    const crop_year_name = $("#crop_year_name").val().trim();
    if (!crop_year_name) return;

    $.ajax({
      url: "https://edu-api.havirkesht.ir/crop-year/",
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ crop_year_name }),

      success: function () {
        alert("عملیات ثبت با موفقیت انجام شد ✅");
        hideForm();

        $.ajax({
          url: "https://edu-api.havirkesht.ir/crop-year/",
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
          success: function (getResponse) {
            const lastProvince =
              getResponse.items[getResponse.items.length - 1];

            $("#Registration_of_the_crop_year").append(`
              <tr>
                <td>${lastProvince.crop_year_name}</td>
                <td>${lastProvince.created_at}</td>
                <td>
                  <button class="delete_crop_year_btn">حذف</button>
                </td>
              </tr>
            `);
          },
        });
      },
    });
  });
});
