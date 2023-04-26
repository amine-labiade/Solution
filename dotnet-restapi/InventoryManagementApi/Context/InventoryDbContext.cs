using InventoryManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementApi.Context
{
    public class InventoryDbContext : DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {
        }

        public DbSet<ProcessDataModel> InventoryProcesses { get; set; }
        public DbSet<StepDataModel> Steps { get; set; }
        public DbSet<FieldDataModel> Fields { get; set; }
        public DbSet<InventoryTypeDataModel> InventoryTypes { get; set; }
        public DbSet<RoleDataModel> Roles { get; set; }
        public DbSet<ScheduleDataModel> Schedules { get; set; }
        public DbSet<UserDataModel> Users { get; set; }
        public DbSet<FieldDataDataModel> FieldsData { get; set; }
        public DbSet<DataSourceDataModel> DataSources { get; set; }
        public DbSet<OutputFieldDataModel> OutputFields { get; set; }
        public DbSet<FileOutputDataModel> FileOutputs { get; set; }
        public DbSet<LinkOutputDataModel> LinkOutputs { get; set; }
        public DbSet<TextOutputDataModel> TextOutputs { get; set; }
        public DbSet<InputFieldDataModel> InputFields { get; set; }
        public DbSet<TextInputDataModel> TextInputs { get; set; }
        public DbSet<DateInputDataModel> DateInputs { get; set; }
        public DbSet<FileInputDataModel> FileInputs { get; set; }
        public DbSet<ChoiceButtonsDataModel> ChoiceButtons { get; set; }
        public DbSet<DropDownDataModel> DropDowns { get; set; }
        public DbSet<OptionDataModel> Options { get; set; }
        public DbSet<SliderDataModel> Sliders { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ProcessDataModel>()
                .HasMany(p => p.InventorySteps)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<StepDataModel>()
                .HasMany(s => s.StepInventoryFields)
                .WithOne()
                .IsRequired()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<FieldDataModel>()
                .HasOne(f => f.FieldData)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<InputFieldDataModel>()
                .HasOne<FieldDataModel>()
                .WithOne()
                .HasForeignKey<InputFieldDataModel>(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<OutputFieldDataModel>()
                .HasOne<FieldDataModel>()
                .WithOne()
                .HasForeignKey<OutputFieldDataModel>(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<FileInputDataModel>()
               .HasOne<InputFieldDataModel>()
               .WithOne()
               .HasForeignKey<FileInputDataModel>(x => x.Id)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<TextInputDataModel>()
               .HasOne<InputFieldDataModel>()
               .WithOne()
               .HasForeignKey<TextInputDataModel>(x => x.Id)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DateInputDataModel>()
               .HasOne<InputFieldDataModel>()
               .WithOne()
               .HasForeignKey<DateInputDataModel>(x => x.Id)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<DropDownDataModel>()
               .HasOne<InputFieldDataModel>()
               .WithOne()
               .HasForeignKey<DropDownDataModel>(x => x.Id)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<ChoiceButtonsDataModel>()
               .HasOne<InputFieldDataModel>()
               .WithOne()
               .HasForeignKey<ChoiceButtonsDataModel>(x => x.Id)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<SliderDataModel>()
                .HasOne<InputFieldDataModel>()
                .WithOne()
                .HasForeignKey<SliderDataModel>(x => x.Id)
                .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<TextOutputDataModel>()
               .HasOne<OutputFieldDataModel>()
               .WithOne()
               .HasForeignKey<TextOutputDataModel>(x => x.Id)
               .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<LinkOutputDataModel>()
              .HasOne<OutputFieldDataModel>()
              .WithOne()
              .HasForeignKey<LinkOutputDataModel>(x => x.Id)
              .OnDelete(DeleteBehavior.Cascade);
            modelBuilder.Entity<FileOutputDataModel>()
              .HasOne<OutputFieldDataModel>()
              .WithOne()
              .HasForeignKey<FileOutputDataModel>(x => x.Id)
              .OnDelete(DeleteBehavior.Cascade);
        }

    }
}
