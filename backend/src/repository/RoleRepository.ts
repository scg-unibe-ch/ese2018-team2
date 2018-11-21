import { Connection, Repository } from "typeorm";
import { Role } from "../entity/Role";

export class RoleRepository {
  private connection: Connection;
  private roles: Repository<Role>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.roles = connection.getRepository(Role);
  }

  getRoles(args: any): Promise<Role[]> {
    if (args.id) {
      return this.roles.findByIds([args.id]);
    } else if (args.title) {
      return this.roles
        .createQueryBuilder("roles")
        .where("roles.title = :title", { title: args.title })
        .getMany();
    }

    return this.roles.find();
  }

  async createRole(args: any): Promise<Role> {
    const role = new Role();
    role.title = args.title;
    role.description = args.description ? args.description : "";
    await this.roles.insert(role);
    return role;
  }
}
