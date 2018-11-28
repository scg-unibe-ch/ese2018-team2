import { Connection, Repository } from "typeorm";
import { Job } from "../entity/Job";
import { Organization } from "../entity/Organization";
import { User } from "../entity/User";
import enforceAuth, { enforceAdmin, getUserId, isAdmin } from "./Utils";

export class OrganizationRepository {
  private connection: Connection;
  private organizations: Repository<Organization>;
  private users: Repository<User>;
  private jobs: Repository<Job>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.organizations = connection.getRepository(Organization);
    this.users = connection.getRepository(User);
    this.jobs = connection.getRepository(Job);
  }

  async getOrganizations(
    session: Express.Session,
    organizationId?: string
  ): Promise<Organization[]> {
    enforceAuth(session);
    if (isAdmin(session)) {
      if (organizationId) {
        return this.organizations.findByIds([organizationId]);
      }
      return this.organizations.find();
    }

    //TODO check if id is an organization of the current user (organizational user)
    //TODO if user is not a organization user, then do not load!!!
    return (await this.users.findByIds([getUserId(session)], {
      relations: ["employer"]
    }))[0].employer;
  }

  async createOrganization(name: string): Promise<Organization> {
    const organization = new Organization();
    organization.name = name;
    await this.organizations.insert(organization);
    return organization;
  }

  async approveOrganization(
    organizationId: string,
    session: Express.Session
  ): Promise<any> {
    enforceAdmin(session);

    await this.organizations.update({ id: organizationId }, { approved: true });
    return true;
  }

  async deleteOrganization(organizationId: string) {
    await this.jobs.delete({ organization: { id: organizationId } });
    await this.organizations.delete({ id: organizationId });
    return true;
  }
}
