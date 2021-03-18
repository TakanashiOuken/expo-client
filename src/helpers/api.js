import { get, post } from "axios";
import Constants from "expo-constants";
import { getItem, setItem } from "./storage";

// TODO MAybe threr is a better way to get env var then extra
const loginUrl = `${Constants.manifest.extra.REACT_NATIVE_API_HOST}${Constants.manifest.extra.REACT_NATIVE_LOGIN_API_PATH}`;
const registerUrl = `${Constants.manifest.extra.REACT_NATIVE_API_HOST}${Constants.manifest.extra.REACT_NATIVE_REGISTER_API_PATH}`;
const articlesUrl = `${Constants.manifest.extra.REACT_NATIVE_API_HOST}${Constants.manifest.extra.REACT_NATIVE_ARTICLES_API_PATH}`;

export const login = async (identifier, password) => {
  console.log("loginUrl", loginUrl);
  const {
    data: { jwt, user },
  } = await post(loginUrl, { identifier, password });
  await setItem("jwt", jwt);
  return user;
};

export const register = async (username, email, password) => {
  const {
    data: { jwt, user },
  } = await post(registerUrl, { username, email, password });
  await setItem("jwt", jwt);
  return user;
};

export const fetchArticles = async () => {
  const jwt = await getItem("jwt");
  const { data } = await get(articlesUrl, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return data;
};
