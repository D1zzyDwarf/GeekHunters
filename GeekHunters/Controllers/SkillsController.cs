using Microsoft.AspNetCore.Mvc;
using GeekHunters.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using System;

namespace GeekHunters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        [HttpGet]
        [EnableCors("DefaultPolicy")]
        public ActionResult<IEnumerable<string>> Get()
        {
            try
            {
                List<string> skills;
                using (var db = new CandidateContext())
                {
                    skills = db.Skill.Select(s => s.Name).ToList();
                }
                return skills;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
            
        }
    }
}