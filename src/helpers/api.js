import { get, post } from "axios";
import Constants from "expo-constants";
import { getItem, setItem } from "./storage";

// TODO MAybe threr is a better way to get env var then extra
const host = Constants.manifest.extra.REACT_NATIVE_API_HOST;
const loginUrl = `${host}${Constants.manifest.extra.REACT_NATIVE_LOGIN_API_PATH}`;
const registerUrl = `${host}${Constants.manifest.extra.REACT_NATIVE_REGISTER_API_PATH}`;
const articlesUrl = `${host}${Constants.manifest.extra.REACT_NATIVE_ARTICLES_API_PATH}`;

export const loginUser = async (identifier, password) => {
  const {
    data: { jwt, user },
  } = await post(loginUrl, { identifier, password });
  await setItem("jwt", jwt);
  return user;
};

export const registerUser = async (username, email, password) => {
  const {
    data: { jwt, user },
  } = await post(registerUrl, { username, email, password });
  await setItem("jwt", jwt);
  return user;
};

export const fetchArticles = async (params) => {
  const jwt = await getItem("jwt");
  const { data } = await get(articlesUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    params,
  });
  return data;
};
