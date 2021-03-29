import * as SecureStore from "expo-secure-store";

export const getItem = (key) => SecureStore.getItemAsync(key);
export const removeItem = (key) => SecureStore.deleteItemAsync(key);
export const setItem = (key, value) => SecureStore.setItemAsync(key, value);
