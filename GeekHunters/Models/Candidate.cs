using System.Collections.Generic;

namespace GeekHunters.Models
{
    public class Candidate
    {
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<CandidateSkill> CandidateSkills { get; set; }
    }
}
