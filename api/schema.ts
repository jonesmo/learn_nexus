import { makeSchema } from "nexus";
import { join } from "path";

export const schema = makeSchema({
	types: [],  //types used to construct GraphQl schema
	outputs: {
		typegen: join(__dirname, '..', 'nexus-typegen.ts'),  //output path where nexus should write generated TypeScript types derived from schema
		schema: join(__dirname, '..', 'schema.graphql'),  //output path where nexus should write SDL version of GraphQL schema
	}
})