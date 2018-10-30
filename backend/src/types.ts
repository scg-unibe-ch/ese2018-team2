import { JobRepository } from "./repository/JobRepository";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import { UserRepository } from "./repository/UserRpository";

export interface Context {
  jobRepository: JobRepository;
  organizationRepository: OrganizationRepository;
  userRepository: UserRepository;
  session?: Express.Session;
}

export interface Organization {
  id: string;
  name: string;
  jobs: Promise<any[]>;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  organization: any;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
}
