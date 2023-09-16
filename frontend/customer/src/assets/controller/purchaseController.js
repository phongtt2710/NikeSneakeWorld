(function (){
    var purchaseController = function (stockService,cartService,apiUrl,priceFactory,l,orderService,jwtHelper,authService,$s){
        $s.orders = [];

        $s.status = [
            "Đang chờ xác nhận",
            "Đang chuẩn bị hàng",
            "Đang giao hàng",
            "Đã nhận hàng",
            "Đã hủy"
        ]
        

        $s.formatPrice = function (price){
            return priceFactory.formatVNDPrice(price);
        }

      

        $s.getToTalAmount = function (id){
            var order = null;
            var total = 0;
            for (let i = 0; i < $s.orders.length; i++) {
                if ($s.orders[i].orderId === id){
                    order = $s.orders[i];
                    break;
                }                
            }

            order.orderItems.forEach(item => {
                total += item.discountRate * item.quantity;
            });

            return total;
           
        }

        $s.getImgUrl = function (path) {
            const imgUrl = new URL(path, apiUrl);
            return imgUrl.href;
        }

        $s.reBuy = function(orderId){
            console.log('run');
            if ($s.orders.length !== 0){
                let token = authService.getToken();
                let tokenDecode = jwtHelper.decodeToken(token);
                let data = [];
                let selectedOrder = $s.orders.filter(item => item.orderId === orderId);
                let index = -1;
                for (let i = 0; i < $s.orders.length; i++) {
                    if ($s.orders[i].orderId === orderId){
                        index = i;
                        break;  
                    }
                    
                }
             
                $s.orders[index].orderItems.forEach(item =>{
                    let apiData = {
                        productId: item.productId,
                        colorId: item.colorId,
                        sizeId: item.sizeId
                    }

                    stockService.getStockId(apiData)
                    .then(function (response){
                        data.push({
                            appUserId: tokenDecode.Id,
                            stockId: response.data,
                            quantity: item.quantity
                        })
                    }, function(response){
                        console.error(response.data);
                    });
                });
                console.log(data);
                cartService.addRangeToCard(data)
                .then(function (response){
                    l.path('/cart');
                }, function (response){
                    console.error(response.data);
                })
                
            }
            
        }

        $s.filterOrder = function (type){
            console.log('run');
            let token = authService.getToken();
            let tokenDecode = jwtHelper.decodeToken(token);
            orderService.getOrderByUserId(tokenDecode.Id, type)
                .then(function(response){
                    $s.orders = response.data;
                    console.log($s.orders);
                }, function(response){
                    console.log(response.data);
                })
        }

        function constructor(){
            if (!authService.isLoggedIn()) {
                l.path('/signin');
            }else{
                let token = authService.getToken();
                let tokenDecode = jwtHelper.decodeToken(token);
                orderService.getOrderByUserId(tokenDecode.Id, null)
                .then(function(response){
                    $s.orders = response.data;
                    console.log($s.orders);
                }, function(response){
                    console.log(response.data);
                })
            }
        }
        constructor();
    }
    purchaseController.$inject = ['stockService','cartService','apiUrl','priceFactory','$location','orderService','jwtHelper','authService', '$scope'];
    angular.module("app").controller("purchaseController", purchaseController);
}())