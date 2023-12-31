﻿using Domain.DTOs;
using Domain.Entities;
using EntitiesDto;
using EntitiesDto.Datas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Abstractions
{
    public interface IShoppingCartItemsService
    {
        Task<IEnumerable<ShoppingCartDto>> GetByUserId(string userId);
        Task<ShoppingCartItems> AddToCart(ShoppingCartItemAPI item);
        Task AddRangeToCart(List<ShoppingCartItemAPI> items);
        Task UpdateQuantity(ShoppingCartItemPutAPI item);
        Task DeleteCart(string id);
        Task ClearCart(List<ShoppingCartItems> items);
    }
}
