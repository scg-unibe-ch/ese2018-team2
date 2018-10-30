import { importSchema } from "graphql-import";
import { graphql } from "graphql";
import resolvers from "../../";
import { makeExecutableSchema } from "graphql-tools";
import { Context, Job } from "../../../types";
import JobRepository from "../../../repository/JobRepository";
import { OrganizationRepository } from "../../../repository/OrganizationRepository";
import { UserRepository } from "../../../repository/UserRpository";

describe("Get jobs", () => {
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
      userRepository: new (jest.fn<UserRepository>())()
    };

    const query = `
      query {
        jobs {
          id
        }
      }
    `;
    expect(await graphql(schema, query, null, mockCtx)).toMatchSnapshot();
  });

  it("should return a job", async () => {
    const job: Job = {
      id: "123",
      title: "Hello world",
      description: "What",
      organization: {
        id: "123",
        name: "Hello"
      }
    };

    const getJobs = jest.fn(() => [job]);

    const mockCtx: Context = {
      jobRepository: new (jest.fn<JobRepository>(() => ({
        getJobs
      })))(),
      organizationRepository: new (jest.fn<OrganizationRepository>())(),
      userRepository: new (jest.fn<UserRepository>())()
    };

    const expectedId = "123";

    const query = `
      query {
        jobs(id: "${expectedId}") {
          id
          title
          organization {
            id
            name
          }
        }
      }
    `;

    expect(await graphql(schema, query, null, mockCtx)).toMatchSnapshot();

    expect(getJobs.mock.calls.length).toBe(1);
    expect(getJobs.mock.calls[0][0].id).toBe(expectedId);
  });
});
