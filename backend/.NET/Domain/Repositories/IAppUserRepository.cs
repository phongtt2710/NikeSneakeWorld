﻿using Domain.DTOs;
using Domain.Entities;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Domain.Repositories
{
    public interface IAppUserRepository
    {
        Task<IdentityResult> Insert(AppUser appUser, string password);
        Task<IdentityResult> ChangePasswordAsync(AppUser user, string currentPassword, string newPassword);

        Task<AppUser> GetByIdAsync(string id, CancellationToken cancellationToken = default);
        Task<AppUser> AuthticationUserWithGoogle(string email);
        Task<AppUser> AuthticationUserWithLogin(string email, string password);
        Task<AppUser> FindByEmailAsync(string email);
        string GenerateJwtToken(AppUser user);
        Task<bool> CheckPassword(AppUser user, string password);
        Task<string> GenerateEmailConfirmToken(AppUser user);
        Task<IdentityResult> ConfirmEmailAsync(AppUser user, string code);
        Task<List<AppUser>> GetAllAppUserAsync(CancellationToken cancellationToken = default);
        Task<AppUser> GetByIdAppUserAsync(string id, CancellationToken cancellationToken = default);
        Task UpdateAppUser(AppUser appUser);
        Task UpdateAppUserbyAdmin(AppUser appUser);
        Task<string> GeneratePasswordResetTokenAsync(AppUser user);
        Task<IdentityResult> ResetPasswordAsync(AppUser user, string token, string newPassword);
        Task<AppUserPhoneDto> GetByPhoneAsync(string phoneNumber);
    }
}
