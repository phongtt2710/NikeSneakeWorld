var app = angular.module("app", ["ngRoute", "angular-jwt"]);
app.constant("apiUrl", 'https://localhost:44328');
app.directive("headerPage", function () {
  return {
    restrict: 'E',
    templateUrl: '../directives/header-page.html',
    controller: "headerController"

  }
})
app.directive("productPrimary", function () {
  return {
    restrict: 'E',
    templateUrl: '../directives/product-primary.html'
  }
})
app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix("");
  $routeProvider
    .when("/", {
      templateUrl: "../page/index/index.html",
      controller: "homeController"
    })
    .when("/signin", {
      controller: "authController",
      templateUrl: "../page/login/login.html"
    })
    .when("/register", {
      controller: "authController",
      templateUrl: "../page/login/register.html",
    })
    .when("/fogotpassword", {
      templateUrl: "../page/login/forgotpassword.html",
      controller: "authController"
    })
    .when("/accountDetail", {
      templateUrl: "../page/login/accountinfomation.html",
      controller: "userController"
    })
    .when("/product", {
      templateUrl: "../page/product/product.html",
      controller: "productController"
    })
    .when("/7", {
      templateUrl: "../page/promotionalproducts/promotionalproducts.html",
    })
    .when("/blog", {
      templateUrl: "../page/blog/blog.html",
    })
    .when("/contact", {
      templateUrl: "../page/contact/contact.html",
    })
    .when("/address", {
      templateUrl: "../page/login/addressinfomation.html",
      controller: "addressController"
    })
    .when("/productDetail/:id", {
      templateUrl: "../page/productdetails/productdetail.html",
      controller: "productDetailController"
    })
    .when("/cart", {
      templateUrl: "../page/cart/cart.html",
      controller: "cartsController"
    })
    .when("/wishlist", {
      templateUrl: "../page/index/favoriteproduct.html",
      controller: "wishListController"
    })
    .when("/pay", {
      templateUrl: "../page/cart/pay.html",
      controller: "orderController"
    })
    .when("/order", {
      templateUrl: "../page/order/order.html",
      controller: "purchaseController"
    })
    .when("/20", {
      templateUrl: "../page/login/accountinfomation.html",
      controller: ""
    })
    .when("/orderDetail/:id", {
      templateUrl: "../page/order/orderDetail.html",
      controller: "orderDetailController"
    })
    .when("/changePass", {
      templateUrl: "../page/login/changeforgotpassword.html",
      controller: "userController"
    })
    .when("/aboutUS", {
      templateUrl: "../page/index/aboutUS.html",
      controller: ""
    })
    .when("/chinhsach", {
      templateUrl: "../page/index/chinhsach.html",
      controller: ""
    })
    .otherwise({
      templateUrl: "../pages/index/index.html",
    });
});
