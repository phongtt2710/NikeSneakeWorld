(function () {
    var cartsController = function (priceFactory, $window, stockService, sizeService, e, l, authService, cartService, jwtHelper, orderFactory, apiUrl) {
        e.carts = [];
        e.sizes = [];
        e.cartQuantityMsgError = '';

        e.totalAmount = function () {
            var total = 0
            e.carts.forEach(cart => {
                if (!cart.outOfStock && !cart.notEnough)
                    total += cart.product.discountRate * cart.quantity;
            });
            return total;
        };

        e.deliveryFee = function () {
            if (e.totalAmount() > 5000000) {
                return 0;
            } else {
                return 100000;
            }
        }

        e.getImgUrl = function (path) {
            const imgUrl = new URL(path, apiUrl);
            return imgUrl.href;
        }

        e.convertoString = function (data) {
            return data + '';
        }

        e.updateCart = async function (id) {
            try {
                let data = e.carts.filter(item => item.id === id).map(item => {
                    return { id: item.id, quantity: parseInt(item.quantity), productId: item.product.id, colorId: item.colorId, sizeId: item.sizeId };
                })

                let checkExist = e.carts.filter(item => item.product.id === data[0].productId &&
                    item.colorId === data[0].colorId &&
                    item.sizeId === data[0].sizeId);
                console.log(checkExist.length)
                let token = authService.getToken();
                let tokenDecode = jwtHelper.decodeToken(token);
                if (checkExist.length > 1) {
                    if (confirm("Bạn đã thêm sản phẩm với size này rồi, bạn có muốn tiếp tục không!")) {
                        console.log(data);
                        console.log(e.carts);
                        const response = await cartService.updateCart(id, data[0]);
                        console.log('Thành công');
                    } else {
                        cartService.getCarts(tokenDecode.Id)
                            .then(function (response) {
                                e.carts = response.data;
                                e.carts.forEach(item => {
                                    item.quantity += '';
                                    sizeService.getSizeForProduct(item.product.id, item.colorId)
                                        .then(function (response) {
                                            item.sizes = response.data;
                                        }, function (response) {
                                            console.error(response);
                                        })
                                })

                                e.carts.forEach(item => {
                                    stockService.getStockByRelationId(item.product.id, item.colorId, item.sizeId)
                                        .then(function (response) {
                                            if (response.data !== null) {
                                                console.log(response.data);
                                                if (response.data.unitInStock === 0) {
                                                    item.outOfStock = true;
                                                }
                                                else if (item.quantity > response.data.unitInStock) {
                                                    item.avalibleUnit = response.data.unitInStock;
                                                    item.notEnough = true;
                                                }
                                                else
                                                    item.outOfStock = false;
                                            } else {
                                                console.error("Không tìm thấy stock");
                                            }
                                        }, function (response) {
                                            console.error(response);
                                        })
                                })
                                console.log(e.carts);
                            })
                            .catch(function (data) {
                                console.log(data);
                            });
                    }
                } else {
                    const response = await cartService.updateCart(id, data[0]);
                    cartService.getCarts(tokenDecode.Id)
                        .then(function (response) {
                            e.carts = response.data;
                            e.carts.forEach(item => {
                                item.quantity += '';
                                sizeService.getSizeForProduct(item.product.id, item.colorId)
                                    .then(function (response) {
                                        item.sizes = response.data;
                                    }, function (response) {
                                        console.error(response);
                                    })
                            })

                            e.carts.forEach(item => {
                                stockService.getStockByRelationId(item.product.id, item.colorId, item.sizeId)
                                    .then(function (response) {
                                        if (response.data !== null) {
                                            console.log(response.data);
                                            if (response.data.unitInStock === 0) {
                                                item.outOfStock = true;
                                            }
                                            else if (item.quantity > response.data.unitInStock) {
                                                item.avalibleUnit = response.data.unitInStock;
                                                item.notEnough = true;
                                            }
                                            else
                                                item.outOfStock = false;
                                        } else {
                                            console.error("Không tìm thấy stock");
                                        }
                                    }, function (response) {
                                        console.error(response);
                                    })
                            })
                            console.log(e.carts);
                        })
                        .catch(function (data) {
                            console.log(data);
                        });
                }

            } catch (error) {
                var index = -1;
                for (let i = 0; i < e.carts.length; i++) {
                    if (e.carts[i].id === id) {
                        index = i;
                        break;
                    }
                }
                e.carts[index].quantity = parseInt(e.carts[index].quantity) - 1;
                e.cartQuantityMsgError = error.data.error;
                if (error.data.error === 'Sản phẩm này đã hết hàng') {
                    alert(error.data.error)
                    e.cartQuantityMsgError = '';
                    let token = authService.getToken();
                    let tokenDecode = jwtHelper.decodeToken(token);
                    cartService.getCarts(tokenDecode.Id)
                        .then(function (response) {
                            e.carts = response.data;
                            e.carts.forEach(item => {
                                item.quantity += '';
                                sizeService.getSizeForProduct(item.product.id, item.colorId)
                                    .then(function (response) {
                                        item.sizes = response.data;
                                    }, function (response) {
                                        console.error(response);
                                    })
                            })

                            e.carts.forEach(item => {
                                stockService.getStockByRelationId(item.product.id, item.colorId, item.sizeId)
                                    .then(function (response) {
                                        if (response.data !== null) {
                                            console.log(response.data);
                                            if (response.data.unitInStock === 0) {
                                                item.outOfStock = true;
                                            }
                                            else if (item.quantity > response.data.unitInStock) {
                                                item.avalibleUnit = response.data.unitInStock;
                                                item.notEnough = true;
                                            }
                                            else
                                                item.outOfStock = false;
                                        } else {
                                            console.error("Không tìm thấy stock");
                                        }
                                    }, function (response) {
                                        console.error(response);
                                    })
                            })
                            console.log(e.carts);
                        })
                        .catch(function (data) {
                            console.log(data);
                        });
                }

                e.$apply();

            }
        }

        e.degree = function (id, plus) {
            e.cartQuantityMsgError = '';
            var cart = e.carts.filter(item => item.id === id);
            var index = -1;
            for (let i = 0; i < e.carts.length; i++) {
                if (e.carts[i].id === id) {
                    index = i;
                    break;
                }
            }
            if (plus) {
                if (parseInt(e.carts[index].quantity) <= 9)
                    e.carts[index].quantity = parseInt(e.carts[index].quantity) + 1 + '';
            } else {
                if (parseInt(e.carts[index].quantity) > 1)
                    e.carts[index].quantity = parseInt(e.carts[index].quantity) - 1 + '';
            }
            e.updateCart(id);
        }

        e.pay = function () {
            l.path('/pay');
        }

        e.removeCart = function (id) {
            var confirm = $window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
            if (confirm) {
                let token = authService.getToken();
                let tokenDecode = jwtHelper.decodeToken(token);
                cartService.deleteCart(id)
                    .then(function (response) {
                        cartService.getCarts(tokenDecode.Id)
                            .then(function (response) {
                                e.carts = response.data;
                                e.carts.forEach(item => {
                                    item.quantity += '';
                                    sizeService.getSizeForProduct(item.product.id, item.colorId)
                                        .then(function (response) {
                                            item.sizes = response.data;
                                        }, function (response) {
                                            console.error(response);
                                        })
                                })

                                e.carts.forEach(item => {
                                    stockService.getStockByRelationId(item.product.id, item.colorId, item.sizeId)
                                        .then(function (response) {
                                            if (response.data !== null) {
                                                console.log(response.data);
                                                if (response.data.unitInStock === 0)
                                                    item.outOfStock = true;

                                                else
                                                    item.outOfStock = false;
                                            } else {
                                                console.error("Không tìm thấy stock");
                                            }
                                        }, function (response) {
                                            console.error(response);
                                        })
                                })
                                console.log(e.carts);
                            })
                            .catch(function (data) {
                                console.log(data);
                            });
                    }, function (response) {
                        console.error(response.data);
                    })
            }

        }

        e.formatPrice = function (price) {
            return priceFactory.formatVNDPrice(price);
        }

        function constructor() {
            if (!authService.isLoggedIn() && e.carts !== null) {
                l.path('/signin');
            } else {
                let token = authService.getToken();
                let tokenDecode = jwtHelper.decodeToken(token);
                cartService.getCarts(tokenDecode.Id)
                    .then(function (response) {
                        e.carts = response.data;
                        e.carts.forEach(item => {
                            item.quantity += '';
                            sizeService.getSizeForProduct(item.product.id, item.colorId)
                                .then(function (response) {
                                    item.sizes = response.data;
                                }, function (response) {
                                    console.error(response);
                                })
                        })

                        e.carts.forEach(item => {
                            stockService.getStockByRelationId(item.product.id, item.colorId, item.sizeId)
                                .then(function (response) {
                                    if (response.data !== null) {
                                        console.log(response.data);
                                        if (response.data.unitInStock === 0) {
                                            item.outOfStock = true;
                                        }
                                        else if (item.quantity > response.data.unitInStock) {
                                            item.avalibleUnit = response.data.unitInStock;
                                            item.notEnough = true;
                                        }
                                        else
                                            item.outOfStock = false;
                                    } else {
                                        console.error("Không tìm thấy stock");
                                    }
                                }, function (response) {
                                    console.error(response);
                                })
                        })
                        console.log(e.carts);
                    })
                    .catch(function (data) {
                        console.log(data);
                    });
            }
        }
        constructor();

    }
    cartsController.$inject = ['priceFactory', '$window', 'stockService', 'sizeService', '$scope', '$location', 'authService', 'cartService', 'jwtHelper', 'orderFactory', 'apiUrl'];
    angular.module("app").controller("cartsController", cartsController);
}());