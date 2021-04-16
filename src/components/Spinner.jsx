import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
    width: "100%",
  },
});

const Spinner = ({ fullPage = false, isLoading = false, ...props }) =>
  isLoading ? (
    <View
      style={[
        styles.container,
        fullPage
          ? {
              height: Dimensions.get("window").height,
              weight: Dimensions.get("window").weight,
            }
          : {},
      ]}
    >
      <ActivityIndicator hidesWhenStopped animating={isLoading} {...props} />
    </View>
  ) : null;
export default Spinner;
