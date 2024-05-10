import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getState } from "../redux/store";

// const {
//   userModel: { token },
// } = getState();

// Create an http link
const httpLink = createHttpLink({ uri: "http://localhost:4000/" });

// Concatenate the upload and http links
const link = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    // Authorization: token ? `Bearer ${token}` : "",
  },
})).concat(httpLink);

const client = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default client;
