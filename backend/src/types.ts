import { JobRepository } from "./repository/JobRepository";
import { OrganizationRepository } from "./repository/OrganizationRepository";
import { UserRepository } from "./repository/UserRepository";
import { JobApplicationRepository } from "./repository/JobApplicationRepository";
import { SkillRepository } from "./repository/SkillRepository";

export interface Context {
  jobRepository: JobRepository;
  organizationRepository: OrganizationRepository;
  userRepository: UserRepository;
  applicationRepository: JobApplicationRepository;
  skillRepository: SkillRepository;
  session?: Express.Session;
}

export interface Organization {
  id: string;
  name: string;
  email: string;
  phone: string;
  approved: boolean;
  jobs: Promise<any[]>;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  organization: any;
}

export interface AggregationBucket {
  key: string;
  count: number;
  label: string;
}

export interface SearchConnection {
  nodes: any[];
  buckets: any[];
}

export interface JobConnection {
  nodes: Job[];
  pageInfo: JobPageInfo;
  totalCount: number;
}
export interface JobPageInfo {
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string | null;
}

export interface Skill {
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
  hasOrganizations: boolean;
  studentProfile: StudentProfile;
}

export interface StudentProfile {
  id: string;
  student: User;
  studyProgram: string;
  university: string;
}

export interface JobApplication {
  id: string;
  state: JobApplicationState;
  user: any;
  job: Job;
}

export interface JobAutocompletion {
  id: string;
  title: string;
}

export type JobApplicationState = "PENDING" | "REJECTED" | "APPROVED";
