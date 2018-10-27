using System.Collections.Generic;
namespace GeekHunters.Models
{
    public class CandidateDTO
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<string> Skills { get; set; }

        public CandidateDTO() {}

        public CandidateDTO(Candidate candidate)
        {
            FirstName = candidate.FirstName;
            LastName = candidate.LastName;
            Skills = new List<string>();
            foreach(var cs in candidate.CandidateSkills) {
                Skills.Add(cs.Skill.Name);
            }
        }
    }
}
