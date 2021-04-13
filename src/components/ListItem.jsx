import moment from "moment";
import React from "react";
import { StyleSheet, View } from "react-native";
import HTMLView from "react-native-htmlview";
import { Text } from "react-native-paper";
import Thumbnail from "./Thumbnail";

const styles = StyleSheet.create({
  item: {
    paddingTop: 10,
  },
  title: {
    paddingTop: 20,
    fontSize: 18,
    width: "100%",
  },
  box: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const fontSize = 18;
const htmlStyles = StyleSheet.create({
  a: {
    fontWeight: "300",
    fontSize,
  },
  p: {
    fontSize,
  },
  strong: {
    fontWeight: "bold",
    fontSize,
  },
  li: {
    fontSize,
  },
});

const ListItem = ({ item }) => (
  <View key={item.id} style={styles.item}>
    <Thumbnail path={item.thumbnail.url} />
    <View style={styles.box}>
      <Text style={styles.title}>{item.reportName}</Text>
      <HTMLView stylesheet={htmlStyles} value={item.title} />
      <Text>
        Publish Date: {moment(item.publishedDate).format("d MMM yyyy")}
      </Text>
    </View>
  </View>
);

export default ListItem;
