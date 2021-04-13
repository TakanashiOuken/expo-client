import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  header: {
    textAlign: "left",
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: "stretch",
    fontSize: 20,
    fontWeight: "bold",
  },
});

const ListHeader = ({ title }) => <Text style={styles.header}>{title}</Text>;

export default ListHeader;
