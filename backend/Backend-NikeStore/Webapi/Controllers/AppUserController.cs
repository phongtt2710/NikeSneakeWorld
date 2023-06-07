﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Service.Abstractions;
using System.Threading.Tasks;
using System.Threading;
using System;
using EntitiesDto;

namespace Webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppUserController : ControllerBase
    {
        private readonly IServiceManager _serviceManager;

        public AppUserController(IServiceManager serviceManager)
        {
            _serviceManager = serviceManager;
        }


        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] AppUserForCreateDto appUserForCreationDto)
        {
            await _serviceManager.AppUserService.CreateAsync(appUserForCreationDto);
            return Ok();
        }

        private object GetAccountById()
        {
            throw new NotImplementedException();
        }
    }
}
