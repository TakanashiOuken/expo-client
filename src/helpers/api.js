import { post } from "axios";

const loginUrl = "http://192.168.10.172:1337/auth/local/";
const registerUrl = "http://192.168.10.172:1337/auth/local/register";

export const login = async (identifier, password) => {
  const {
    data: { user },
  } = await post(loginUrl, { identifier, password });
  return user;
};

export const register = async (username, email, password) => {
  const {
    data: { jwt, user },
  } = await post(registerUrl, { username, email, password });
  return user;
};
