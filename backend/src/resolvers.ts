import { IQuery, IResolvers } from "./generated/resolvers";
import ArgsHello = IQuery.ArgsHello;

interface Types {
  Context: any;
  QueryRoot: any;
}

export const resolvers: IResolvers<Types> = {
  Query: {
    hello: (_, { name }: ArgsHello) => `Hello ${name || 'World'}`,
  },
};