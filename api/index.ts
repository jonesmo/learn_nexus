import { ApolloServer } from "apollo-server";
import { schema } from './schema';


const makeApolloServer = () => {
	return new ApolloServer({
	  schema
	});
  };

const server = makeApolloServer();

server.listen().then(({url}) => {
	console.log(`🚀 Server ready at ${url}`)
})