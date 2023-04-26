using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InventoryManagementApi.Repositories;
using InventoryManagementApi.Context;
using InventoryManagementApi.Services;
using InventoryManagementApi.Repositories.InventoryType;
using InventoryManagementApi.Services.InventoryType;
using InventoryManagementApi.Repositories.Field;
using InventoryManagementApi.Services.Field;
using InventoryManagementApi.Repositories.Shedule;
using InventoryManagementApi.Repositories.User;
using InventoryManagementApi.Repositories.Role;
using InventoryManagementApi.Services.Schedule;
using InventoryManagementApi.Services.User;
using InventoryManagementApi.Services.Common;
using System.Text.Json.Serialization;
using InventoryManagementApi.Repositories.Option;

namespace InventoryManagementApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<InventoryDbContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("SqlServerConnectionString"));
                options.UseLazyLoadingProxies();
            });

            services.AddCors(options => options.AddPolicy("Free Policy", builder =>
           {
               builder.AllowAnyOrigin()
                      .AllowAnyMethod()
                      .AllowAnyHeader();
           }));

            services.AddControllers();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "InventoryManagementApi", Version = "v1" });
            });


            // Map interface with implementation 
            MapInterfacesToImplementations(services);
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
        }
        public static void MapInterfacesToImplementations(IServiceCollection services)
        {
            #region Repositories
            services.AddScoped<IProcessRepository, ProcessRepository>();
            services.AddScoped<IDataSourceRepository, DataSourceRepository>();
            services.AddScoped<IStepRepository, StepRepository>();
            services.AddScoped<IInventoryTypeRepository, InventoryTypeRepository>();
            services.AddScoped<IFieldRepository, FieldRepository>();
            services.AddScoped<IScheduleRepository, ScheduleRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IOptionRepository, OptionRepository>();

            #endregion

            #region Services
            services.AddScoped<IProcessService, ProcessService>();
            services.AddScoped<IDataSourceService, DataSourceService>();
            services.AddScoped<IStepService, StepService>();
            services.AddScoped<IIventoryTypeService, InventoryTypeService>();
            services.AddScoped<IFieldService, FieldService>();
            services.AddScoped<IScheduleService, ScheduleService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IDecryption, Decryption>();
            services.AddScoped<ICommonServices, CommonServices>();

            #endregion
        }
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "InventoryManagementApi v1"));
            }

            app.UseCors(builder =>
            {
                builder
                .AllowAnyOrigin()
                .AllowAnyMethod()
                .AllowAnyHeader();
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors(builder => builder
               .AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader());

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
