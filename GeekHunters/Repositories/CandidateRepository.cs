using GeekHunters.Models;
using GeekHunters.Dal;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GeekHunters.Repositories
{
    public class CandidateRepository : ICandidateRepository
    {
        private readonly SQLiteContext _sqliteContext;

        public CandidateRepository(SQLiteContext sqliteContext)
        {
            _sqliteContext = sqliteContext;
        }

        public IEnumerable<Candidate> GetAllCandidates()
        {
            IEnumerable<Candidate> candidates =
                _sqliteContext.Candidate
                    .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                    .ToList();
            return candidates;
        }

        public IEnumerable<Candidate> GetCandidatesBySkills(IEnumerable<string> skills)
        {
            IEnumerable<Candidate> candidatesBySkills =
                _sqliteContext.Candidate
                    .Include(c => c.CandidateSkills)
                    .ThenInclude(cs => cs.Skill)
                    .Where(c => skills.All(s => c.CandidateSkills.Select(cs => cs.Skill.Name).Contains(s)))
                    .ToList();
            return candidatesBySkills;
        }

        public void SaveNewCandidate(Candidate candidate)
        {
            _sqliteContext.Candidate.Add(candidate);
            _sqliteContext.SaveChanges();
        }
    }
}
