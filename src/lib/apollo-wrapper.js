//"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache, // Use InMemoryCache from @apollo/client
} from "@apollo/client";
import {
  ApolloNextAppProvider,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support";

function makeClient() {
  const httpLink = new HttpLink({
    uri: "https://rickandmortyapi.com/graphql",
  });

  return new ApolloClient({
    cache: new InMemoryCache(), // Replaced NextSSRInMemoryCache with InMemoryCache
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

export function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
