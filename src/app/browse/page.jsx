// RickAndMorty.js
import { gql } from "@apollo/client";
import { getClient } from "@/lib/ApolloClient";
import Characters from "@/components/Characters";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int) {
    characters(page: $page) {
      results {
        id
        name
        image
      }
      info {
        next
        prev
      }
    }
  }
`;

export default async function RickAndMorty() {
  // Fetch initial data from server-side
  const { data } = await getClient().query({
    query: GET_CHARACTERS,
    variables: { page: 1 }, // start at page 1
  });

  return (
    <div>
      {/* Pass the initial data to the client-side component */}
      <Characters initialData={data} />
    </div>
  );
}
