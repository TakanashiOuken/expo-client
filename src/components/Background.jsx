import Constants from "expo-constants";
import React from "react";
import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    backgroundColor: theme.colors.surface,
    paddingTop: Constants.statusBarHeight + 20,
  },
  container: {
    flex: 1,
    padding: 20,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Background = ({ children }) => (
  <View style={styles.background}>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  </View>
);

export default Background;
