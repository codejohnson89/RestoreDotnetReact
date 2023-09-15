using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<StoreContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors();

var app = builder.Build();

// Configure the HTTP request pipeline.
/* `app.UseMiddleware<ExceptionMiddleware>();` is adding a custom middleware component called
`ExceptionMiddleware` to the HTTP request pipeline. This middleware is responsible for handling any
exceptions that occur during the processing of the request and returning an appropriate response to
the client. It helps in centralizing the exception handling logic and providing a consistent error
response format. */
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseHttpsRedirection();

app.UseCors(opt => {
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://127.0.0.1:5173");
});

app.UseAuthorization();

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try {
    context.Database.Migrate();
    DbInitializer.Intialize(context);
} catch (Exception ex) {
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
