using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions {
    public static class ApplicationServiceExtensions {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config) {
            services.AddControllers();

            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });

            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            services.AddOpenApi();
            services.AddSwaggerGen();

            services.AddCors(options => {
                options.AddPolicy("Cors 4200", builder => {
                    builder.WithOrigins("http://localhost:4200", "https://localhost:4200")
                    .AllowAnyMethod()
                    .AllowAnyHeader();
                });
            });

            services.AddScoped<ITokenService, TokenService>();

            return services;
        }
    }
}
