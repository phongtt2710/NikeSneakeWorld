var selectTypeDiscount = 0;

function selectDiscountType(type) {
  const options = document.querySelectorAll(".option");
  const discountPercen = document.getElementById("discountPercen");
  const discountFixed = document.getElementById("discountFixed");

  discountPercen.style.display = "none";
  discountFixed.style.display = "none";

  // Loại bỏ lớp 'selected' khỏi tất cả các tùy chọn
  options.forEach((option) => {
    option.classList.remove("selected");
  });
  selectTypeDiscount = type;
  // Thêm lớp 'selected' cho tùy chọn được chọn
  options[type].classList.add("selected");
  if (type === 1) {
    discountPercen.style.display = "block";
  } else if (type === 2) {
    discountFixed.style.display = "block";
  }
}
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

function formatCurrency(input, type) {
  const validateFixedPrice = document.getElementById("validateFixedPrice");
  validateFixedPrice.style.display = "none";
  let value = input.value.replace(/[^\d]/g, ""); // Loại bỏ các ký tự không phải s

  if (type === 1) {
    let basePrice = parseInt($("#retailPrice").val().replace(/[^\d]/g, ""));
    if (parseInt(value) > basePrice) {
      value = 0;
      validateFixedPrice.style.display = "block";
    }
  }

  let numericValue = parseInt(value, 10);
  if (!isNaN(numericValue)) {
    const formattedValue = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numericValue);
    input.value = formattedValue;
  } else {
    input.value = "";
  }
}

function rangeSlide(value) {
  document.getElementById("rangeValue").innerHTML = value;
}

var option_category = [];
$.getJSON("https://localhost:44328/api/Categories", function (result) {
  for (var i = 0; i < result.length; i++) {
    option_category.push(
      '<option value="',
      result[i].id,
      '">',
      result[i].name,
      "</option>"
    );
  }
  $("#category-select").html(option_category.join(""));
});

$("#add-category-now").click(function () {
  var formData = {
    name: $("#category-name").val(),
  };

  if (confirm(`Bạn có muốn thêm danh mục ${formData.name} không?`)) {
    $.ajax({
      url: "https://localhost:44328/api/Categories",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        $("#success").toast("show");
        $("#add-category").modal("hide");

        var option_category = [];
        $.getJSON("https://localhost:44328/api/Categories", function (result) {
          for (var i = 0; i < result.length; i++) {
            option_category.push(
              '<option value="',
              result[i].id,
              '">',
              result[i].name,
              "</option>"
            );
          }
          $("#category-select").html(option_category.join(""));
        });
      },
      error: function () {
        $("#category-duplicate").toast("show");
      },
    });
  }
});

var option_sole = [];
$.getJSON("https://localhost:44328/api/Sole", function (result) {
  for (var i = 0; i < result.length; i++) {
    option_sole.push(
      '<option value="',
      result[i].id,
      '">',
      result[i].name,
      "</option>"
    );
  }
  $("#sole-select").html(option_sole.join(""));
});

$("#add-material-now").click(function () {
  var formData = {
    name: $("#material-name").val(),
    description: "",
  };

  if (confirm(`Bạn có muốn thêm chất liệu ${formData.name} không?`)) {
    $.ajax({
      url: "https://localhost:44328/api/Material",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        $("#success").toast("show");
        $("#add-material").modal("hide");

        var option_material = [];
        $.getJSON("https://localhost:44328/api/Material", function (result) {
          for (var i = 0; i < result.length; i++) {
            option_material.push(
              '<option value="',
              result[i].id,
              '">',
              result[i].name,
              "</option>"
            );
          }
          $("#material-select").html(option_material.join(""));
        });
      },
      error: function () {
        $("#material-duplicate").toast("show");
      },
    });
  }
});

var option_material = [];
$.getJSON("https://localhost:44328/api/Material", function (result) {
  for (var i = 0; i < result.length; i++) {
    option_material.push(
      '<option value="',
      result[i].id,
      '">',
      result[i].name,
      "</option>"
    );
  }
  $("#material-select").html(option_material.join(""));
});

$("#add-sole-now").click(function () {
  var formData = {
    name: $("#sole-name").val(),
    description: "",
  };

  if (confirm(`Bạn có muốn thêm đế ${formData.name} không?`)) {
    $.ajax({
      url: "https://localhost:44328/api/Sole",
      type: "POST",
      data: JSON.stringify(formData),
      contentType: "application/json",
      success: function (response) {
        $("#success").toast("show");
        $("#add-sole").modal("hide");

        var option_sole = [];
        $.getJSON("https://localhost:44328/api/Sole", function (result) {
          for (var i = 0; i < result.length; i++) {
            option_sole.push(
              '<option value="',
              result[i].id,
              '">',
              result[i].name,
              "</option>"
            );
          }
          $("#sole-select").html(option_sole.join(""));
        });
      },
      error: function () {
        $("#sole-duplicate").toast("show");
      },
    });
  }
});

var product = {
  retailPrice: 0,
  description: "",
  status: 1,
  brand: 1,
  discountRate: 0,
  soleId: 0,
  materialId: 0,
  name: "",
  Categories: [],
  Colors: [],
};

var selectedColor = -1;

function objectToFormData(obj) {
  var formData = new FormData();

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}
// call api len datatable nhan vien
$(document).ready(function () {
  // call api them nhan vien
  $("#add-product-form").submit(function (event) {
    event.preventDefault();

    var selectedOptions = $("#category-select").val(); // Get selected options

    if (!selectedOptions || selectedOptions.length === 0) {
      $("#error-category").show();
    } else {
      $("#error-category").hide();
    }

    if (selectedColor === -1) {
      $("#error-color").show();
    } else {
      $("#error-color").hide();
    }

    if (product.Colors[selectedColor].Sizes.length === 0) {
      $("#error-size").show();
    } else {
      $("#error-size").hide();
    }

    //check ảnh
    for (let i = 0; i < product.Colors.length; i++) {
      console.log(product.Colors[i].Images.length);
      if (product.Colors[i].Images.length == 0) {
        var customMessage = `Sản phẩm màu ${product.Colors[i].name} chưa có ảnh`;
        $("#invalid-image .toast-body").text(customMessage);
        $("#invalid-image").toast("show");
        return;
      }
    }

    let productFormData = new FormData();
    productFormData.append("name", $("#name").val());
    productFormData.append("description", $("#description").val());
    let value = $("#retailPrice").val().replace(/[^\d]/g, ""); // Loại bỏ các ký tự không phải s
    productFormData.append("retailPrice", value);
    let value2 = 0; // Loại bỏ các ký tự không phải s
    if (selectTypeDiscount === 1) {
      value2 = value - (parseInt($("#rangPercen").val()) * value) / 100;
    } else if (selectTypeDiscount === 2) {
      value2 = parseInt($("#fixedPrice").val().replace(/[^\d]/g, ""));
    } else {
      value2 = value;
    }
    productFormData.append("discountRate", value2);
    productFormData.append("discountType", selectTypeDiscount);
    productFormData.append("soleId", $("#sole-select").val());
    productFormData.append("materialId", $("#material-select").val());
    productFormData.append("status", 1);
    productFormData.append("brand", 1);

    if (product.Colors.length !== 0) {
      for (let i = 0; i < product.Colors.length; i++) {
        productFormData.append(`colors[${i}].id`, product.Colors[i].id);
        for (let j = 0; j < product.Colors[i].Images.length; j++) {
          productFormData.append(
            `colors[${i}].images[${j}].image`,
            product.Colors[i].Images[j].file
          );
          productFormData.append(
            `colors[${i}].images[${j}].setAsDefault`,
            product.Colors[i].Images[j].setAsDefault
          );
        }
        for (let y = 0; y < product.Colors[i].Sizes.length; y++) {
          productFormData.append(
            `colors[${i}].sizes[${y}].id`,
            product.Colors[i].Sizes[y].id
          );
          productFormData.append(
            `colors[${i}].sizes[${y}].unitInStock`,
            product.Colors[i].Sizes[y].unitInStock
          );
        }
      }
    }

    var categories = $("#category-select").val();
    if (categories.length !== 0) {
      for (let i = 0; i < categories.length; i++) {
        productFormData.append(`categories[${i}].id`, categories[i]);
      }
    }

    // console.log($("#category-select").val());
    for (var pair of productFormData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    if (confirm(`Bạn có muốn thêm sản phẩm này không?`)) {
      $.ajax({
        url: "https://localhost:44328/api/Product",
        type: "POST",
        data: productFormData,
        processData: false,
        contentType: false,
        success: function (response) {
          // localStorage.setItem("productId", response.id);
          // console.log(response.id)
          //window.location.href = "/frontend/admin/product-detail.html";
          $("#success").toast("show");
          // reset form
          var form = $("#add-product-form")[0];
          form.reset();
          clearE();
          product = {
            retailPrice: 0,
            description: "",
            status: 1,
            brand: 1,
            discountRate: 0,
            soleId: 0,
            materialId: 0,
            name: "",
            Categories: [],
            Colors: [],
          };
        },
        error: function (xhr) {
          if (
            xhr.responseJSON.error ===
            "An error occurred while updating the entries. See the inner exception for details."
          ) {
            var customMessage = `Thêm thất bại - Tên sản phẩm đã tồn tại`;
            $("#name-duplicate .toast-body").text(customMessage);
            $("#name-duplicate").toast("show");
            return;
          }
          $("#fail").toast("show");
        },
      });
    } else {
      return;
    }
  });
});

$("#add-product-form").validate({
  rules: {
    name: {
      required: true,
      noSpaces: true,
    },
    description: {
      required: true,
      noSpaces: true,
    },
    retailPrice: {
      required: true,
      noSpaces: true,
    },
    discountRate: {
      required: true,
    },
  },
  messages: {
    name: {
      required: "Chưa nhập Tên sản phẩm",
    },
    description: {
      required: "Chưa nhập mô tả",
    },
    retailPrice: {
      required: "Chưa nhập giá gốc",
    },
    discountRate: {
      required: "Chưa nhập giảm giá",
    },
  },
});

$.validator.addMethod(
  "noSpaces",
  function (value, element) {
    return value.trim() !== "";
  },
  "Vui lòng không nhập toàn khoảng trắng"
);

// Chờ tài liệu HTML được tải xong
document.addEventListener("DOMContentLoaded", () => {
  const uploadList = document.querySelector(".upload-list");
  const uploadButton = document.getElementById("upload-button");

  // Xử lý sự kiện khi nhấn nút đóng trong modal
  const handleCancel = () => {
    document.querySelector(".preview-modal").style.display = "none";
  };

  // Xử lý sự kiện khi xóa hình ảnh

  // Lắng nghe sự kiện click nút đóng trong modal
  const modalCloseButton = document.querySelector(".modal-close-button");
  modalCloseButton.addEventListener("click", () => {
    handleCancel();
  });

  // Lắng nghe sự kiện click overlay để đóng modal
  const modalOverlay = document.querySelector(".modal-overlay");
  modalOverlay.addEventListener("click", () => {
    handleCancel();
  });

  // Ngăn sự kiện click trên nội dung modal lan sang nền
  const modalContent = document.querySelector(".modal-content");
  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  // Lắng nghe sự kiện click nút tải lên
  uploadButton.addEventListener("click", () => {
    const fileInput = document.getElementById("file-input");
    console.log("run");
    if (selectedColor === -1) {
      alert("Bạn phải chọn màu trước");
    } else {
      fileInput.click();
    }
  });

  // Lắng nghe sự kiện thay đổi tập tin tải lên
  const fileInput = document.getElementById("file-input");
  fileInput.addEventListener("change", (event) => {
    const files = event.target.files;
    const maxImagesPerColor = 6;

    const imagesToAdd = [];
    const remainingSlots =
      maxImagesPerColor - product.Colors[selectedColor].Images.length;

    for (const file of files) {
      if (
        file.type.startsWith("image/") &&
        imagesToAdd.length < remainingSlots
      ) {
        const newImage = { file: file, setAsDefault: false };
        imagesToAdd.push(newImage);
      }
    }

    product.Colors[selectedColor].Images.push(...imagesToAdd);
    loadImageE();
    fileInput.value = ""; // Reset file input
  });
});

function handleDelete(file) {
  const uploadButton = document.getElementById("upload-button");
  const index = product.Colors[selectedColor].Images.findIndex(
    (p) => p.file === file
  );
  if (index > -1) {
    product.Colors[selectedColor].Images.splice(index, 1);
    if (product.Colors[selectedColor].Images.length < 6) {
      uploadButton.style.display = "flex";
    }
    loadImageE();
  }
}
// start
function loadImageE() {
  const uploadList = document.querySelector(".upload-list");
  const dynamicDivs = uploadList.querySelectorAll(".preview-container");
  const uploadButton = document.getElementById("upload-button");

  dynamicDivs.forEach((dy) => {
    uploadList.removeChild(dy);
  });
  if (selectedColor !== -1) {
    // Kiểm tra nếu danh sách hình ảnh đã đạt đến giới hạn
    if (product.Colors[selectedColor].Images.length === 6) {
      uploadButton.style.display = "none"; // Ẩn nút "Upload"
    } else {
      uploadButton.style.display = "flex";
    }

    if (product.Colors[selectedColor].Images.length !== 0) {
      product.Colors[selectedColor].Images.forEach((img) => {
        const previewContainer = document.createElement("div");
        previewContainer.className = "preview-container";
        const previewImage = document.createElement("img");
        previewImage.src = URL.createObjectURL(img.file);
        previewImage.alt = "Preview";
        previewImage.className = "preview-image";

        // Tạo nút xóa và xử lý sự kiện khi click
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => {
          handleDelete(img.file);
        });

        previewContainer.appendChild(previewImage);
        previewContainer.appendChild(deleteButton);
        uploadList.appendChild(previewContainer);
      });
    }
  }
}
//end
function findIndexById(array, id) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].id === id) {
      return i; // Trả về chỉ số khi tìm thấy phần tử có id tương ứng
    }
  }
  return -1; // Trả về -1 nếu không tìm thấy phần tử
}

function clearE() {
  const uploadList = document.querySelector(".upload-list");
  const dynamicDivs = uploadList.querySelectorAll(".preview-container");
  const plusButtonContainer = document.getElementById("render-color");
  const sizeContainer = document.getElementById("render-size");

  plusButtonContainer.innerHTML = "";

  while (sizeContainer.firstChild) {
    sizeContainer.removeChild(sizeContainer.firstChild);
  }

  dynamicDivs.forEach((dy) => {
    uploadList.removeChild(dy);
  });
}

function loadColorE() {
  const plusButtonContainer = document.getElementById("render-color");
  plusButtonContainer.innerHTML = "";

  if (product.Colors.length !== 0) {
    product.Colors.forEach((color) => {
      var newDiv = document.createElement("div");
      newDiv.className = "container-color";

      var newButton = document.createElement("button");
      newButton.type = "button";
      newButton.className = "btn btn-outline-dark pick-color";
      newButton.id = color.id;
      newButton.textContent = color.name;
      newButton.addEventListener("click", function (e) {
        var buttons = document.getElementsByClassName(
          "btn-outline-dark pick-color"
        );
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove("active");
        }

        // Thêm lớp active cho nút được bấm
        newButton.classList.add("active");
        selectedColor = findIndexById(product.Colors, e.target.id);
        loadSizeE();
        loadImageE();
      });

      var newRemoveBtn = document.createElement("button");
      newRemoveBtn.className = "close-button";
      newRemoveBtn.textContent = " x ";
      newRemoveBtn.id = color.id;
      newRemoveBtn.addEventListener("click", function (e) {
        let index = findIndexById(product.Colors, e.target.id);
        product.Colors.splice(index, 1);
        console.log(product);
        if (product.Colors.length === 0) {
          selectedColor = -1;
          clearE();
        } else {
          selectedColor = 0;
          loadColorE();
          loadSizeE();
          loadImageE();
        }
      });

      newDiv.appendChild(newButton);
      newDiv.appendChild(newRemoveBtn);

      plusButtonContainer.appendChild(newDiv);
    });
  }
}

function isIdExists(id, array) {
  return array.some(function (item) {
    return item.id === id;
  });
}
// add color
document.addEventListener("DOMContentLoaded", function () {
  var addColorButton = document.getElementById("addColorButton");
  var selectedColorText = {};

  addColorButton.addEventListener("click", function () {
    if (selectedColorText == {} || selectedColorText === undefined) {
      return; // Ngăn việc thêm nút nếu màu chưa được chọn
    }

    if (!isIdExists(selectedColorText.id, product.Colors)) {
      product.Colors.push({
        id: selectedColorText.id,
        name: selectedColorText.text,
        Images: [],
        Sizes: [],
      });
    } else {
      alert(`Màu ${selectedColorText.text} đã tồn tại!`);
      selectedColorText = {};
      return;
    }

    selectedColor = findIndexById(product.Colors, selectedColorText.id);
    loadColorE();
    loadSizeE();
    loadImageE();
    console.log(product);

    selectedColorText = {};
    $("#exampleModalColor").modal("hide");
  });

  $("#exampleModalColor").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    selectedColorText = button.data("color");
  });

  $("#exampleModalColor").on("hide.bs.modal", function () {
    selectedColorText = ""; // Reset màu đã chọn khi modal đóng
  });

  $.ajax({
    url: "https://localhost:44328/api/Color/Get",
    method: "GET",
    dataType: "json",
    success: function (data) {
      var buttonContainer = $("#colorContainer");
      var addButton = buttonContainer.find("#add-now-btn"); // Get the "add-now-btn" button
      var buttonsToKeep = buttonContainer.find(".btn:not(#add-now-btn)"); // Get all buttons except "add-now-btn"

      buttonContainer.empty(); // Empty the container

      // Append the buttons you want to keep
      buttonsToKeep.each(function () {
        buttonContainer.append($(this));
      });
      data.forEach(function (item) {
        var button = $("<button></button>");
        button.attr("type", "button");
        button.addClass("btn btn-outline-dark add-color");
        button.css("margin-left", "3%");
        button.css("margin-top", "1%");
        button.text(item.name);
        button.attr("data-color", item.name);
        button.attr("id", item.id);
        button.click(function () {
          selectedColorText = { id: item.id, text: item.name };
          var buttons = document.getElementsByClassName(
            "btn-outline-dark add-color"
          );
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
          }

          $(this).addClass("active");
        });
        buttonContainer.append(button);
      });

      buttonContainer.append(addButton); // Append the "add-now-btn" button back
    },
    error: function () {
      console.error("Error fetching data.");
    },
  });

  // add color nhanh
  $("#add-color-now").click(function () {
    // thêm nút ban đầu
    var buttonContainer = $("#colorContainer");
    var addButton = buttonContainer.find("#add-now-btn");
    buttonContainer.empty();
    buttonContainer.append(addButton);
    var formData = {
      name: $("#color-name").val(),
    };
    if (confirm(`Bạn có muốn thêm màu ${formData.name}?`)) {
      $.ajax({
        url: "https://localhost:44328/api/Color",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
          $("#exampleModalAddColor").modal("hide");
          $.ajax({
            url: "https://localhost:44328/api/Color/Get",
            method: "GET",
            dataType: "json",
            success: function (data) {
              var buttonContainer = $("#colorContainer");
              var addButton = buttonContainer.find("#add-now-btn"); // Get the "add-now-btn" button
              var buttonsToKeep = buttonContainer.find(
                ".btn:not(#add-now-btn)"
              ); // Get all buttons except "add-now-btn"

              buttonContainer.empty(); // Empty the container

              // Append the buttons you want to keep
              buttonsToKeep.each(function () {
                buttonContainer.append($(this));
              });
              data.forEach(function (item) {
                var button = $("<button></button>");
                button.attr("type", "button");
                button.addClass("btn btn-outline-dark after-add-color");
                button.css("margin-left", "3%");
                button.css("margin-top", "1%");
                button.text(item.name);
                button.attr("data-color", item.name);
                button.attr("id", item.id);
                button.click(function () {
                  selectedColorText = { id: item.id, text: item.name };
                  var buttons = document.getElementsByClassName(
                    "btn-outline-dark after-add-color"
                  );
                  for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove("active");
                  }

                  $(this).addClass("active");
                });
                buttonContainer.append(button);
              });

              buttonContainer.append(addButton); // Append the "add-now-btn" button back
            },
            error: function () {
              $("#color-duplicate").toast("show");
            },
          });
          $("#exampleModalColor").modal("show");
        },
        error: function () {
          $.ajax({
            url: "https://localhost:44328/api/Color/Get",
            method: "GET",
            dataType: "json",
            success: function (data) {
              var buttonContainer = $("#colorContainer");
              var addButton = buttonContainer.find("#add-now-btn"); // Get the "add-now-btn" button
              var buttonsToKeep = buttonContainer.find(
                ".btn:not(#add-now-btn)"
              ); // Get all buttons except "add-now-btn"

              buttonContainer.empty(); // Empty the container

              // Append the buttons you want to keep
              buttonsToKeep.each(function () {
                buttonContainer.append($(this));
              });
              data.forEach(function (item) {
                var button = $("<button></button>");
                button.attr("type", "button");
                button.addClass("btn btn-outline-dark add-color");
                button.css("margin-left", "3%");
                button.css("margin-top", "1%");
                button.text(item.name);
                button.attr("data-color", item.name);
                button.attr("id", item.id);
                button.click(function () {
                  var buttons = document.getElementsByClassName(
                    "btn-outline-dark add-color"
                  );
                  for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove("active");
                  }

                  $(this).addClass("active");
                  selectedColorText = { id: item.id, text: item.name };
                });
                buttonContainer.append(button);
              });

              buttonContainer.append(addButton); // Append the "add-now-btn" button back
            },
            error: function () {
              $("#color-duplicate").toast("show");
            },
          });
          $("#color-duplicate").toast("show");
        },
      });
    }
  });
});

function loadSizeE() {
  var plusButtonContainer = document.getElementById("render-size");
  // Xóa tất cả các phần tử con trong containerParent
  while (plusButtonContainer.firstChild) {
    plusButtonContainer.removeChild(plusButtonContainer.firstChild);
  }

  if (product.Colors.length !== 0) {
    if (product.Colors[selectedColor].Sizes.length !== 0) {
      product.Colors[selectedColor].Sizes.forEach((element) => {
        var container = document.createElement("div");
        container.className = "container-unit";

        // thêm ô hiển thị size
        var newButton = document.createElement("button");
        newButton.className = "btn btn-outline-dark";
        newButton.textContent = element.numberSize;

        newButton.addEventListener("click", function (event) {
          event.preventDefault(); // Prevent the default click behavior
          event.stopPropagation(); // Stop the event from propagating
          // You can optionally add some code here if you want, but it will not affect the button behavior
        });

        var newLabel = document.createElement("label");
        newLabel.textContent = "Số lượng";
        newLabel.style = "margin: 0 10px 0 20px;";

        var validationMessage = document.createElement("span");
        validationMessage.className = "validation-message";
        validationMessage.textContent = ""; // Initially no message
        validationMessage.style = "color:red;font-weight: 600;";

        // thêm ô điền số lượng
        var newInput = document.createElement("input");
        newInput.className = "input-unit";
        newInput.placeholder = "Số lượng: ";
        newInput.value = element.unitInStock > 0 ? element.unitInStock : 1;
        console.log(newInput.value);
        newInput.addEventListener("change", function () {
          if (/^[0-9]+$/.test(newInput.value) && parseInt(newInput.value) > 0) {
            validationMessage.textContent = "";
            let index = product.Colors[selectedColor].Sizes.findIndex(
              (p) => p.id === element.id
            );
            product.Colors[selectedColor].Sizes[index].unitInStock = parseInt(
              newInput.value
            );
          } else {
            newInput.value = 1;
            validationMessage.textContent =
              "Số lượng là số lớn hơn hoặc bằng 1";
          }
        });

        // thêm nút x bỏ
        var newXButton = document.createElement("button");
        newXButton.type = "button";
        newXButton.className = "btn btn-danger";
        newXButton.textContent = "x";
        newXButton.addEventListener("click", function () {
          if (confirm("Bạn có muốn xóa thuộc tính này?")) {
            let index = product.Colors[selectedColor].Sizes.findIndex(
              (p) => p.id === element.id
            );
            product.Colors[selectedColor].Sizes.splice(index, 1);
            loadSizeE();
          }
        });

        container.appendChild(newButton);
        container.appendChild(newLabel);
        container.appendChild(newInput);
        container.appendChild(newXButton);
        container.appendChild(validationMessage);
        plusButtonContainer.appendChild(container);
      });
    }
  }
}

// add size
document.addEventListener("DOMContentLoaded", function () {
  var addColorButton = document.getElementById("addSizeButton");
  var selectedColorText = {};

  addColorButton.addEventListener("click", function () {
    if (selectedColorText == {} || selectedColorText === undefined) {
      return; // Ngăn việc thêm nút nếu màu chưa được chọn
    }

    if (
      selectedColor !== -1 &&
      !isIdExists(selectedColorText.id, product.Colors[selectedColor].Sizes)
    ) {
      product.Colors[selectedColor].Sizes.push(selectedColorText);
    } else {
      alert(`Size ${selectedColorText.numberSize} đã tồn tại`);
      selectedColorText = {};
      return;
    }
    loadSizeE();
    $("#exampleModalSize").modal("hide");
    selectedColorText = {};

    var buttons = document.getElementsByClassName(
      "btn btn-outline-dark pick-size"
    );
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
    var buttons = document.getElementsByClassName(
      "btn btn-outline-dark after-add-size"
    );
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove("active");
    }
  });

  $("#exampleModalSize").on("show.bs.modal", function (event) {
    if (selectedColor === -1) {
      alert("Bạn phải chọn màu trước");
      event.preventDefault();
    }
    var button = $(event.relatedTarget);
    selectedColorText = button.data("color");
  });

  $("#exampleModalSize").on("hide.bs.modal", function () {
    selectedColorText = {}; // Reset màu đã chọn khi modal đóng
  });

  $.ajax({
    url: "https://localhost:44328/api/Size/Get",
    method: "GET",
    dataType: "json",
    success: function (data) {
      var buttonContainer = $("#sizeContainer");
      var addButton = buttonContainer.find("#add-size-now"); // Get the "add-now-btn" button
      var buttonsToKeep = buttonContainer.find(".btn:not(#add-size-now)"); // Get all buttons except "add-now-btn"

      buttonContainer.empty(); // Empty the container

      // Append the buttons you want to keep
      buttonsToKeep.each(function () {
        buttonContainer.append($(this));
      });

      data.forEach(function (item) {
        var button = $("<button></button>");
        button.attr("type", "button");
        button.addClass("btn btn-outline-dark pick-size");
        button.css("margin-left", "3%");
        button.css("margin-top", "1%");
        button.text(item.numberSize);
        button.attr("data-color", item.numberSize);
        button.click(function () {
          selectedColorText = {
            id: item.id,
            numberSize: item.numberSize,
            unitInStock: 1,
          };
          var buttons = document.getElementsByClassName(
            "btn-outline-dark pick-size"
          );
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
          }

          $(this).addClass("active");
        });
        buttonContainer.append(button);
      });

      buttonContainer.append(addButton); // Append the "add-now-btn" button back
    },
    error: function () {
      console.error("Error fetching data.");
    },
  });
  // add color nhanh
  $("#add-size-now-btn").click(function () {
    // thêm nút ban đầu
    var buttonContainer = $("#sizeContainer");
    var addButton = buttonContainer.find("#add-size-now");
    buttonContainer.empty();
    buttonContainer.append(addButton);
    var formData = {
      numberSize: $("#numberSize").val(),
    };
    if (confirm(`Bạn có muốn thêm size ${formData.numberSize}?`)) {
      if (formData.numberSize <= 0) {
        // Select the toast element by its ID
        var toastElement = $("#size-duplicate");

        // Change the text content of the toast
        toastElement.find(".toast-body").text("Size phải là số dương");

        // Show the toast
        toastElement.toast("show");
        $.ajax({
          url: "https://localhost:44328/api/Size/Get",
          method: "GET",
          dataType: "json",
          success: function (data) {
            var buttonContainer = $("#sizeContainer");
            var addButton = buttonContainer.find("#add-size-now"); // Get the "add-now-btn" button
            var buttonsToKeep = buttonContainer.find(
              ".btn:not(#add-size-now)"
            ); // Get all buttons except "add-now-btn"

            buttonContainer.empty(); // Empty the container

            // Append the buttons you want to keep
            buttonsToKeep.each(function () {
              buttonContainer.append($(this));
            });

            data.forEach(function (item) {
              var button = $("<button></button>");
              button.attr("type", "button");
              button.addClass("btn btn-outline-dark after-add-size");
              button.css("margin-left", "3%");
              button.css("margin-top", "1%");
              button.text(item.numberSize);
              button.attr("data-color", item.numberSize);
              button.click(function () {
                selectedColorText = {
                  id: item.id,
                  numberSize: item.numberSize,
                  unitInStock: 1,
                };
                var buttons = document.getElementsByClassName(
                  "btn-outline-dark after-add-size"
                );
                for (var i = 0; i < buttons.length; i++) {
                  buttons[i].classList.remove("active");
                }

                $(this).addClass("active");
              });
              buttonContainer.append(button);
            });

            buttonContainer.append(addButton); // Append the "add-now-btn" button back
          },
          error: function (error, xhr) {},
        });
        return
      }
      $.ajax({
        url: "https://localhost:44328/api/Size",
        type: "POST",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function (response) {
          $("#exampleModalAddSize").modal("hide");
          $.ajax({
            url: "https://localhost:44328/api/Size/Get",
            method: "GET",
            dataType: "json",
            success: function (data) {
              var buttonContainer = $("#sizeContainer");
              var addButton = buttonContainer.find("#add-size-now"); // Get the "add-now-btn" button
              var buttonsToKeep = buttonContainer.find(
                ".btn:not(#add-size-now)"
              ); // Get all buttons except "add-now-btn"

              buttonContainer.empty(); // Empty the container

              // Append the buttons you want to keep
              buttonsToKeep.each(function () {
                buttonContainer.append($(this));
              });

              data.forEach(function (item) {
                var button = $("<button></button>");
                button.attr("type", "button");
                button.addClass("btn btn-outline-dark after-add-size");
                button.css("margin-left", "3%");
                button.css("margin-top", "1%");
                button.text(item.numberSize);
                button.attr("data-color", item.numberSize);
                button.click(function () {
                  selectedColorText = {
                    id: item.id,
                    numberSize: item.numberSize,
                    unitInStock: 1,
                  };
                  var buttons = document.getElementsByClassName(
                    "btn-outline-dark after-add-size"
                  );
                  for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove("active");
                  }

                  $(this).addClass("active");
                });
                buttonContainer.append(button);
              });

              buttonContainer.append(addButton); // Append the "add-now-btn" button back
            },
            error: function () {
              console.error("Error fetching data.");
            },
          });

          $("#exampleModalSize").modal("show");
        },
        error: function (error, xhr) {
          $.ajax({
            url: "https://localhost:44328/api/Size/Get",
            method: "GET",
            dataType: "json",
            success: function (data) {
              var buttonContainer = $("#sizeContainer");
              var addButton = buttonContainer.find("#add-size-now"); // Get the "add-now-btn" button
              var buttonsToKeep = buttonContainer.find(
                ".btn:not(#add-size-now)"
              ); // Get all buttons except "add-now-btn"

              buttonContainer.empty(); // Empty the container

              // Append the buttons you want to keep
              buttonsToKeep.each(function () {
                buttonContainer.append($(this));
              });

              data.forEach(function (item) {
                var button = $("<button></button>");
                button.attr("type", "button");
                button.addClass("btn btn-outline-dark after-add-size");
                button.css("margin-left", "3%");
                button.css("margin-top", "1%");
                button.text(item.numberSize);
                button.attr("data-color", item.numberSize);
                button.click(function () {
                  selectedColorText = {
                    id: item.id,
                    numberSize: item.numberSize,
                    unitInStock: 1,
                  };
                  var buttons = document.getElementsByClassName(
                    "btn-outline-dark after-add-size"
                  );
                  for (var i = 0; i < buttons.length; i++) {
                    buttons[i].classList.remove("active");
                  }

                  $(this).addClass("active");
                });
                buttonContainer.append(button);
              });

              buttonContainer.append(addButton); // Append the "add-now-btn" button back
            },
            error: function (error, xhr) {},
          });
          console.log(error.status);
          if (error.status === 409) {
            // Select the toast element by its ID
            var toastElement = $("#size-duplicate");

            // Change the text content of the toast
            toastElement.find(".toast-body").text("Size bị trùng");

            // Show the toast
            toastElement.toast("show");
          }
          if (error.status === 400) {
            // Select the toast element by its ID
            var toastElement = $("#size-duplicate");

            // Change the text content of the toast
            toastElement.find(".toast-body").text("Kích cỡ phải là số");

            // Show the toast
            toastElement.toast("show");
          }
        },
      });
    }
  });
});
