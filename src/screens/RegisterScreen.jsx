import { useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
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
import { REGISTER_USER } from "../helpers/graphql";
import { nameValidator } from "../helpers/nameValidator";
import { passwordValidator } from "../helpers/passwordValidator";
import { removeItem } from "../helpers/storage";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });

  const [registerUser, { loading: isLoading }] = useMutation(REGISTER_USER, {
    onCompleted: async ({ register: { user } } = {}) => {
      navigation.reset({
        index: 0,
        routes: [{ name: "BottomNavScreen", params: { user } }],
      });
    },
    onError: (error) => {
      console.log("[RegisterScreen] error", error);
      console.error("Register Failed :(");
    },
  });

  const validate = () => {
    const usernameError = nameValidator(username.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || usernameError) {
      setUsername({ ...username, error: usernameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return false;
    }
    return true;
  };

  return (
    <Background>
      <Header>Create Account</Header>
      <TextInput
        error={!!username.error}
        errorText={username.error}
        label="Name"
        returnKeyType="next"
        value={username.value}
        onChangeText={(text) => setUsername({ value: text, error: "" })}
      />
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
      <Button
        mode="contained"
        style={{ marginTop: 24 }}
        onPress={async () => {
          await removeItem("token");
          if (validate()) {
            registerUser({
              variables: {
                username: username.value,
                email: email.value,
                password: password.value,
              },
            });
          }
        }}
      >
        {isLoading ? <ActivityIndicator /> : "Sign Up"}
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
      <StatusBar networkActivityIndicatorVisible={isLoading} />
    </Background>
  );
};

export default RegisterScreen;
