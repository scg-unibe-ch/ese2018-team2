import { importSchema } from "graphql-import";
import { graphql } from "graphql";
import resolvers from "../../";
import { makeExecutableSchema } from "graphql-tools";
import { Context, Job } from "../../../types";
import JobRepository from "../../../repository/JobRepository";
import { OrganizationRepository } from "../../../repository/OrganizationRepository";
import { UserRepository } from "../../../repository/UserRepository";
import { JobApplicationRepository } from "../../../repository/JobApplicationRepository";
import { SkillRepository } from "../../../repository/SkillRepository";

describe("Get likedJobs", () => {
  const schema = makeExecutableSchema({
    typeDefs: importSchema("./schema.graphql"),
    resolvers
  } as any);

  it("should return an empty list", async () => {
    const mockCtx: Context = {
      jobRepository: new (jest.fn<JobRepository>(() => ({
        getJobs: () => []
      })))(),
      organizationRepository: new (jest.fn<OrganizationRepository>())(),
      userRepository: new (jest.fn<UserRepository>())(),
      applicationRepository: new (jest.fn<JobApplicationRepository>())(),
      skillRepository: new (jest.fn<SkillRepository>())()
    };

    const query = `
      query {
        jobs (first: 1) {
          nodes: {
            id
          }
        }
      }
    `;
    expect(await graphql(schema, query, null, mockCtx)).toMatchSnapshot();
  });
});
