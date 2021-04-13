import { useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import _get from "lodash-es/get";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { emailValidator } from "../helpers/emailValidator";
import { LOGIN_USER } from "../helpers/graphql";
import { passwordValidator } from "../helpers/passwordValidator";
import { removeItem, setItem } from "../helpers/storage";

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

const LoginScreen = ({ route: { params: { user } = {} }, navigation }) => {
  const [email, setEmail] = useState({
    value: _get(user, "email", "test@test.com"),
    error: "",
  });
  const [password, setPassword] = useState({
    value: user ? "" : "asdfasdf",
    error: "",
  });

  const [loginUser, { loading: isLoading }] = useMutation(LOGIN_USER, {
    onCompleted: async ({ login: { jwt, user } } = {}) => {
      await setItem("token", jwt);
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomNavScreen", params: { user } }],
      });
    },
    onError: (error) => {
      console.log("[LoginScreen] error", error);
      console.error("Login Failed :(");
    },
  });

  const validate = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }
    return true;
  };

  return (
    <Background>
      <Header>Welcome back.</Header>
      <TextInput
        autoCapitalize="none"
        autoCompleteType="email"
        error={!!email.error}
        errorText={email.error}
        keyboardType="email-address"
        label="Email"
        returnKeyType="next"
        textContentType="emailAddress"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
      />
      <TextInput
        secureTextEntry
        error={!!password.error}
        errorText={password.error}
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button
        mode="contained"
        onPress={async () => {
          await removeItem("token");
          if (validate()) {
            loginUser({
              variables: { identifier: email.value, password: password.value },
            });
          }
        }}
      >
        {isLoading ? <ActivityIndicator /> : "Login"}
      </Button>
      <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
      <StatusBar networkActivityIndicatorVisible={isLoading} />
    </Background>
  );
};

export default LoginScreen;
