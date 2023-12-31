(function () {
    var orderDetailController = function (
        s, r, l,
        orderService,
        authService,
        priceFactory,
        apiUrl,
        stockService,
        jwtHelper,
        cartService
    ) {

        s.order = [];
        s.statuses = [
            { icon: "fa-solid fa-file-invoice", note: "Đơn đã đặt" },
            { note: "Đã xác nhận thông tin thanh toán", icon: "fa-solid fa-money-bill-1-wave" },
            { note: "Đã giao cho DVVC", icon: "fa-solid fa-truck-fast" },
            { note: "Đã nhận được hàng", icon: "fa-solid fa-box-tissue" },
            { note: "Đã hủy đơn hàng", icon: "fa-solid fa-xmark" },
            { note: "Đơn hàng đã hoàn thành", icon: "fa-solid fa-star" }
        ];

        constructor();


        s.formatPrice = function (price) {
            return priceFactory.formatVNDPrice(price);
        }

        s.sale = function () {
            if (s.order.length !== 0) {
                if (s.order[0].voucherValue > 0) {
                    return s.totalAmount() * s.order[0].voucherValue / 100;
                } else {
                    return 0;
                }
            }
        }

        s.totalAmount = function () {
            var total = 0;
            if (s.order.length !== 0) {
                s.order[0].orderItems.forEach(element => {
                    total += element.discountRate * element.quantity;
                });
            }
            return total;
        }

        s.reBuy = async function () {
            if (s.order.length !== 0) {
                try {
                    let token = authService.getToken();
                    let tokenDecode = jwtHelper.decodeToken(token);
                    let data = [];
                    s.order[0].orderItems.forEach(async item => {
                        data.push({
                            appUserId: tokenDecode.Id,
                            productId: item.productId,
                            colorId: item.colorId,
                            sizeId: item.sizeId,
                            quantity: item.quantity
                        });
                    })

                    try {
                        let response = await cartService.addRangeToCard(data);
                    } catch (error) {
                        console.error(error);
                    }
                

                } catch (error) {
                    console.error(error);
                }
                s.$apply(function () {
                    l.path('/cart');
                });
            }
            

        }

        s.total = function () {
            if (s.order.length > 0)
                return s.order[0].total + s.sale() * -1;
            return 0;
        }

        s.getImgUrl = function (path) {
            const imgUrl = new URL(path, apiUrl);
            return imgUrl.href;
        }

        s.redirectToOrder = function () {
            l.path('/order');
        }

        function constructor() {
            if (!authService.isLoggedIn()) {
                l.path('/signin');
                return;
            }
            let id = String(r.id);
            orderService.getOrderDetail(id)
                .then(function (response) {
                    s.order = response.data;
                    console.log(s.order);
                }, function (response) {
                    console.error(response.data);
                })
        }
    }
    orderDetailController.$inject = [
        '$scope',
        '$routeParams',
        '$location',
        'orderService',
        'authService',
        'priceFactory',
        'apiUrl',
        'stockService',
        'jwtHelper',
        'cartService'
    ];
    angular.module("app").controller("orderDetailController", orderDetailController);
}())