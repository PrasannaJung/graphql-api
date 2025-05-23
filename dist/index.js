import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
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
        post: (_, { postId }) => {
            return postsData.find((post) => post.id === postId);
        },
        reviews: () => {
            return reviewsData;
        },
        review: (_, args) => {
            return reviewsData.find((review) => review.id === args.reviewId);
        },
    },
    Post: {
        reviews: (parent) => {
            console.log("THE PARENT IN NESTED RESOLVER IS ", parent);
            return reviewsData.filter((review) => review.postId === parent.id);
        },
    },
    Review: {
        post: (parent) => {
            return postsData.find((post) => post.id === parent.postId);
        },
    },
    Mutation: {
        deletePost: (_, args) => {
            const newPosts = postsData.filter((post) => post.id !== args.postId);
            return newPosts;
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
