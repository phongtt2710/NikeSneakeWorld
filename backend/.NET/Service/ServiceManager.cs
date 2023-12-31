﻿using Domain.Repositories;
using Microsoft.AspNetCore.Hosting;
using Nest;
using Service.Abstractions;
using System;

namespace Service
{
    public sealed class ServiceManager : IServiceManager
    {
        private readonly Lazy<IAppUserService> _lazyAppUserService;
        private readonly Lazy<IVoucherService> _lazyVoucherService;
        private readonly Lazy<ICategoryService> _lazyCategoryService;
        private readonly Lazy<IProductService> _lazyProductService;
        private readonly Lazy<IOrderService> _lazyOrderService;
        private readonly Lazy<IOrderItemService> _lazyOrderItemService;
        private readonly Lazy<INewsService> _lazyNewsService;
        private readonly Lazy<IWishListsService> _lazyWishListsService;
        private readonly Lazy<IShoppingCartItemsService> _lazyShoppingCartItemsService;
        private readonly Lazy<IEmployeeService> _lazyEmployeeService;
        private readonly Lazy<ISizeService> _lazySizeService;
        private readonly Lazy<IColorService> _lazyColorService;
        private readonly Lazy<IProductRateService> _lazyProductRateService;
        private readonly Lazy<ICategoryProductService> _lazyCategoryProductService;
        private readonly Lazy<IStockService> _lazyStockService;
        private readonly Lazy<ISoleService> _lazySoleService;
        private readonly Lazy<IAddressService> _lazyAddressService;
        private readonly Lazy<IOrderStatusService> _lazyOrderStatusService;


        private readonly Lazy<IMaterialService> _lazyMaterialService;
        public ServiceManager(IRepositoryManger repositoryManger)
        {
            _lazyAppUserService = new Lazy<IAppUserService>(() => new AppUserService(repositoryManger));
            _lazyVoucherService = new Lazy<IVoucherService>(() => new VoucherService(repositoryManger));
            _lazyCategoryService = new Lazy<ICategoryService>(() => new CategoryService(repositoryManger));
            _lazyProductService = new Lazy<IProductService>(() => new ProductService(repositoryManger));
            _lazyOrderService = new Lazy<IOrderService>(() => new OrderService(repositoryManger));
            _lazyOrderItemService = new Lazy<IOrderItemService>(() => new OrderItemService(repositoryManger));
            _lazyNewsService = new Lazy<INewsService>(() => new NewsService(repositoryManger));
            _lazyWishListsService = new Lazy<IWishListsService>(() => new WishListsService(repositoryManger));
            _lazyShoppingCartItemsService = new Lazy<IShoppingCartItemsService>(() => new ShoppingCartItemsService(repositoryManger));
            _lazyEmployeeService = new Lazy<IEmployeeService>(() => new EmployeeService(repositoryManger));
            _lazySizeService = new Lazy<ISizeService>(() => new SizeService(repositoryManger));
            _lazyColorService = new Lazy<IColorService>(() => new ColorService(repositoryManger));
            _lazyProductRateService = new Lazy<IProductRateService>(() => new ProductRateService(repositoryManger));
            _lazyCategoryProductService=new Lazy<ICategoryProductService>(() => new CategoryProductService(repositoryManger));
            _lazyStockService = new Lazy<IStockService>(() => new StockService(repositoryManger));

            _lazySoleService=new Lazy<ISoleService>(() => new SoleService(repositoryManger));

            _lazyMaterialService = new Lazy<IMaterialService>(() => new MaterialService(repositoryManger));
            _lazyAddressService = new Lazy<IAddressService>(() => new AddressService(repositoryManger));
            _lazyOrderStatusService = new Lazy<IOrderStatusService>(() => new OrderStatusService(repositoryManger));
        }

        public IAppUserService AppUserService => _lazyAppUserService.Value;
        public IVoucherService VoucherService => _lazyVoucherService.Value;
        public ICategoryService CategoryService => _lazyCategoryService.Value;

        public IProductService ProductService => _lazyProductService.Value;

        public IOrderService OrderService => _lazyOrderService.Value;

        public IOrderItemService OrderItemService => _lazyOrderItemService.Value;

        public INewsService NewsService => _lazyNewsService.Value;

        public IWishListsService WishListsService => _lazyWishListsService.Value;

        public IShoppingCartItemsService ShoppingCartItemsService => _lazyShoppingCartItemsService.Value;

        public IEmployeeService employeeService => _lazyEmployeeService.Value;

        public ISizeService SizeService => _lazySizeService.Value;
        public IColorService ColorService => _lazyColorService.Value;

        public IProductRateService ProductRateService => _lazyProductRateService.Value;

        public ICategoryProductService CategoryProductService => _lazyCategoryProductService.Value;

        public IStockService StockService => _lazyStockService.Value;
        
        public IMaterialService MaterialService => _lazyMaterialService.Value;
        public ISoleService SoleService => _lazySoleService.Value;

        public IAddressService AddressService => _lazyAddressService.Value;
        public IOrderStatusService OrderStatusService => _lazyOrderStatusService.Value;
    }
    
}
