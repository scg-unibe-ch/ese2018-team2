import { QueryResolvers } from "../../__generated__/graphqlgen";

const resolver: QueryResolvers.SkillsResolver = (_, args, ctx) => {
  return ctx.skillRepository.getSkills(args);
};

export default resolver;
