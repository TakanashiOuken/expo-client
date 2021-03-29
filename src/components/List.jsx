import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
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

const List = ({ data, titleKeys = ["title"], onEndReached, pageSize = 10 }) => {
  const findTitle = (item) => {
    const itemMap = new Map(Object.entries(item));
    for (let index = 0; index < titleKeys.length; index++) {
      const title = itemMap.get(titleKeys[index]);
      if (title) return title;
    }
    return item.articleEntryId;
  };

  return (
    <FlatList
      data={data}
      initialNumToRender={pageSize}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View key={item.id} style={styles.item}>
          <Text style={styles.title}>{findTitle(item)}</Text>
        </View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default List;
