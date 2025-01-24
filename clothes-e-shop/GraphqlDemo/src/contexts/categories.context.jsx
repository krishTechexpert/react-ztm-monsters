import { createContext, useState, useEffect } from 'react';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils';

import {gql,useQuery} from "@apollo/client";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

//query GetCollections { // we can give name here as 


const COLLECTIONS=gql`

  query  {
    collections{
      id,
      title,
      items{
        id,
        price,
        imageUrl,
        name
      }
    }
  }
`

export const CategoriesProvider = ({ children }) => {
  const {loading,error,data} = useQuery(COLLECTIONS)
  const [categoriesMap, setCategoriesMap] = useState({});
  console.log("loading:",loading);
  console.log("data:",data)

  useEffect(() => {
    if(data) {
      const {collections} = data; // {title:items}
      const transformedCollection = collections.reduce((acc,collection) => {
        const {title,items} = collection;
        acc[title.toLowerCase()]=items;
        return acc;
      },{})
      console.log("result",transformedCollection)
      setCategoriesMap(transformedCollection)
    }
  },[data])


  // useEffect(() => {
  //   const getCategoriesMap = async () => {
  //     const categoryMap = await getCategoriesAndDocuments();
  //     setCategoriesMap(categoryMap);
  //   };

  //   getCategoriesMap();
  // }, []);

  const value = { categoriesMap,loading };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};


/*
gql is a tagged template literal provided by the @apollo/client library. It is used to write and parse GraphQL queries, mutations, and subscriptions inside your JavaScript or TypeScript code.

What Does gql Do?
Parses GraphQL Queries:

The gql function takes a string that contains a GraphQL query, mutation, or subscription and converts it into a format that Apollo Client can understand and use.
Syntax Highlighting:

When using gql, many editors (like VS Code) provide syntax highlighting, which makes it easier to write and debug GraphQL operations.
Ensures Validity:

The gql function validates your GraphQL syntax at runtime, so if there's a mistake in your query, you’ll see an error early.
Example Usage
Here's how gql is used:

Writing a Query
javascript
Copy
Edit
import { useQuery, gql } from '@apollo/client';

// Define a GraphQL query using gql
const GET_ITEMS = gql`
  query {
    items {
      id
      name
      price
    }
  }
`;

// Use the query in a React component
function ItemsList() {
  const { loading, error, data } = useQuery(GET_ITEMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.items.map((item) => (
        <li key={item.id}>{item.name} - ${item.price}</li>
      ))}
    </ul>
  );
}
Why Not Just Use a String?
You might wonder why we need gql when GraphQL queries are just strings. The reasons are:

Validation:
gql validates the query at runtime, catching syntax or structural errors.
Parsing:
It transforms the query string into an Abstract Syntax Tree (AST), which Apollo Client uses to understand the query structure.
Tooling:
When you use gql, editor features like autocomplete and syntax highlighting become available, improving your developer experience.
Without gql
While you could technically use plain strings for queries, it would be less efficient and harder to debug. Apollo Client specifically expects queries and mutations to be parsed using gql. It’s an essential part of the Apollo Client workflow!

*/