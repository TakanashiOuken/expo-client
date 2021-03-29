import { ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Provider } from "react-native-paper";
import { theme } from "./src/core/theme";
import graphqlClient from "./src/helpers/graphql";
import {
  ArticleListScreen,
  Dashboard,
  ForgotPasswordScreen,
  LoginScreen,
  RegisterScreen,
  StartScreen,
} from "./src/screens";

const Stack = createStackNavigator();

const App = () => (
  <ApolloProvider client={graphqlClient}>
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="StartScreen"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            component={ArticleListScreen}
            name="ArticleListScreen"
          />
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
  </ApolloProvider>
);

export default App;
