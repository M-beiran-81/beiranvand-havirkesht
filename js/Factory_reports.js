// Part1
$(document).ready(function () {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  $.ajax({
    url: "https://edu-api.havirkesht.ir/report-factory/?crop_year_id=13",
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    success: function (response) {
      console.log(response);
      $("#Loading").hide();

      // total_money_received_all_factories
      $("#total_money_received_all_factories").append(
        `<p>${response.total_money_received_all_factories.toLocaleString()}</p>`,
      );
      // total_farmers_debt_all
      $("#total_farmers_debt_all").append(
        `<p>${response.total_farmers_debt_all.toLocaleString()}</p>`,
      );
      // total_farmers_payment_cash_all
      $("#total_farmers_payment_cash_all").append(
        `<p>${response.total_farmers_payment_cash_all.toLocaleString()}</p>`,
      );
      // remained_now_contractor_all
      $("#remained_now_contractor_all").append(
        `<p>${response.remained_now_contractor_all.toLocaleString()}</p>`,
      );
      // total_factory_delivered_tonnage
      $("#total_factory_delivered_tonnage").append(
        `<p>${response.total_factory_delivered_tonnage.toLocaleString()}</p>`,
      );
      // total_factory_commitment_tonnage
      $("#total_factory_commitment_tonnage").append(
        `<p>${response.total_factory_commitment_tonnage.toLocaleString()}</p>`,
      );
      // total_remaining_commitment_tonnage
      $("#total_remaining_commitment_tonnage").append(
        `<p>${response.total_remaining_commitment_tonnage.toLocaleString()}</p>`,
      );
    },
  });
});

// Part2
$(document).ready(function () {
  const token = localStorage.getItem("access_token");

  if (!token) {
    window.location.href = "index.html";
    return;
  }

  $.ajax({
    url: "https://edu-api.havirkesht.ir/report-factory/?crop_year_id=13",
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    success: function (response) {
      console.log(response);

      $("#Factory_reports tbody").empty();

      response.reports.forEach((item) => {
        $("#Factory_reports tbody").append(`
          <tr>
            <td>${item.factory_name}</td>
            <td>${item.total_money_received_factory.toLocaleString()}</td>
            <td>${item.factory_delivered_tonnage.toLocaleString()}</td>
            <td>${item.factory_commitment_tonnage.toLocaleString()}</td>
            <td>${item.remaining_commitment_tonnage.toLocaleString()}</td>
          </tr>
        `);
      });
    },
    error: function (xhr) {
      console.error(xhr.responseText);
      alert("خطا در دریافت گزارش کارخانه‌ها");
    },
  });
});
