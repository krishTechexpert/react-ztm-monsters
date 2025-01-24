import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {ApolloClient,InMemoryCache,ApolloProvider} from "@apollo/client";
import App from './App';
import { UserProvider } from './contexts/user.context';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';

import './index.scss';

const client = new ApolloClient({
  //uri: 'https://example.com/graphql', // Replace with your GraphQL API URL
  uri:"https://crwn-clothing.com/",
  cache:new InMemoryCache() // 95% it will be used 
  /*In Summary
By Default: Cached data [new InMemoryCache()] is stored in memory (RAM) and is temporary.
For Persistence: Use tools like apollo3-cache-persist to store the cache in localStorage or IndexedDB.

Does It Persist Data Between Sessions?
No, InMemoryCache does not persist data between browser sessions. If you want to persist the cache across page reloads or browser restarts, you can use a library like apollo3-cache-persist.



*/

})
//online graphql editior made https://crwn-clothing.com/ so we can also write in that queries like 
// # Write your query or mutation here
// query($id:ID!,$title:String!){
//   collection(id:$id){
//     id,
//   title,
//   items{
//     id,
//     price,
//     imageUrl,
// 		name  
//   }
// }
//   getCollectionsByTitle(title:$title){
//     title
//   }
  
// collections{
//   id,
//   title,
//   items{
//     id,
//     price,
//     imageUrl,
// name  }
// }
// }
// Query varaibles
// {"id": "cjwuuj5bz000i0719rrtw5gqk",
//   "title": "Jackets"
//   }

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  rootElement
);


/*
Let me break it down for you in a simple way:

The Apollo Client class is like the central hub of your app for working with a GraphQL server. Here's what it does:

Sends Queries and Mutations:

It helps you send GraphQL queries (to fetch data) and mutations (to update data) to the server.
Uses ApolloLink to Connect to the Server:

Think of ApolloLink as a pathway or pipeline that connects your app to the server. Apollo Client uses this to send your requests.
Receives Data:

Once the server responds, Apollo Client receives the data (like query results or mutation confirmations).
Stores Data in the Cache:

It keeps a local copy of the data in a cache (like a temporary storage space). This way, your app doesn’t have to keep asking the server for the same data repeatedly—it can just get it from the cache.
Keeps Queries Up-to-Date:

If the data on the server changes (e.g., through a mutation or subscription), Apollo Client updates the related queries in your app automatically. This is done through something called Observable instances, which are like tools that watch for changes.
Real-Life Analogy:
Imagine you're managing a library:

Apollo Client is like your library assistant.
You (the app) ask the assistant for specific books (data) using a query.
The assistant sends the request to the library's database (the GraphQL server) and gets the books you need.
Once the assistant has the books, they keep a copy of them in their desk drawer (cache), so if you ask for the same book again, they can just hand it to you right away.
If a book gets updated or replaced in the library, the assistant automatically updates their desk copy and lets you know.
In short, Apollo Client simplifies working with GraphQL by handling requests, caching, and keeping your app's data updated—all behind the scenes!
------------------- Apollo client end -------------

--------GraphQL server --------
The GraphQL server is installed and runs on the server side, not on the client side. Here's a clear breakdown:

Where is the GraphQL Server?
Server-Side Installation:
The GraphQL server is typically set up on the backend, where it handles requests from the client and interacts with your database or other APIs to fetch or modify data.

The Apollo Client (or any GraphQL client) is what runs on the client side in your app (e.g., React, Vue, Angular, etc.). This client sends requests to the GraphQL server.

How it Works:
Server Side:

You install and configure a GraphQL server on your backend (e.g., using libraries like Apollo Server, Express GraphQL, or others).
This server defines the schema (types, queries, mutations) and resolves data by connecting to a database, external APIs, or other data sources.
Client Side:

On the front end, you use a GraphQL client (like Apollo Client) to send queries and mutations to the server.
The server processes these requests, fetches the necessary data, and sends the response back to the client.
Example:
Server Side (GraphQL Server):
You set up a backend server (e.g., Node.js with Apollo Server):
javascript
Copy
Edit
const { ApolloServer, gql } = require('apollo-server');

// Define schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
};

// Start the server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log('server start)
*/


/**
 * major Drawback  it contains lots of drwaback ask chatgpt but 
 * 
 * Issue: Setting up a GraphQL server can be more complex than a traditional REST API, especially when building resolvers for large or relational datasets. it is very diffcult to configure graphQl on server side. on backend side we have  to write graphql Schema
 * 
 * to manage frontnd part using Graphql is easy to handle api in comparision to backend configuration

 * 
 */