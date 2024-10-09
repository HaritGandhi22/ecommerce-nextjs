"use client";

import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";

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

export default function Characters() {
  const [page, setPage] = useState(1);

  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page },
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const loadNextPage = () => {
    if (!data.characters.info.next) return; // Ensure there's a next page

    fetchMore({
      variables: {
        page: data.characters.info.next,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          characters: {
            ...fetchMoreResult.characters,
            results: [
              ...prevResult.characters.results,
              ...fetchMoreResult.characters.results,
            ],
            info: fetchMoreResult.characters.info, // Ensure `info` is updated
          },
        };
      },
    });
    setPage(data.characters.info.next);
  };

  return (
    <>
      <div className="character">
        {data.characters.results.map((char) => (
          <div key={char.id}>
            <Link href={`/browse/${char.id}`}>
              <img src={char.image} alt={char.name} />
              <h2>{char.name}</h2>
            </Link>
          </div>
        ))}
      </div>
      {data.characters.info.next && (
        <button onClick={loadNextPage}>Load More</button>
      )}
    </>
  );
}
