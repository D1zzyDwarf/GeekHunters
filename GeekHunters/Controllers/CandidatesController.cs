using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using GeekHunters.Models;
using Microsoft.AspNetCore.Cors;
using System;
using GeekHunters.Repositories;

namespace GeekHunters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CandidatesController : ControllerBase
    {
        public ICandidateRepository _candidateRepository;
        public ISkillRepository _skillRepository;

        public CandidatesController(ICandidateRepository candidateRepository, ISkillRepository skillRepository)
        {
            _candidateRepository = candidateRepository;
            _skillRepository = skillRepository;
        }

        [HttpGet]
        [EnableCors("DefaultPolicy")]
        public ActionResult<IEnumerable<CandidateDTO>> Get([FromQuery]string[] skills)
        {
            try
            {
                skills = skills.Select(skill => Uri.UnescapeDataString(skill)).ToArray();
                List<Candidate> candidates;

                if (skills.Length == 0)
                {
                    candidates = _candidateRepository.GetAllCandidates().ToList();
                }
                else
                {
                    candidates = new List<Candidate>();
                    var parsedSkills = skills.Select(x => x.Trim().Split(","));
                    foreach (string[] skillParams in parsedSkills)
                    {
                        var fulfilledCandidates = 
                            _candidateRepository
                                .GetCandidatesBySkills(skillParams)
                                .ToList();

                        fulfilledCandidates.ForEach(c =>
                        {
                            if (!candidates.Any(addedCandidate => c.Id == addedCandidate.Id))
                            {
                                candidates.Add(c);
                            }
                        });
                    }
                }
                
                return candidates.Select(c => new CandidateDTO(c)).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
            
        }

        [HttpPost]
        [EnableCors("DefaultPolicy")]
        public ActionResult<object> Post([FromBody] CandidateDTO candidate)
        {
            try
            {
                var skills = new List<Skill>();
                candidate
                    .Skills?
                    .ToList()
                    .ForEach(skill => skills.Add(_skillRepository.GetSkillByName(skill)));

                Candidate newCandidate = new Candidate();
                newCandidate.FirstName = candidate.FirstName;
                newCandidate.LastName = candidate.LastName;

                var candidateSkills = new List<CandidateSkill>();
                skills.ForEach(skill =>
                {
                    candidateSkills.Add(new CandidateSkill
                    {
                        Candidate = newCandidate,
                        Skill = skill
                    });
                });
                newCandidate.CandidateSkills = candidateSkills;

                _candidateRepository.SaveNewCandidate(newCandidate);

                return StatusCode(200);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
            
        }
    }
}
