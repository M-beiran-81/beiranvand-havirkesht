$(document).ajaxError(function (event, jqxhr) {
  if (jqxhr.status === 401 || jqxhr.status === 403) {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    alert("از سیستم خارج شدید. لطفاً دوباره وارد شوید.");

    window.location.href = "index.html";
  }
});
