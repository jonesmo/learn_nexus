import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { schema } from './schema';


const makeApolloServer = () => {
	return new ApolloServer({
	  schema,
	  context
	});
  };

const server = makeApolloServer();

server.listen().then(({url}) => {
	console.log(`🚀 Server ready at ${url}`)
})