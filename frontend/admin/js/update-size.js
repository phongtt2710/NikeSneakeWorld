const id = localStorage.getItem("sizeId");
console.log(id) //lay id nhan vien
// call api chi tiet 1 nhan vien
$(document).ready(function () {
    $.ajax({
        url: "https://localhost:44328/api/Size/Get/" + id,
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            $('#numberSize').val(data.numberSize);
            $('#description').val(data.description);
        },
        error: function () {
            console.log("Error retrieving data.");
        }
    });
    $('#update-size-form').submit(function (event) {
        event.preventDefault()
        var formData = {
            id: id,
            numberSize: $("#numberSize").val(),
            description: $("#description").val(),
        };
        if (confirm(`Bạn có muốn sửa thành thông tin size không?`)) {
            $.ajax({
                url: "https://localhost:44328/api/Size/" + id,
                type: "PUT",
                data: JSON.stringify(formData),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    window.location.href = "/frontend/admin/size.html";
                },
            });
        } else {
            return
        }
    });
    $("#update-size-form").validate({
        rules: {
            "numberSize": {
                required: true,
            },
        },
        messages: {
            "numberSize": {
                required: "Mời bạn nhập kích cỡ",
            },
        },
    });
});


