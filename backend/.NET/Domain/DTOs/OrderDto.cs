﻿using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class OrderDto
    {
        public string Id { get; set; }
        public string AddressLine { get; set; }
        public string PhoneNumber { get; set; }
        public string Note { get; set; }
        public int Paymethod { get; set; }
        public double Amount { get; set; }
        public string CustomerName { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime PassivedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
        public string UserId { get; set; }
        public string EmployeeId { get; set; }
        public string VoucherId { get; set; }
        public string AddressId { get; set; }
        public StatusOrder CurrentStatus { get; set; }
        public UserDto User { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public List<OrderStatusDto> OrderStatuses { get; set; }
    }

    public class UserDto
    {
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
    }

    public class OrderStatusDto
    {
       
        public string OrderId { get; set; }
        public Domain.Enums.StatusOrder Status { get; set; }
        public DateTime Time { get; set; }
        public string Note { get; set; }
       
    }
    public class OrderItemDto
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public string ColorId { get; set; }
        public string SizeId { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
    }
    
    public class OrderOnlineDto : OrderDto
    {
        public AddrDto Addr { get; set; }
    }

    public class AddrDto{
        public string PhoneNumber { get; set; }
        public string FullName { get; set; }
        public string AddressLine { get; set; }
    }

    public class OrderByUserIdDto
    {
        public string OrderId { get; set; }
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public double Discount { get; set; }
        public double Price { get; set; }
        public int Quantity { get; set; }
        public string ProductImge { get; set; }
        public int SizeNumber { get; set; }
        public string ColorName { get; set; }
    }

    public class OrderTestDto
    {
        public string MyProperty { get; set; }
    }
}
