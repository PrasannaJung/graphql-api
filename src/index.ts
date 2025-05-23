import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { title } from "process";
import { start } from "repl";

const typeDefs = `#graphql
    type Post {
        id: Int!
        title: String!
    }

    type Query {
        post: Post!
    }
`;

const resolvers = {
  Query: {
    post: () => {
      return { id: 1, title: "Post One" };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
});

console.log("GraphQL server ready at " + url);
