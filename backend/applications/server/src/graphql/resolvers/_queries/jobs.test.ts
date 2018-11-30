import { JobApplicationRepository, JobRepository, OrganizationRepository, SkillRepository, UserRepository } from "@unijobs/backend-modules-repositories";
import { graphql } from "graphql";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import resolvers from "../../";
import { Context } from "../../../types";

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
