import React from "react";
import Background from "../components/Background";
import Button from "../components/Button";
import { removeItem } from "../helpers/storage";

const LogoutScreen = ({ navigation }) => (
  <Background>
    <Button
      mode="outlined"
      onPress={async () => {
        await removeItem("token");
        navigation.reset({
          index: 0,
          routes: [{ name: "BottomNavScreen" }],
        });
      }}
    >
      Logout
    </Button>
  </Background>
);

export default LogoutScreen;
