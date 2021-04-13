import React from "react";
import { FlatList } from "react-native";
import ListItem from "./ListItem";

const List = ({ data, onEndReached, pageSize = 10 }) => (
  <FlatList
    data={data}
    initialNumToRender={pageSize}
    keyExtractor={(item) => `${item.id}`}
    renderItem={({ item }) => <ListItem item={item} />}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.5}
  />
);

export default List;
