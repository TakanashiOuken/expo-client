import React from "react";
import Background from "../components/Background";
import Header from "../components/Header";
import Logo from "../components/Logo";
import Paragraph from "../components/Paragraph";

const StartScreen = () => (
  <Background>
    <Logo />
    <Header>Welcome</Header>
    <Paragraph>This is the public page</Paragraph>
  </Background>
);

export default StartScreen;
