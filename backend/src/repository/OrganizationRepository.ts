import { Connection, Repository } from "typeorm";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";
import enforceAuth, { isAdmin, getUserId } from "./Utils";
import { assertWrappingType } from "graphql";

export class OrganizationRepository {
  private connection: Connection;
  private organizations: Repository<Organization>;
  private users: Repository<User>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.organizations = connection.getRepository(Organization);
    this.users = connection.getRepository(User);
  }

  async getOrganizations(session: Express.Session): Promise<Organization[]> {
    enforceAuth(session);
    if (isAdmin(session)) {
      return this.organizations.find();
    }

    //TODO if user is not a organization user, then do not load!!!
    return (await this.users.findByIds([getUserId(session)], { relations: ["employer"] }))[0].employer;
  }

  async createOrganization(name: string): Promise<Organization> {
    const organization = new Organization();
    organization.name = name;
    await this.organizations.insert(organization);
    return organization;
  }
}
