import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";

export const server = new ApolloServer({ schema })