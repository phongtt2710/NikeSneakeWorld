﻿using Domain.Entities;
using Domain.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Abstractions;
using System;
using System.Threading.Tasks;

namespace Webapi.Controllers
{
    [Route("api/productrate")]
    [ApiController]
    public class ProductRateController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public ProductRateController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }

        [HttpPost]
        public async Task<IActionResult> AddProductRate(ProductRate productRate)
        {
            try
            {
                await _serviceManager.ProductRateService.AddProductRateAsync(productRate);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{appUserId}/{productId}")]
        public async Task<IActionResult> GetProductRate(string appUserId, string productId)
        {
            var productRate = await _serviceManager.ProductRateService.GetProductRateAsync(appUserId, productId);

            if (productRate == null)
            {
                return NotFound();
            }

            return Ok(productRate);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProductRate(ProductRate productRate)
        {
           await _serviceManager.ProductRateService.UpdateProductRate(productRate);
         

            return Ok();
        }
    }
}
