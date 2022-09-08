using Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.DbContext
{
    public class ApplicationDbContext : Microsoft.EntityFrameworkCore.DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<Patient> Patients { get; set; }
        public DbSet<Nurse> Nurses { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Director> Directors { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<Visit> Visits { get; set; }
        public DbSet<MedicalHistory> MedicalHistory { get; set; }
    }
}
