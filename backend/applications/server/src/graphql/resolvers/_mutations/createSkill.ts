import { MutationResolvers } from "../../__generated__/graphqlgen";

const resolver: MutationResolvers.CreateSkillResolver = (_, args, ctx) => {
  return ctx.skillRepository.createSkill(args);
};

export default resolver;
