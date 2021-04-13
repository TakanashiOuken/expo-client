import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-native-paper";
import { theme } from "./src/core/theme";
import {
  ArticleListScreen,
  BottomNavScreen,
  Dashboard,
  ForgotPasswordScreen,
  LoginScreen,
  LogoutScreen,
  RegisterScreen,
  StartScreen
} from "./src/screens";

const Stack = createStackNavigator();

const App = () => (
  <Provider theme={theme}>
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BottomNavScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={ArticleListScreen} name="ArticleListScreen" />
        <Stack.Screen component={BottomNavScreen} name="BottomNavScreen" />
        <Stack.Screen component={Dashboard} name="Dashboard" />
        <Stack.Screen component={ForgotPasswordScreen} name="ForgotPasswordScreen" />
        <Stack.Screen component={LoginScreen} name="LoginScreen" />
        <Stack.Screen component={LogoutScreen} name="LogoutScreen" />
        <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
        <Stack.Screen component={StartScreen} name="StartScreen" />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
