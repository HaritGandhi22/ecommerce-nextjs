import { gql } from "@apollo/client";
import { getClient } from "@/lib/client";
import { cookies } from "next/headers";
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
    const client = getClient();
    const ourCookies = cookies();
    const tokenCookie = await ourCookies.get("jwtToken");

    // Check if tokenCookie exists before attempting to access its value
    if (!tokenCookie) {
        throw new Error("Token not found"); // You can handle this error appropriately
    }

    let token = tokenCookie.value;
    let jwtToken;

    try {
        jwtToken = JSON.parse(token);
    } catch (error) {
        throw new Error("Invalid token format"); // Handle JSON parsing error
    }

    const { data } = await client.query({
        query: GET_CHARACTERS, // Fixed to use the correct query
        context: {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        },
    });

    return (
        <>
            <div className='character'>
                {data.characters.results.map(char => {
                    return (
                        <div>
                            <img src={char.image} />
                            <h2>{char.name}</h2>
                        </div>
                    )
                })}
            </div>

        </>
    );
}
