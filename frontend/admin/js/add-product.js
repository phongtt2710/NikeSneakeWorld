var loadFile = function (event) {
  var image = document.getElementById('output');
  image.src = URL.createObjectURL(event.target.files[0]);
};
function increment() {
  const input = document.getElementById("number");
  let newValue = parseInt(input.value) + 1;
  if (isNaN(newValue)) {
    newValue = 0;
  }
  input.value = newValue;
}

function decrement() {
  const input = document.getElementById("number");
  let newValue = parseInt(input.value) - 1;
  if (newValue < 0 || isNaN(newValue)) {
    newValue = 0;
  }
  input.value = newValue;
}

var option_category = [];
$.getJSON("https://localhost:44328/api/Categories", function (result) {
  for (var i = 0; i < result.length; i++) {
    option_category.push('<option value="', result[i].id, '">', result[i].name, '</option>');
  }
  $("#category-select").html(option_category.join(''));
});

var option_color = [];
$.getJSON("https://localhost:44328/api/Color/Get", function (result) {
  for (var i = 0; i < result.length; i++) {
    option_color.push('<option value="', result[i].id, '">', result[i].name, '</option>');
  }
  $("#color-select").html(option_color.join(''));
});

var option_size = [];
$.getJSON("https://localhost:44328/api/Size/Get", function (result) {
  for (var i = 0; i < result.length; i++) {
    option_size.push('<option value="', result[i].id, '">', result[i].numberSize, '</option>');
  }
  $("#size-select").html(option_size.join(''));
});

// call api len datatable nhan vien
$(document).ready(function () {
  // call api them nhan vien
  $('#add-product-form').submit(function (event) {
    event.preventDefault()
    var formData = {
      "name": $("#name").val(),
      "retailPrice": $("#retailPrice").val(),
      "costPrice": $("#costPrice").val(),
      "description": $("#description").val(),
      "brand": 0,
      "status": Number($("#status").val()),
      "discountRate": 0,
    };

    $.ajax({
      url: "https://localhost:44328/api/Product",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        localStorage.setItem("productId", response.id);
        console.log(response.id)
        window.location.href = "/frontend/admin/product-detail.html";
      },
    });
  });

});
$.validator.addMethod("compare2Price", function (value, element) {
  var parts1 = Number($("#retailPrice").val());
  var parts2 = Number($("#costPrice").val());
  return parts1 > parts2

});
$("#add-product-form").validate({
  rules: {
      "name": {
          required: true,
      },
      "retailPrice": {
        required: true,
    },
    "costPrice": {
      required: true,
  },
      "retailPrice": {
        required: true,
        compare2Price: true,
    },
  },
  messages: {
      "name": {
          required: "Mời bạn nhập Tên sản phẩm",
      },
    "retailPrice": {
      required: "Mời bạn nhập giá bán",
      compare2Price: "Tiền nhập không được lớn hơn tiền bán",
  },
  "costPrice": {
    required: "Mời bạn nhập giá nhập",
},
  },
});
