import { MutationResolvers } from "../../__generated__/graphqlgen";

const updateJob: MutationResolvers.UpdateJobResolver = (_, args, ctx) => {
  return ctx.jobRepository.updateJob(args)
}

export default updateJob
