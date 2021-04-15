import React from "react";
import { FlatList } from "react-native";
import ListItem from "./ListItem";

const List = ({ pageSize = 10, ...props }) => (
  <FlatList
    initialNumToRender={pageSize}
    keyExtractor={(item) => `${item.id}`}
    renderItem={({ item }) => <ListItem item={item} />}
    onEndReachedThreshold={0.5}
    {...props}
  />
);
export default List;
