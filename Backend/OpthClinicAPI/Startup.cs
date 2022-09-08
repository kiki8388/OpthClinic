using Application.Commands;
using Application.Services;
using Application.Validators;
using Domain.Common.Exceptions;
using Domain.Models;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.DbContext;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace OpthClinicAPI
{
    public class Startup
    {
        public IConfiguration _configuration { get; }

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            var authenticationSettings = new AuthenticationSettings();

            _configuration.GetSection("Authentication").Bind(authenticationSettings);

            services.AddCors(options =>
            {
                options.AddPolicy(name: "MyPolicy",
                    builder =>
                    {
                        builder.AllowAnyHeader()
                               .AllowAnyMethod()
                               .SetIsOriginAllowed((host) => true)
                               .AllowCredentials();

                    });
            });

            services.AddSingleton(authenticationSettings);
            services.AddAuthentication(option =>
            {
                option.DefaultAuthenticateScheme = "Bearer";
                option.DefaultScheme = "Bearer";
                option.DefaultChallengeScheme = "Bearer";
            }).AddJwtBearer(cfg =>
            {
                cfg.RequireHttpsMetadata = false;
                cfg.SaveToken = true;
                cfg.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidIssuer = authenticationSettings.JwtIssuer,
                    ValidAudience = authenticationSettings.JwtIssuer,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey)),
                };
            });

            services.AddControllers().AddFluentValidation();

            services.AddScoped<IVisitServices, VisitServices>();
            services.AddScoped<IPatientServices, PatientServices>();
            services.AddScoped<IPasswordHasher<Patient>, PasswordHasher<Patient>>();
            services.AddScoped<IValidator<RegisterPatient>, RegisterPatientDtoValidator>();
            services.AddScoped<INurseServices, NurseServices>();
            services.AddScoped<IPasswordHasher<Nurse>, PasswordHasher<Nurse>>();
            services.AddScoped<IValidator<RegisterNurse>, RegisterNurseDtoValidator>();
            services.AddScoped<IDoctorServices, DoctorServices>();
            services.AddScoped<IPasswordHasher<Doctor>, PasswordHasher<Doctor>>();
            services.AddScoped<IValidator<RegisterDoctor>, RegisterDoctorDtoValidator>();
            services.AddScoped<IDirectorServices, DirectorServices>();
            services.AddScoped<IPasswordHasher<Director>, PasswordHasher<Director>>();
            services.AddScoped<IValidator<RegisterDirector>, RegisterDirectorDtoValidator>();
            services.AddScoped<ErrorHandlingMiddleware>();
            services.AddDbContext<ApplicationDbContext>(options =>
            options.UseNpgsql(_configuration.GetConnectionString("PostgreConnection"),
            b => b.MigrationsAssembly(typeof(ApplicationDbContext).Assembly.FullName)));

            services.AddControllers()
                .AddJsonOptions(options =>
                    options.JsonSerializerOptions.ReferenceHandler = null);

            services.AddSwaggerGen();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseMiddleware<ErrorHandlingMiddleware>();

            app.UseAuthentication();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpthClinic API");
            });

            app.UseRouting();

            app.UseCors();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
