import {
  ApolloClient,
  createHttpLink,
  gql,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { getItem } from "./storage";

// TODO How to set env variables in RN?
const apiHost = Constants.manifest.extra.REACT_NATIVE_API_HOST;
const graphqlName = Constants.manifest.extra.REACT_NATIVE_GRAPHQL_NAME;

const httpLink = createHttpLink({ uri: `${apiHost}${graphqlName}` });

const authLink = setContext(async (request, { headers }) => {
  const token = await getItem("token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
  ) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation LoginUser($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export const FETCH_ARTICLES = gql`
  query FetchArticles($limit: Int, $start: Int) {
    articles(sort: "publishedDate:desc", limit: $limit, start: $start) {
      articleEntryId
      brief
      id
      reportName
      title
    }
  }
`;

export const CREATE_ARTICLES = gql`
  mutation CreateArticle($article: JSON!) {
    createArticle(input: { data: $article }) {
      article {
        articleEntryId
        id
      }
    }
  }
`;
