"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `#graphql

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

    type Mutation {
      deletePost(postId:Int!) : [Post!] 
    }
    
`;
