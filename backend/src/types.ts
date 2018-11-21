import { JobRepository } from "./repository/JobRepository";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import { UserRepository } from "./repository/UserRepository";
import { JobApplicationRepository } from "./repository/JobApplicationRepository";
import { RoleRepository } from "./repository/RoleRepository";

export interface Context {
  jobRepository: JobRepository;
  organizationRepository: OrganizationRepository;
  userRepository: UserRepository;
  applicationRepository: JobApplicationRepository;
  roleRepository: RoleRepository;
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

export interface Role {
  id: string;
  title: string;
  description: string;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  siteAdmin: boolean;
}

export interface JobApplication {
  id: string;
  state: JobApplicationState;
  user: User;
  job: Job;
}

export type JobApplicationState = "PENDING" | "REJECTED" | "APPROVED";
