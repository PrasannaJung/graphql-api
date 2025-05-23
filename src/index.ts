import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const postsData = [
  {
    id: 1,
    title: "Post One",
  },
  {
    id: 2,
    title: "Post Two",
  },
  {
    id: 3,
    title: "Post Three",
  },
];

const typeDefs = `#graphql
    type Post {
        id: Int!
        title: String!
    }

    type Query {
        posts: [Post!]
        post(postId: Int!): Post! # defining an argument
    }
`;

const resolvers = {
  Query: {
    posts: () => {
      return postsData;
    },
    post: (_, { postId }: { postId: number }) => {
      return postsData.find((post) => post.id === postId);
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
