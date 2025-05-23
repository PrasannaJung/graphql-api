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

const reviewsData = [
  { id: 1, content: "Review for Post One", postId: 1 },
  { id: 2, content: "Review for Post One", postId: 1 },
  { id: 3, content: "Review for Post Two", postId: 2 },
  { id: 4, content: "Review for Post Three", postId: 3 },
];

const typeDefs = `#graphql

    type Review {
      id: Int!
      content:String!
      post: Post!
    }

    type Post {
      id: Int!
      title: String!
      reviews: [Review!]
    }

    type Query {
        posts: [Post!]
        post(postId: Int!): Post! # defining an argument
        reviews: [Review!]
        review(reviewId: Int!): Review!
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
    reviews: () => {
      return reviewsData;
    },
    review: (_, args: { reviewId: number }) => {
      return reviewsData.find((review) => review.id === args.reviewId);
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
