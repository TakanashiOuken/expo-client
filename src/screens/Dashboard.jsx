import React from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";

const Dashboard = ({
  route: {
    params: { user },
  },
  navigation,
}) => (
  <Background>
    <Logo />
    <Header>Hi {user.username}</Header>
    <Paragraph>{JSON.stringify(user)}</Paragraph>
    <Button
      mode="outlined"
      onPress={() =>
        navigation.reset({
          index: 0,
          routes: [{ name: "StartScreen" }],
        })
      }
    >
      Logout
    </Button>
  </Background>
);

export default Dashboard;
