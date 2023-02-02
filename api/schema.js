import { PubSub } from "graphql-subscriptions";
import users from "./db.js";

const pubsub = new PubSub();

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = `#graphql
  type User {
    id: Int
    name: String
    email: String
  }

  type Query {
    users: [User]
  }

  type Subscription {
    getUsers: [User]
  }
`;

export const resolvers = {
  Query: {
    users: () => users,
  },
  Subscription: {
    getUsers: {
      subscribe: () => pubsub.asyncIterator(["USERS_SENT"]),
    },
  },
};

setInterval(() => pubsub.publish("USERS_SENT", { getUsers: users }), 5 * 1000);
