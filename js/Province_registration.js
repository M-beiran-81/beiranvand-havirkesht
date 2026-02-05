// part1
const province = document.getElementById("province");
const Province_registration = document.getElementById("Province_registration");
const title = document.querySelector(".Province_registration");
// part2
const Generate_new_province_main_box = document.querySelector(
  ".Generate_new_province_main_box",
);
const new_province = document.querySelector(".new_province");
const exitButton = document.querySelector(".Generate_new_province_exit_button");
// part3
const Generate_new_province_error = document.querySelector(
  ".Generate_new_province_error",
);
// part4
const Generate_new_province_form = document.getElementById(
  "Generate_new_province_form",
);

// focus
province.addEventListener("focus", function (event) {
  event.target.style.border = "2px solid #013766";
});

province.addEventListener("blur", function (event) {
  event.target.style.border = "2px solid #ababab";
});

// submit
const Generate_new_province_inputs = [
  { field: province, error: Generate_new_province_error },
];

Generate_new_province_form.addEventListener("submit", function (event) {
  let hasError = false;

  Generate_new_province_inputs.forEach(({ field, error }) => {
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

// click for show form
new_province.addEventListener("click", function () {
  showForm();
});

// function for show form
function showForm() {
  Generate_new_province_main_box.style.visibility = "visible";
  Province_registration.style.opacity = "0.5";
  new_province.style.opacity = "0.5";
  title.style.opacity = "0.5";
}

// click on exit button
exitButton.addEventListener("click", function () {
  hideForm();
});

// function for hide form
function hideForm() {
  Generate_new_province_main_box.style.visibility = "hidden";
  Province_registration.style.opacity = "1";
  new_province.style.opacity = "1";
  title.style.opacity = "1";
  Generate_new_province_error.style.visibility = "hidden";
  province.style.border = "2px solid #ababab";
  province.value = "";
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
      url: "https://edu-api.havirkesht.ir/province/",
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function (response) {
        $("#Loading").hide();
        $("#Province_registration tr:not(:first)").remove();

        response.items.forEach((item) => {
          $("#Province_registration").append(`
            <tr>
              <td>${item.province}</td>
              <td>${item.created_at}</td>
              <td><button class="delete_province_btn">حذف</button></td>
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
  $("#Province_registration").on("click", ".delete_province_btn", function () {
    const row = $(this).closest("tr");
    const provinceName = row.find("td:first").text().trim();
    const token = localStorage.getItem("access_token");

    if (!provinceName) {
      alert("نام استان پیدا نشد.");
      return;
    }

    if (
      !confirm(
        `آیا مطمئن هستید که می‌خواهید استان "${provinceName}" را حذف کنید؟`,
      )
    ) {
      return;
    }

    $.ajax({
      url: `https://edu-api.havirkesht.ir/province/${encodeURIComponent(
        provinceName,
      )}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
      success: function () {
        alert(`استان "${provinceName}" با موفقیت حذف شد ✅`);
        row.remove();
      },
      error: function (xhr) {
        console.error(xhr.responseText);
        alert("حذف استان با مشکل مواجه شد.");
      },
    });
  });
});

// send ------------------------------------------------------------
$(document).ready(function () {
  $("#Generate_new_province_form").submit(function (e) {
    e.preventDefault();

    const token = localStorage.getItem("access_token");
    if (!token) {
      window.location.href = "index.html";
      return;
    }

    const province = $("#province").val().trim();
    if (!province) return;

    $.ajax({
      url: "https://edu-api.havirkesht.ir/province/",
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ province }),

      success: function () {
        alert("عملیات ثبت با موفقیت انجام شد ✅");
        hideForm();

        // دوباره لیست استان‌ها رو می‌گیریم
        $.ajax({
          url: "https://edu-api.havirkesht.ir/province/",
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
          success: function (getResponse) {
            const lastProvince =
              getResponse.items[getResponse.items.length - 1];

            $("#Province_registration").append(`
              <tr>
                <td>${lastProvince.province}</td>
                <td>${lastProvince.created_at}</td>
                <td>
                  <button class="delete_province_btn">حذف</button>
                </td>
              </tr>
            `);
          },
        });
      },
    });
  });
});
