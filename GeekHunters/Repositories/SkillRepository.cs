using GeekHunters.Models;
using GeekHunters.Dal;
using System.Collections.Generic;
using System.Linq;

namespace GeekHunters.Repositories
{
    public class SkillRepository: ISkillRepository
    {
        private SQLiteContext _sqliteContext;

        public SkillRepository(SQLiteContext sqliteContext)
        {
            _sqliteContext = sqliteContext;
        }

        public IEnumerable<Skill> GetAllSkills()
        {
            return _sqliteContext.Skill.ToList();
        }

        public Skill GetSkillByName(string name)
        {
            return _sqliteContext.Skill.Where(skill => skill.Name == name).FirstOrDefault();
        }
    }
}
