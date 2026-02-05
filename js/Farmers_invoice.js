$(document).ready(function () {
  const token = localStorage.getItem("access_token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  $.ajax({
    url: "https://edu-api.havirkesht.ir/farmers_invoice/",
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      page: 1,
      size: 10,
      crop_year_id: 13,
      sort_by: "remaining_receivable_payable_balance",
      sort_order: "desc",
    },
    success: function (response) {
      console.log(response);
      $("#Loading").hide();

      const tbody = $("#Farmers_invoice tbody");
      tbody.empty();

      response.items.forEach((item) => {
        tbody.append(`
          <tr>
            <td>${item.farmer_name}</td>
            <td>${item.remaining_receivable_payable_balance.toLocaleString()}</td>
            <td>${item.total_weight}</td>
            <td>${item.pure_payable.toLocaleString()}</td>
            <td>${item.newest_date}</td>
            <td>${item.total_farmers_price.toLocaleString()}</td>
            <td>${item.total_seed_cost.toLocaleString()}</td>
            <td>${item.total_pesticide_cost.toLocaleString()}</td>
          </tr>
        `);
      });
    },
    error: function (xhr) {
      console.error(xhr.responseText);
    },
  });
});
