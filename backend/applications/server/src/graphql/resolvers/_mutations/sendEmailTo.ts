import { MutationResolvers } from "../../__generated__/graphqlgen";

const sendEmailTo: MutationResolvers.SendEmailToResolver = (_, args, ctx) => {
  return ctx.userRepository.sendEmailTo(args.email);
};

export default sendEmailTo;
