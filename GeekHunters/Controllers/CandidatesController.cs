using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using GeekHunters.Models;
using Microsoft.AspNetCore.Cors;

namespace GeekHunters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        [HttpGet]
        [EnableCors("DefaultPolicy")]
        public ActionResult<IEnumerable<CandidateDTO>> Get([FromQuery]string[] skills)
        {
            skills = skills.Select(s => System.Uri.UnescapeDataString(s)).ToArray();
            List<Candidate> candidates;
            using (var db = new CandidateContext()) {
                if (skills.Length == 0) {
                    candidates = db.GetAllCandidatesWithSkills().ToList();
                } else {
                    candidates = new List<Candidate>();
                    var parsedSkills = skills.Select(x => x.Trim().Split(","));
                    foreach (string[] skillParams in parsedSkills)
                    {
                        var fulfilledCandidates = db.GetCandidatesBySkills(skillParams);
                        fulfilledCandidates.ForEach(c => {
                            if (!candidates.Any(addedCandidate => c.Id == addedCandidate.Id))
                            {
                                candidates.Add(c);
                            }
                            
                        });
                    }
                }
            }
            return candidates.Select(c => new CandidateDTO(c)).ToList();
        }

        [HttpPost]
        [EnableCors("DefaultPolicy")]
        public void Post([FromBody] CandidateDTO candidate)
        {
            using (var db = new CandidateContext())
            {
                var skills = new List<Skill>();
                candidate.Skills?.ToList().ForEach(x => skills.Add(db.Skill.SingleOrDefault(skill => skill.Name == x)));

                Candidate newCandidate = new Candidate();
                newCandidate.FirstName = candidate.FirstName;
                newCandidate.LastName = candidate.LastName;

                var candidateSkills = new List<CandidateSkill>();
                skills.ForEach(s =>
                {
                    candidateSkills.Add(new CandidateSkill
                    {
                        Candidate = newCandidate,
                        Skill = s
                    });
                });
                newCandidate.CandidateSkills = candidateSkills;

                db.Candidate.Add(newCandidate);
                db.SaveChanges();
            }
        }
    }
}
