// call api len datatable nhan vien
$(document).ready(function () {
    var sizeTable = $('#color-table').DataTable({
        "ajax": {
            "url": "https://localhost:44328/api/Color/Get",
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
            { "data": 'name', "title": "Tên màu" },
            { "data": 'productImages', "title": "Tồn kho" },
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
    $('#add-color-form').submit(function (event) {
        event.preventDefault()
        var formData = {
            name: $("#name").val(),
        };

        if (confirm(`Bạn có muốn thêm màu ${formData.name} không?`)) {
            $.ajax({
                url: "https://localhost:44328/api/Color",
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
    $('#color-table tbody').on('click', 'tr', function (e) {
        e.preventDefault();
        let colorId = $('#color-table').DataTable().row(this).data().id;
        if (colorId !== null) {
            localStorage.setItem("colorId", colorId);
            window.location.href = `/frontend/admin/update-color.html`;
        }
    });
});

