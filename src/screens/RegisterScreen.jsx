import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import Logo from "../components/Logo";
import TextInput from "../components/TextInput";
import { theme } from "../core/theme";
import { registerUser } from "../helpers/api";
import { emailValidator } from "../helpers/emailValidator";
import { nameValidator } from "../helpers/nameValidator";
import { passwordValidator } from "../helpers/passwordValidator";

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
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState({ value: "", error: "" });
  const [username, setUsername] = useState({ value: "", error: "" });

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

  const onSignUpPressed = async () => {
    try {
      setIsLoading(true);
      if (validate()) {
        const user = await registerUser(
          username.value,
          email.value,
          password.value
        );
        setIsLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: "BottomNavScreen", params: { user } }],
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
      console.error("Register Failed :(");
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
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
        onPress={onSignUpPressed}
      >
        {isLoading ? <ActivityIndicator /> : "Sign Up"}
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

export default RegisterScreen;
