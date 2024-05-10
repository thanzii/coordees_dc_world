import { gql } from "@apollo/client";
import client from ".";

export async function createTechnician({ input }) {
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation createTechnician($input: TechnicianInput!) {
          createTechnician(technicianInput: $input) {
            id
            success
            message
          }
        }
      `,
      variables: { input: input },
    });
    return response.data.createTechnician;
  } catch (error) {
    return error;
  }
}

export async function updateTechnician({ technicianId, input }) {
  try {
    const response = await client.mutate({
      mutation: gql`
        mutation updateTechnician(
          $technicianId: ID!
          $input: TechnicianInput!
        ) {
          updateTechnician(
            technicianId: $technicianId
            technicianInput: $input
          ) {
            id
            succes
            message
          }
        }
      `,
      variables: { technicianId, input },
    });
    return response.data.updateTechnician;
  } catch (error) {
    return error;
  }
}
