// call api len datatable nhan vien
$(document).ready(function () {
    var sizeTable = $('#size-table').DataTable({
        "ajax": {
            "url": "https://localhost:44328/api/Size/Get",
            "dataType": "json",
            "dataSrc": ""
        },
        "columns": [
            {
                "data": 'id', "title": "STT",
                render: function (data, type, row, meta) {
                    return meta.row + 1;
                }
            },
            { "data": 'numberSize', "title": "Kích cỡ size" },
            { "data": 'description', "title": "Mô tả" },
            { "data": 'stocks', "title": "Tồn kho" },
            {
                "render": function () {
                    return '<td><a class="btn btn-primary" id="btn" onclick="myFunction()">Sửa</a></td>';
                },
                "title": "Thao tác"
            },
        ],
    });
    setInterval(function () {
        sizeTable.ajax.reload();
    }, 5000);
    // call api them nhan vien
    $('#add-size-form').submit(function (event) {
        event.preventDefault()
        var formData = {
            numberSize: $("#numberSize").val(),
            description: ""
        };

        if (confirm(`Bạn có muốn thêm size ${formData.numberSize} không?`)) {
            $.ajax({
                url: "https://localhost:44328/api/Size",
                type: "POST",
                data: JSON.stringify(formData),
                contentType: "application/json",
                success: function (response) {
                    $('.toast').toast('show')
                },
            });
        } else {
            return
        }
    });
    $('#size-table tbody').on('click', 'tr', function (e) {
        e.preventDefault();
        let sizeId = $('#size-table').DataTable().row(this).data().id;
        if (sizeId !== null) {
            localStorage.setItem("sizeId", sizeId);
            window.location.href = `/frontend/admin/update-size.html`;
        }
    });
});

