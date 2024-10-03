import { gql } from "@apollo/client";
import { getClient } from "@/lib/ApolloClient";
import Link from "next/link";

const GET_CHARACTERS = gql`
  query {
    characters {
      results {
        id
        name
        image
      }
    }
  }
`;

export default async function RickAndMorty() {

    const { data } = await getClient().query({ query: GET_CHARACTERS })

    return (
        <>
            <div className='character'>
                {data.characters.results.map(char => {
                    return (
                        <div>
                            <Link href={`/browse/${char.id}`}>
                                <img src={char.image} />
                                <h2>{char.name}</h2>
                            </Link>
                        </div>
                    )
                })}
            </div>

        </>
    );
}
