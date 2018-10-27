using System;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
namespace GeekHunters.Models
{
    public class CandidateContext : DbContext
    {
        public DbSet<Candidate> Candidate { get; set; }

        public DbSet<Skill> Skill { get; set; }

        public DbSet<CandidateSkill> CandidateSkill { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={System.AppContext.BaseDirectory}/GeekHunter.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<CandidateSkill>().HasKey(cs => new { cs.CandidateId, cs.SkillId });
            modelBuilder.Entity<CandidateSkill>().HasOne(cs => cs.Candidate).WithMany(c => c.CandidateSkills).HasForeignKey(cs => cs.CandidateId);
            modelBuilder.Entity<CandidateSkill>().HasOne(cs => cs.Skill).WithMany(s => s.CandidateSkills).HasForeignKey(cs => cs.SkillId);
        }

        public List<Candidate> GetCandidatesBySkills(string[] skills) {
            var fulfilledCandidates =
                Candidate
                    .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                    .Where(c => skills.All(s => c.CandidateSkills.Select(cs => cs.Skill.Name).ToList().Contains(s)))
                    .ToList();
            return fulfilledCandidates;
        }

        public List<Candidate> GetAllCandidatesWithSkills()
        {
            var candidates =
                Candidate
                    .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                    .ToList();
            return candidates;
        }
    }
}
