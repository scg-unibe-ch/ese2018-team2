import { Connection, Repository } from "typeorm";
import { Organization } from "../entity/Organization";

export class OrganizationRepository {
  private connection: Connection;
  private organizations: Repository<Organization>;

  constructor(connection: Connection) {
    this.connection = connection;
    this.organizations = connection.getRepository(Organization);
  }

  async getOrganizations(): Promise<Organization[]> {
    return this.organizations.find();
  }

  async createOrganization(name: string): Promise<Organization> {
    const organization = new Organization();
    organization.name = name;
    await this.organizations.insert(organization);
    return organization;
  }
}
