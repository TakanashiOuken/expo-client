import Constants from "expo-constants";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Spinner from "./Spinner";

const host = Constants.manifest.extra.REACT_NATIVE_API_HOST;

const styles = StyleSheet.create({
  activityIndicator: {
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
  },
});

const ImageSpinner = ({ path, url, ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  return url || path ? (
    <View>
      <Image
        resizeMode="contain"
        source={{
          uri: url || `${host}${/^\//.test(path) ? path.substr(1) : path}`,
        }}
        onLoadEnd={() => {
          setIsLoading(false);
        }}
        {...props}
      />
      <Spinner isLoading={isLoading} style={styles.activityIndicator} />
    </View>
  ) : null;
};

export default ImageSpinner;
