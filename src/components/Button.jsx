import React from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    lineHeight: 26,
  },
});

const Button = ({ mode, style, ...props }) => (
  <PaperButton
    labelStyle={styles.text}
    mode={mode}
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.surface },
      style,
    ]}
    {...props}
  />
);

export default Button;
