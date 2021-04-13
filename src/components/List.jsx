import React from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import HTMLView from "react-native-htmlview";
import Moment from "moment";
import { host } from "../helpers/api";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  item: {
    paddingTop: 10,
  },
  title: {
    paddingTop: 20,
    fontSize: 18,
    width: "100%",
  },
  cover: {
    width: "100%",
    height: 220,
    // borderRadius: 10,
    borderWidth: 0,
    borderColor: "#eaeaea",
  },
  box: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

const fontSize = 18;
const htmlstyles = StyleSheet.create({
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

const List = ({ data, onEndReached, pageSize = 10 }) => (
  // Refresh State

  // Add new page content control

  <View>
    <FlatList
      data={data}
      initialNumToRender={pageSize}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <View key={item.id} style={styles.item}>
          <Image
            source={{ uri: `http://127.0.0.1:13370${item.thumbnail.url}` }}
            style={styles.cover}
          />
          <View style={styles.box}>
            <Text style={styles.title}>{item.reportName}</Text>
            <HTMLView stylesheet={htmlstyles} value={item.title} />
            <Text>
              Publish Date: {Moment(item.publishedDate).format("d MMM yyyy")}
            </Text>
          </View>
        </View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  </View>
);
export default List;
