using System;
using Microsoft.EntityFrameworkCore;
using GeekHunters.Models;

namespace GeekHunters.Dal
{
    public class SQLiteContext : DbContext
    {
        public DbSet<Candidate> Candidate { get; set; }

        public DbSet<Skill> Skill { get; set; }

        public DbSet<CandidateSkill> CandidateSkill { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={AppContext.BaseDirectory}/GeekHunter.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CandidateSkill>().HasKey(cs => new { cs.CandidateId, cs.SkillId });
            modelBuilder.Entity<CandidateSkill>().HasOne(cs => cs.Candidate).WithMany(c => c.CandidateSkills).HasForeignKey(cs => cs.CandidateId);
            modelBuilder.Entity<CandidateSkill>().HasOne(cs => cs.Skill).WithMany(s => s.CandidateSkills).HasForeignKey(cs => cs.SkillId);
        }
    }
}
