import Constants from "expo-constants";
import React from "react";
import { Image, StyleSheet } from "react-native";
import {} from "lodash-es";

const host = Constants.manifest.extra.REACT_NATIVE_API_HOST;

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    height: 220,
    // borderRadius: 10,
    borderWidth: 0,
    borderColor: "#eaeaea",
  },
});

const Thumbnail = ({ path }) =>
  path ? (
    <Image
      source={{ uri: `${host}${/^\//.test(path) ? path.substr(1) : path}` }}
      style={styles.thumbnail}
    />
  ) : null;

export default Thumbnail;
