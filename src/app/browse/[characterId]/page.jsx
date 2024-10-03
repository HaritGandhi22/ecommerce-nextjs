import { gql } from "@apollo/client";
import { getClient } from "@/lib/ApolloClient";
import Image from "next/image";

// GraphQL query to fetch a character by ID
const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      id
      image
      gender
      episode {
        name
        episode
      }
    }
  }
`;

export default async function CharacterDetails({ params }) {
    const client = getClient();
    const { data } = await client.query({
        query: GET_CHARACTER,
        variables: { id: params.characterId }, // Pass the ID as a variable
    });

    return (
        <div className="character">
            {/* Optimized image rendering */}
            <img src={data.character.image} width={750} height={750} alt={data.character.name} />
            <div className="character-content">
                <h1>{data.character.name}</h1>
                <p>{data.character.gender}</p>
                <div className="character-episode">
                    {data.character.episode.map((episode, index) => (
                        <div key={index}>
                            {episode.name} - <b>{episode.episode}</b>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
