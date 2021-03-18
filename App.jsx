import React from "react";
import { Provider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { theme } from "./src/core/theme";
import {
  ArticleListScreen,
  StartScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
} from "./src/screens";

const Stack = createStackNavigator();

const App = () => (
  <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="StartScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={ArticleListScreen} name="ArticleListScreen" />
        <Stack.Screen component={Dashboard} name="Dashboard" />
        <Stack.Screen
          component={ForgotPasswordScreen}
          name="ForgotPasswordScreen"
        />
        <Stack.Screen component={LoginScreen} name="LoginScreen" />
        <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
        <Stack.Screen component={StartScreen} name="StartScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
