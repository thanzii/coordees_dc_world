import { gql } from "@apollo/client";
import client from ".";

export async function login({ email, password }) {
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            accessToken {
              accessToken
              tokenType
              userroles
            }
            message
            success
          }
        }
      `,
      variables: { email, password },
    });
    return response.data.login;
  } catch (error) {
    return error;
  }
}
