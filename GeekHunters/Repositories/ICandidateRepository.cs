using GeekHunters.Models;
using System.Collections.Generic;

namespace GeekHunters.Repositories
{
    public interface ICandidateRepository
    {
        IEnumerable<Candidate> GetAllCandidates();

        IEnumerable<Candidate> GetCandidatesBySkills(IEnumerable<string> skills);

        void SaveNewCandidate(Candidate candidate);
    }
}
