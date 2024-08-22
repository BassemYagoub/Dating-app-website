using API.Extensions;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("swagger/v1/swagger.json", "API V1");
        options.RoutePrefix = string.Empty;
    });

    app.MapOpenApi(); // Configure the HTTP request pipeline.
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors("Cors 4200");

app.MapControllers();

app.Run();
