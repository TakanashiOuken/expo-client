import React from "react";
import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { Text } from "react-native-paper";

import ListItem from "./ListItem";

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
  },
});

const List = ({ pageSize = 10, onItemPress, ...props }) => (
  <View style={styles.container}>
    <FlatList
      initialNumToRender={pageSize}
      keyExtractor={(item) => `${item.id}`}
      renderItem={({ item }) => (
        <ListItem item={item} key={item.id} onPress={onItemPress} />
      )}
      onEndReachedThreshold={0.5}
      {...props}
    />
  </View>
);
export default List;
