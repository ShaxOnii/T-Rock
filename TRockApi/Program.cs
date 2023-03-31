using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using TRockApi.Handlers.Coniguration;
using TRockApi.Repositories.Configuration;
using TRockApi.Security;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// configure Db connection
builder.Services.AddDbContext<ShopDbContext>(options => {
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

    options.UseSqlServer(connectionString);
});

RepositoryConfiguration.Register(builder.Services);
HandlersConfiguration.Register(builder.Services);

// cors policy
builder.Services.AddCors(corsOptions => {
    corsOptions.AddPolicy("Open",
        policyBuilder => { policyBuilder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader(); });
});

// swagger auth
builder.Services.AddSwaggerGen(swaggerOptions => {
    swaggerOptions.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme {
        Description = "JWT Authentication header using the Bearer token. Example: 'Bearer 12345abcdef'",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    swaggerOptions.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                Reference = new OpenApiReference {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header,
            },
            new List<string>()
        }
    });

    swaggerOptions.SwaggerDoc("v1", new OpenApiInfo {
        Version = "v1",
        Title = "T-Rock Shop"
    });
});

// security
builder.Services.AddScoped<IAuthService, DefaultAuthService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options => {
        options.TokenValidationParameters = new TokenValidationParameters {
            ClockSkew = TimeSpan.Zero,
            ValidateAudience = true,
            ValidateIssuer = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = "TRockAPI",
            ValidAudience = "TRockAPI",
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes("#TRockSecretKey!")
            )
        };
    });

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Create Db if not exists
using (var scope = app.Services.CreateScope()) {
    var services = scope.ServiceProvider;

    try {
        var context = services.GetRequiredService<ShopDbContext>();
        DbInitializer.Initialize(context);
    }
    catch (Exception ex) {
        app.Logger.LogError(ex, "An error occured during creating the Database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();