import { post } from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const url = "http://192.168.10.172:1337/auth/local/";
const identifier = "timothy.wang@clsa.com";
const password = "ClsaStrapi";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const App = () => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const login = async () => {
      try {
        const {
          data: { user },
        } = await post(url, { identifier, password });
        setUser(user);
      } catch (error) {
        console.error("error", JSON.stringify(error));
        setError(error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    login();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {JSON.stringify(error)}</Text>
      ) : (
        <Text>User: {JSON.stringify(user)}</Text>
      )}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" networkActivityIndicatorVisible={isLoading} />
    </View>
  );
};

export default App;
