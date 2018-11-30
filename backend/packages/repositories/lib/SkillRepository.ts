import { Connection, Repository } from "typeorm";
import { Skill } from "@unijobs/backend-modules-models";

export class SkillRepository {
  private connection: Connection;
  private skills: Repository<Skill>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.skills = connection.getRepository(Skill);
  }

  getSkills(args: any): Promise<Skill[]> {
    if (args.id) {
      return this.skills.findByIds([args.id]);
    } else if (args.title) {
      return this.skills
        .createQueryBuilder("skills")
        .where("skills.title = :title", { title: args.title })
        .getMany();
    }

    return this.skills.find();
  }

  async createSkill(args: any): Promise<Skill> {
    const role = new Skill();
    role.title = args.title;
    role.description = args.description ? args.description : "";
    await this.skills.insert(role);
    return role;
  }
}
