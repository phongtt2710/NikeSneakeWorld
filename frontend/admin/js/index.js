$(function () {
  $(".date").datepicker({
    format: "dd/mm/yyyy",
  });
});
$(document).ready(function () {
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/total-all",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));
      $("#total-amount").text(
        Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data)
      );
    },
    error: function () {
      console.log("Error retrieving data.");
    },
  });
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/total-bill-all",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));
      $("#total-bill").text(data + " đơn");
    },
    error: function () {
      console.log("Error retrieving data.");
    },
  });
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/total-month",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));
      $("#total-amount-month").text(
        Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data)
      );
    },
    error: function () {
      console.log("Error retrieving data.");
    },
  });
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/total-bill-month",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));
      $("#total-bill-month").text(data + " đơn");
    },
    error: function () {
      console.log("Error retrieving data.");
    },
  });
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/total-date",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));
      $("#total-amount-date").text(
        Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(data)
      );
    },
    error: function () {
      console.log("Error retrieving data.");
    },
  });
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/total-bill-date",
    type: "GET",
    dataType: "json",
    success: function (data) {
      console.log(JSON.stringify(data));
      $("#total-bill-date").text(data + " đơn");
    },
    error: function () {
      console.log("Error retrieving data.");
    },
  });

  $("#startDate").on("change", function () {
    console.log($("#startDate").val());
    console.log($("#endDate").val());
    // Step 1: Create a Date object from the input date string
    var inputDate1 = $("#startDate").val();
    var dateParts1 = inputDate1.split("/");
    var jsDate1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]);

    // Step 2: Extract the desired date components
    var year1 = jsDate1.getFullYear();
    var month1 = String(jsDate1.getMonth() + 1).padStart(2, "0");
    var day1 = String(jsDate1.getDate()).padStart(2, "0");
    var hours1 = "00";
    var minutes1 = "00";
    var seconds1 = "00";
    var milliseconds1 = "000";

    // Step 3: Assemble the formatted date string
    var formattedDate1 = `${year1-1}-${month1}-${day1} ${hours1}:${minutes1}:${seconds1}.${milliseconds1}`;

    console.log(formattedDate1);
        // Step 1: Create a Date object from the input date string
        var inputDate2 = $("#endDate").val();
        var dateParts2 = inputDate2.split("/");
        var jsDate2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
    
        // Step 2: Extract the desired date components
        var year2 = jsDate2.getFullYear();
        var month2 = String(jsDate2.getMonth() + 1).padStart(2, "0");
        var day2 = String(jsDate2.getDate()).padStart(2, "0");
        var hours2 = "00";
        var minutes2 = "00";
        var seconds2 = "00";
        var milliseconds2 = "000";
    
        // Step 3: Assemble the formatted date string
        var formattedDate2 = `${year2}-${month2}-${day2} ${hours2}:${minutes2}:${seconds2}.${milliseconds2}`;
    
        console.log(formattedDate2);

    $.ajax({
      url: `https://localhost:44328/api/OrderItem/total-time?startDate=${formattedDate1}&endDate=${formattedDate2}`,
      type: "GET",
      dataType: "json",
      success: function (data) {
        console.log(JSON.stringify(data));
        $("#total-amount-time").text(
          Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data)
        );
      },
      error: function () {
        console.log("Error retrieving data.");
      },
    });

    $.ajax({
        url: `https://localhost:44328/api/OrderItem/total-bill-time?startDate=${formattedDate1}&endDate=${formattedDate2}`,
        type: "GET",
        dataType: "json",
        success: function (data) {
          console.log(JSON.stringify(data));
          $("#total-bill-time").text(data + " đơn");
        },
        error: function () {
          console.log("Error retrieving data.");
        },
      });

  });
  $("#endDate").on("change", function () {
    console.log($("#startDate").val());
    console.log($("#endDate").val());
    // Step 1: Create a Date object from the input date string
    var inputDate1 = $("#startDate").val();
    var dateParts1 = inputDate1.split("/");
    var jsDate1 = new Date(dateParts1[2], dateParts1[1] - 1, dateParts1[0]);

    // Step 2: Extract the desired date components
    var year1 = jsDate1.getFullYear();
    var month1 = String(jsDate1.getMonth() + 1).padStart(2, "0");
    var day1 = String(jsDate1.getDate()).padStart(2, "0");
    var hours1 = "00";
    var minutes1 = "00";
    var seconds1 = "00";
    var milliseconds1 = "000";

    // Step 3: Assemble the formatted date string
    var formattedDate1 = `${year1}-${month1}-${day1} ${hours1}:${minutes1}:${seconds1}.${milliseconds1}`;

    console.log(formattedDate1);
        // Step 1: Create a Date object from the input date string
        var inputDate2 = $("#endDate").val();
        var dateParts2 = inputDate2.split("/");
        var jsDate2 = new Date(dateParts2[2], dateParts2[1] - 1, dateParts2[0]);
    
        // Step 2: Extract the desired date components
        var year2 = jsDate2.getFullYear();
        var month2 = String(jsDate2.getMonth() + 1).padStart(2, "0");
        var day2 = String(jsDate2.getDate()).padStart(2, "0");
        var hours2 = "00";
        var minutes2 = "00";
        var seconds2 = "00";
        var milliseconds2 = "000";
    
        // Step 3: Assemble the formatted date string
        var formattedDate2 = `${year2}-${month2}-${day2} ${hours2}:${minutes2}:${seconds2}.${milliseconds2}`;
    
        console.log(formattedDate2);
        $.ajax({
            url: `https://localhost:44328/api/OrderItem/total-time?startDate=${formattedDate1}&endDate=${formattedDate2}`,
            type: "GET",
            dataType: "json",
            success: function (data) {
              console.log(JSON.stringify(data));
              $("#total-amount-time").text(
                Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(data)
              );
            },
            error: function () {
              console.log("Error retrieving data.");
            },
          });
      
          $.ajax({
              url: `https://localhost:44328/api/OrderItem/total-bill-time?startDate=${formattedDate1}&endDate=${formattedDate2}`,
              type: "GET",
              dataType: "json",
              success: function (data) {
                console.log(JSON.stringify(data));
                $("#total-bill-time").text(data + " đơn");
              },
              error: function () {
                console.log("Error retrieving data.");
              },
            });
  });

  $.ajax({
    url: "https://localhost:44328/api/OrderItem/get-top",
    type: "GET",
    dataType: "json",
    success: function (data) {
        console.log(JSON.stringify(data));

        // Select the table body element
        var tableBody = $("table #product");

        // Loop through the data and populate the table rows
        for (var i = 0; i < data.length; i++) {
            var product = data[i];
            // Create a new row for each product
            var row = $("<tr class='table-row'>"); // Add the 'table-row' class for hover effect
            row.append("<th scope='row' style='display:none'>" + product.productId + "</th>");
            row.append("<th scope='row' style='padding-left:20px'>" + (i + 1) + "</th>");
            row.append("<td>" + product.productName + "</td>");
            row.append("<td style='padding-left:60px'>" + product.totalQuantitySold + "</td>");
            row.append("<td>" + Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(product.totalRevenue) + "</td>");

            // Append the row to the table body
            tableBody.append(row);
        }
    },
    error: function () {
        console.log("Error retrieving data.");
    },
});
  $.ajax({
    url: "https://localhost:44328/api/OrderItem/get-top-customer",
    type: "GET",
    dataType: "json",
    success: function (data) {
        console.log(JSON.stringify(data));

        // Select the table body element
        var tableBody = $("table #customer");

        // Loop through the data and populate the table rows
        for (var i = 0; i < data.length; i++) {
            var customer = data[i];
            // Create a new row for each product
            var row = $("<tr class='table-row'>"); // Add the 'table-row' class for hover effect
            row.append("<th scope='row' style='display:none'>" + customer.userId + "</th>");
            row.append("<th scope='row' style='padding-left:20px'>" + (i + 1) + "</th>");
            row.append("<td>" + customer.customerName + "</td>");
            row.append("<td style='padding-left:60px'>" + customer.totalOrders + "</td>");
            row.append("<td>" + Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(customer.totalRevenue) + "</td>");

            // Append the row to the table body
            tableBody.append(row);
        }
    },
    error: function () {
        console.log("Error retrieving data.");
    },
});

$(".table #product").on("click", "tr", function (e) {
  e.preventDefault();
  const productId = $(this).find('th:first').text();
  if (productId !== null) {
    localStorage.setItem("productId", productId);
    window.location.href = `/frontend/admin/product-detail.html`;
  }
});

});
const id_user = localStorage.getItem("user-id");
$.ajax({
  url: "https://localhost:44328/api/AppUser/Get/" + id_user,
  type: "GET",
  contentType: "application/json",
  success: function (data) {
    console.log(data.fullName);
    $("#fullName").text(data.fullName);
  },
  error: function () {},
});
