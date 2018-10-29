using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
using System;
using GeekHunters.Repositories;

namespace GeekHunters.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        public ISkillRepository _skillRepository;

        public SkillsController(ISkillRepository skillRepository)
        {
            _skillRepository = skillRepository;
        }

        [HttpGet]
        [EnableCors("DefaultPolicy")]
        public ActionResult<IEnumerable<string>> Get()
        {
            try
            {
                return _skillRepository.GetAllSkills().Select(skill => skill.Name).ToList();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500);
            }
            
        }
    }
}