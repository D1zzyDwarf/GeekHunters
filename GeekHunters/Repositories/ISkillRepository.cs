using GeekHunters.Models;
using System.Collections.Generic;

namespace GeekHunters.Repositories
{
    public interface ISkillRepository
    {
        IEnumerable<Skill> GetAllSkills();

        Skill GetSkillByName(string name);
    }
}
