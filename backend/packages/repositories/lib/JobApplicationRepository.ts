import {Connection, Repository} from "typeorm";
import {Job} from "@unijobs/backend-modules-models";
import {JobApplication} from "@unijobs/backend-modules-models";
import {JobApplicationState} from "@unijobs/backend-modules-models";
import {User} from "@unijobs/backend-modules-models";
import enforceAuth, {getUserId} from "./Utils";

export class JobApplicationRepository {
    private connection: Connection;
    private applications: Repository<JobApplication>;
    private jobs: Repository<Job>;
    private users: Repository<User>;

    constructor(connection: Connection) {
        this.connection = connection;
        this.applications = connection.getRepository(JobApplication);
        this.jobs = connection.getRepository(Job);
        this.users = connection.getRepository(User);
    }

    getApplications(
        args: any,
        session: Express.Session
    ): Promise<JobApplication[]> {
        enforceAuth(session);

        console.log(
            "" + "" + "args.applicationId: " + args.applicationId + "" + "" + ""
        );
        if (args.applicationId) {
            return this.applications
                .createQueryBuilder("applications")
                .where("applications.id = :id", {id: args.applicationId})
                .leftJoinAndSelect("applications.job", "jobs")
                .leftJoinAndSelect("applications.user", "users")
                .getMany();
        }

        return this.applications
            .createQueryBuilder("applications")
            .leftJoinAndSelect("applications.job", "jobs")
            .leftJoinAndSelect("applications.user", "users")
            .getMany();
    }

    async applyForJob(jobId: string, session: Express.Session): Promise<any> {
        enforceAuth(session);

        const application = new JobApplication();
        application.job = await this.jobs.findOneOrFail(jobId);
        application.user = await this.users.findOneOrFail(session.user.id);
        await this.applications.insert(application);
        console.log(application);
        return true;
    }

    async getApplicationsForJob(jobId: string, session: Express.Session): Promise<JobApplication[]> {
        enforceAuth(session);

        const applications = await this.applications
            .createQueryBuilder("jobApplications")
            .where('"jobId" = :jobId', {jobId})
            .getMany();
        return applications;
    }

    async approveJobApplication(
        applicationId: string,
        session: Express.Session
    ): Promise<any> {
        enforceAuth(session);

        await this.applications.update(
            {id: applicationId},
            {state: JobApplicationState.APPROVED}
        );

        return true;
    }

    async rejectJobApplication(
        applicationId: string,
        session: Express.Session
    ): Promise<any> {
        enforceAuth(session);

        await this.applications.update(
            {id: applicationId},
            {state: JobApplicationState.REJECTED}
        );

        return true;
    }

    async applicationsCount(jobId: string, session: Express.Session): Promise<number>{
        enforceAuth(session);

        return await this.applications
            .createQueryBuilder("jobApplications")
            .where('"jobId" = :jobId', {jobId})
            .getCount();
    }

    /**
     * Check if current user already applied to a specific job
     * @param jobId Job to check
     * @param session
     */
    async isApplied(jobId: string, session: Express.Session): Promise<boolean> {
        // If userId is not defined, immediatly return false
        // This only works, when
        if (!session) {
            return false;
        }

        const result = await this.applications
            .createQueryBuilder("jobApplications")
            .where('"userId" = :userId', {userId: getUserId(session)})
            .andWhere('"jobId" = :jobId', {jobId})
            .getOne();

        return result != null;
    }
}
