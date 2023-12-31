﻿using Domain.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistence.Providers;
using StackExchange.Redis;
using System.Text;
using System.Threading.Tasks;

namespace Persistence
{
    public static class DependencyInjection
    {
        public static void AddPersistence(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContextPool<AppDbContext>(builder =>
            {
                var connection = configuration.GetConnectionString("DefaultConnection");
                builder.UseNpgsql(connection, b => b.MigrationsAssembly(typeof(AppDbContext).Assembly.FullName));
            });

            services.AddSingleton<IConnectionMultiplexer>(opt => ConnectionMultiplexer.Connect(configuration.GetConnectionString("RedisConnection")));

            services.AddIdentity<AppUser, IdentityRole>(option =>
            {
                option.SignIn.RequireConfirmedAccount = true;
                option.User.AllowedUserNameCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
            })
             .AddEntityFrameworkStores<AppDbContext>()
             .AddDefaultTokenProviders();


            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(jwt =>
                {
                    var key = Encoding.ASCII.GetBytes(configuration.GetSection("JwtConfig:Secret").Value);

                    jwt.SaveToken = true;
                    jwt.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        RequireExpirationTime = false,
                        ValidateLifetime = true
                    };
                    jwt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken))
                            {
                                if (path.StartsWithSegments("/hubs/chat"))
                                {
                                    context.Token = accessToken;
                                }
                                if (path.StartsWithSegments("/hubs/manager"))
                                {
                                    context.Token = accessToken;
                                }
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddSingleton<IUserIdProvider, EmailBasedUserIdProvider>();
        }
    }
}
