const backToFirst_btn = document.querySelector(".backToFirst_h3");
const user_window = document.querySelector(".user_window");
user_window.style.visibility = "hidden";
const user_block = document.querySelector(".user-block");
// search selects
const searchInput = document.getElementById("searchInput");
const suggestionsBox = document.getElementById("search_suggestions");
const not_found = document.querySelector(".not_found");
const remove_search = document.querySelector(".remove_search");

$(document).ready(function () {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  $.ajax({
    url: "https://edu-api.havirkesht.ir/report-full/?crop_year_id=13",
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      console.log(response);
      $("#Loading").hide();

      // crop_year_name
      $("#crop_year_name").append(
        `<h2>سال زراعی: ${response.crop_year_name}</h2>`,
      );
      // current_contractor_remaining_balance
      $("#current_contractor_remaining_balance").append(
        `<p>${response.current_contractor_remaining_balance.toLocaleString()} تومان</p>`,
      );
      // farmers_commitment_count
      $("#farmers_commitment_count").append(
        `<p>${response.farmers_commitment_count.toLocaleString()}</p>`,
      );
      // total_delivered_tonnage
      $("#total_delivered_tonnage").append(
        `<p>${response.total_delivered_tonnage.toLocaleString()} تن</p>`,
      );
      // total_farmers_debt
      $("#total_farmers_debt").append(
        `<p>${response.total_farmers_debt.toLocaleString()} تومان</p>`,
      );
      // total_farmers_receivable
      $("#total_farmers_receivable").append(
        `<p>${response.total_farmers_receivable.toLocaleString()} تومان</p>`,
      );
      // farmers_remaining_settlement
      $("#farmers_remaining_settlement").append(
        `<p>${response.farmers_remaining_settlement.toLocaleString()} تومان</p>`,
      );
      // contractor_fee
      $("#contractor_fee").append(
        `<p>${response.contractor_fee.toLocaleString()} تومان</p>`,
      );
      // contractor_seed_profit
      $("#contractor_seed_profit").append(
        `<p>${response.contractor_seed_profit.toLocaleString()} تومان</p>`,
      );
      // contractor_pesticide_profit
      $("#contractor_pesticide_profit").append(
        `<p>${response.contractor_pesticide_profit.toLocaleString()} تومان</p>`,
      );
      // overall_contractor_status
      $("#overall_contractor_status").append(
        `<p>${response.overall_contractor_status.toLocaleString()} تومان</p>`,
      );
    },
  });

  $.ajax({
    url: "https://edu-api.havirkesht.ir/users/1003",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      console.log(response);
      // username
      $("#username").append(
        `<span class="user-name">${response.username}</span>`,
      );
    },
  });
});

// logout
$(document).ready(function () {
  $("#logout_button").click(function () {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    // بررسی اینکه حداقل یک توکن موجود باشد
    if (!access_token && !refresh_token) {
      window.location.href = "index.html";
      return;
    }

    let body = {};
    if (access_token) body.access_token = access_token;
    if (refresh_token) body.refresh_token = refresh_token;

    $.ajax({
      url: "https://edu-api.havirkesht.ir/logout",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(body),
      success: function (response) {
        console.log("Logout successful:", response);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "index.html";
      },
      error: function (xhr, status, error) {
        console.error("Logout Error:", xhr.responseText);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "index.html";
      },
    });
  });
});

// backToFirst
backToFirst_btn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// click on user_block
document.body.addEventListener("click", function (event) {
  if (user_window.style.visibility == "hidden") {
    if (user_block.contains(event.target)) {
      user_window.style.visibility = "visible";
    }
  } else {
    if (
      user_block.contains(event.target) ||
      !user_block.contains(event.target)
    ) {
      user_window.style.visibility = "hidden";
    }
  }
});

// search
const searches = {
  "ثبت سال زراعی": 1,
  "ثبت استان": 2,
  "صورتحساب کشاورزان": 3,
  "گزارش کلی": 4,
  "گزارش کارخانه ها": 5,
  "تغییر رمز عبور": 6,
  "تماس با ما": 7,
  پروفایل: 8,
};

const searchArray = [
  { title: "ثبت سال زراعی", link: "Registration_of_the_crop_year.html" },
  { title: "ثبت استان", link: "Province_registration.html" },
  { title: "صورتحساب کشاورزان", link: "Farmers_invoice.html" },
  { title: "گزارش کلی", link: "Main_page.html" },
  { title: "گزارش کارخانه ها", link: "Factory_reports.html" },
  { title: "تغییر رمز عبور", link: "Change_password.html" },
  { title: "تماس با ما", link: "Contact_us.html" },
  { title: "پروفایل", link: "User_profile.html" },
];

searchInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      const results = searchArray.filter((a) =>
        a.title.toLowerCase().includes(query),
      );

      if (results.length > 0) {
        window.location.href = results[0].link;
        searchInput.value = "";
      } else {
        not_found.style.visibility = "visible";
      }
    }
  }
});

// suggestions
let currentIndex = -1;

searchInput.addEventListener("input", function () {
  if (searchInput.value.trim().length > 0) {
    remove_search.style.visibility = "visible";
  } else {
    remove_search.style.visibility = "hidden";
  }
  const query = searchInput.value.trim();
  suggestionsBox.innerHTML = "";
  currentIndex = -1;
  if (query.length === 0) {
    suggestionsBox.style.display = "none";
    return;
  }

  const matches = Object.keys(searches).filter((part) => part.includes(query));

  if (matches.length > 0) {
    suggestionsBox.style.display = "block";
    matches.forEach((match, index) => {
      const li = document.createElement("li");
      li.textContent = match;
      li.addEventListener("click", function () {
        const clickedTitle = li.textContent;
        const result = searchArray.find((a) => a.title === clickedTitle);
        if (result) {
          window.location.href = result.link;
          searchInput.value = "";
        }
        suggestionsBox.style.display = "none";
      });
      suggestionsBox.appendChild(li);
    });
  } else {
    suggestionsBox.style.display = "none";
  }
});

// مدیریت کلیدهای جهت و اینتر
searchInput.addEventListener("keydown", function (event) {
  const items = suggestionsBox.querySelectorAll("li");

  if (items.length > 0) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      currentIndex = (currentIndex + 1) % items.length;
      setActive(items);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      setActive(items);
    } else if (event.key === "Enter") {
      if (currentIndex >= 0 && currentIndex < items.length) {
        event.preventDefault();
        searchInput.value = items[currentIndex].textContent;
        suggestionsBox.style.display = "none";
      }
    }
  }
});

function setActive(items) {
  items.forEach((item, i) => {
    item.classList.remove("active");
    if (i === currentIndex) {
      item.classList.add("active");
      item.scrollIntoView({ block: "nearest" });
    }
  });
}

// بسته بشه suggestions وقتی بیرون کلیک شد
document.addEventListener("click", function (event) {
  if (
    !searchInput.contains(event.target) &&
    !suggestionsBox.contains(event.target)
  ) {
    suggestionsBox.style.display = "none";
  }
});

// بسته بشه not_found وقتی بیرون کلیک شد
document.addEventListener("click", function (event) {
  if (!not_found.contains(event.target)) {
    not_found.style.visibility = "hidden";
  }
});

// remove from search_bar
remove_search.addEventListener("click", function () {
  searchInput.value = "";
  remove_search.style.visibility = "hidden";
});
