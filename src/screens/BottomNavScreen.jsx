import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ArticleListScreen from "./ArticleListScreen";
import LoginScreen from "./LoginScreen";
import LogoutScreen from "./LogoutScreen";
import RegisterScreen from "./RegisterScreen";
import StartScreen from "./StartScreen";

const Tab = createBottomTabNavigator();

// eslint-disable-next-line react/display-name
const getTabbBarIcon = (name) => ({ color, size }) => (
  <MaterialCommunityIcons color={color} name={name} size={size} />
);

const BottomNav = ({ route: { params: { user } = {} } }) => (
  <Tab.Navigator initialRouteName={user ? "ArticleList" : "Start"}>
    {user ? (
      <>
        <Tab.Screen
          component={StartScreen}
          name="Start"
          options={{
            title: "Start",
            tabBarIcon: getTabbBarIcon("home"),
          }}
        />
        <Tab.Screen
          component={ArticleListScreen}
          initialParams={{ user }}
          name="ArticleList"
          options={{
            title: "Articles",
            tabBarIcon: getTabbBarIcon("view-list-outline"),
          }}
        />
        <Tab.Screen
          component={LogoutScreen}
          name="Logout"
          options={{
            title: "Logout",
            tabBarIcon: getTabbBarIcon("logout"),
          }}
        />
      </>
    ) : (
      <>
        <Tab.Screen
          component={StartScreen}
          name="Start"
          options={{
            title: "Start",
            tabBarIcon: getTabbBarIcon("home"),
          }}
        />
        <Tab.Screen
          component={LoginScreen}
          name="Login"
          options={{
            title: "Login",
            tabBarIcon: getTabbBarIcon("login"),
          }}
        />
        <Tab.Screen
          component={RegisterScreen}
          name="Register"
          options={{
            title: "Register",
            tabBarIcon: getTabbBarIcon("account-plus"),
          }}
        />
      </>
    )}
  </Tab.Navigator>
);

export default BottomNav;
