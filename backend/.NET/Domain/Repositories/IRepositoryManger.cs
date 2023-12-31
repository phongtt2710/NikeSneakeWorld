﻿using Persistence.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Repositories
{
  public interface IRepositoryManger
  {
        IAppUserRepository AppUserRepository { get; }
        IUnitOfWork UnitOfWork { get; }
        IVoucherRepository VoucherRepository { get; }
        ICategoryRepository CategoryRepository { get; }
        IProductRepository ProductRepository { get; }
        ICacheRepository CacheRepository { get; }
        IOrderRepository OrderRepository { get; }
        IOrderItemsRepository OrderItemsRepository { get; }
        IWishListsRepository WishListsRepository { get; }
        INewsRepository NewsRepository { get; }
        IShoppingCartItemRepository ShoppingCartItemRepository { get; }
        IEmployeeRepository EmployeeRepository { get; }
        IStockRepository StockRepository { get; }   
        ISizeRepository SizeRepository { get; }
        IColorRepository ColorRepository { get; }
        IProductRateRepository ProductRateRepository { get; }
        ICategoryProductRepository CategoryProductRepository { get; }
        IMaterialRepository MaterialRepository { get; }
        ISoleRepository SoleRepository { get; }
        IAddressRepository AddressRepository { get; }
        IOrderStatusRepository OrderStatusRepository { get; }
  }
}
