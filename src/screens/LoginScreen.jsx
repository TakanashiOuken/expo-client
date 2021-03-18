import { StatusBar } from "expo-status-bar";
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
import { login } from "../helpers/api";
import { emailValidator } from "../helpers/emailValidator";
import { passwordValidator } from "../helpers/passwordValidator";

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

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: "test@clsa.com", error: "" });
  const [password, setPassword] = useState({ value: "password", error: "" });
  const [isLoading, setIsLoading] = useState(false);

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

  const onLoginPressed = async () => {
    try {
      setIsLoading(true);
      if (validate()) {
        const user = await login(email.value, password.value);
        navigation.reset({
          index: 0,
          // routes: [{ name: "Dashboard", params: { user } }],
          routes: [{ name: "ArticleListScreen", params: { user } }],
        });
      }
    } catch (error) {
      console.error("Login Failed :(");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
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
      <Button mode="contained" onPress={onLoginPressed}>
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
