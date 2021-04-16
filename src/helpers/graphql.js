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
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          articles: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
          },
        },
      },
    },
  }),
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
    articles(sort: "ra_pub_date:desc", limit: $limit, start: $start) {
      id
      articleEntryId
      url
      ra_title
      ra_brief_info
      ra_pages
      ra_printed_flag
      ra_pub_date
      ra_c_date
      ra_is_special_report
      ra_thumbnail_url
      ra_report_url
      ra_report_type_id
    }
  }
`;

export const FETCH_ARTICLE = gql`
  query FetchArticle($id: ID!) {
    article(id: $id) {
      id
      articleEntryId
      url
      ra_title
      ra_brief_info
      ra_pages
      ra_printed_flag
      ra_pub_date
      ra_c_date
      ra_is_special_report
      ra_thumbnail_url
      ra_report_url
      ra_report_type_id
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
