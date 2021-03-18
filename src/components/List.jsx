import React from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Text } from "react-native-paper";
import { theme } from "../core/theme";

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.colors.background,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
  },
  title: {
    // fontSize: 32,
  },
});

const List = ({ data, titleKey = "title" }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
      <View style={styles.item}>
        <Text style={styles.title}>{item[titleKey]}</Text>
      </View>
    )}
  />
);

export default List;
