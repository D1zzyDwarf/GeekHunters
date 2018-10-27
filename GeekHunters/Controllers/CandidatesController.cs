using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using GeekHunters.Models;

namespace GeekHunters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<CandidateDTO>> Get([FromQuery]string[] skills)
        {
            List<CandidateDTO> candidates;
            using (var db = new CandidateContext()) {
                if (skills.Length == 0) {
                    candidates = db.GetAllCandidatesWithSkills().Select(c => new CandidateDTO(c)).ToList();
                } else {
                    candidates = new List<CandidateDTO>();
                    var parsedSkills = skills.Select(x => x.Trim().Split(","));
                    foreach (string[] skillParams in parsedSkills)
                    {
                        var fulfilledCandidates = db.GetCandidatesBySkills(skillParams);
                        fulfilledCandidates.ForEach(c => candidates.Add(new CandidateDTO(c)));
                    }
                }
            }
            return candidates;
        }

        [HttpPost]
        public void Post([FromBody] CandidateDTO candidate)
        {
            using (var db = new CandidateContext())
            {
                var skills = new List<Skill>();
                candidate.Skills.ToList().ForEach(x => skills.Add(db.Skill.SingleOrDefault(skill => skill.Name == x)));

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
