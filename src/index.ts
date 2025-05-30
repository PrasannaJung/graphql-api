import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { title } from "process";

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

const resolvers = {
  Query: {
    posts: () => {
      return postsData;
    },
    post: (_: any, { postId }: { postId: number }) => {
      return postsData.find((post) => post.id === postId);
    },
    reviews: () => {
      return reviewsData;
    },
    review: (_: any, args: { reviewId: number }) => {
      return reviewsData.find((review) => review.id === args.reviewId);
    },
  },
  Post: {
    reviews: (parent: any) => {
      console.log("THE PARENT IN NESTED RESOLVER IS ", parent);
      return reviewsData.filter((review) => review.postId === parent.id);
    },
  },
  Review: {
    post: (parent: any) => {
      return postsData.find((post) => post.id === parent.postId);
    },
  },
  Mutation: {
    deletePost: (_: any, args: { postId: number }) => {
      const newPosts = postsData.filter((post) => post.id !== args.postId);
      return newPosts;
    },
    createPost: (_: any, args: { input: { title: string } }) => {
      const newPost = { id: 4, title: args.input.title };
      console.log("THE NEW POST IS ", newPost);
      return newPost;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: {
    port: 3000,
  },
}).then((data) => {
  console.log("THE SERVER IS RUNNING AT ", data.url);
});
