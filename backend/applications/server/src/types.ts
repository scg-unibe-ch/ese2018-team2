import {JobRepository} from "@unijobs/backend-modules-repositories";
import {OrganizationRepository} from "@unijobs/backend-modules-repositories";
import {UserRepository} from "@unijobs/backend-modules-repositories";
import {JobApplicationRepository} from "@unijobs/backend-modules-repositories";
import {SkillRepository} from "@unijobs/backend-modules-repositories";

export interface Context {
    jobRepository: JobRepository;
    organizationRepository: OrganizationRepository;
    userRepository: UserRepository;
    jobApplicationRepository: JobApplicationRepository;
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
    salary: number;
    organization: any;
}

export interface OrganizationJob {
    id: string;
    title: string;
    description: string;
    salary: number;
    applied: boolean;
    organization: any;
    applicationCount: number;
}

export interface AggregationBucket {
    key: string;
    count: number;
    label: string;
}

export interface SearchAggregation {
    id: string;
    value: string;
}

export interface SearchConnection {
    nodes: any[];
    buckets: any[];
    aggregations: any[];
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
    isStudent: boolean;
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
