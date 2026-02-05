$(document).ready(function () {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  $.ajax({
    url: "https://edu-api.havirkesht.ir/users/1003",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      console.log(response);
      $("#Loading").hide();

      $("#userProfile").append(`<td>${response.id}</td>`);
      $("#userProfile").append(`<td>${response.username}</td>`);
      $("#userProfile").append(`<td>${response.phone_number}</td>`);
      $("#userProfile").append(`<td>${response.email}</td>`);
    },
  });
});
