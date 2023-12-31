﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntitiesDto.User
{
    public class AppUserForLogin
    {

        //[RegularExpression(@"^[a-zA-Z0-9._%+-]+(\+[a-zA-Z0-9._%+-]+)?@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", ErrorMessage = "Email không hợp lệ.")]
        [Required]
        public string Account { get; set; }

        [Required(ErrorMessage = "Không được bỏ qua trống mật khẩu.")]
        public string Password { get; set; }
    }
}
