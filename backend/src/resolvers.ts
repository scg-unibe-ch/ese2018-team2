import { IQuery} from "./generated/resolvers";
import ArgsHello = IQuery.ArgsHello;
import { IResolvers } from "graphql-yoga/dist/types";

interface Types {
  Context: any;
  QueryRoot: any;
}

export const resolvers : IResolvers = {
  Query: {
    hello: (_, { name }: ArgsHello) => `Hello ${name || 'World'}`,
  },
};