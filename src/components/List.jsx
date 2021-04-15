import React, { useState, useMemo, useEffect } from "react";
import { FlatList } from "react-native";
import ListItem from "./ListItem";

const List = ({
  data,
  onEndReached,
  onRefresh,
  pageSize = 10,
  refreshing = false,
}) => (
  <FlatList
    data={data}
    initialNumToRender={pageSize}
    keyExtractor={(item) => `${item.id}`}
    refreshing={refreshing}
    renderItem={({ item }) => <ListItem item={item} />}
    onEndReached={onEndReached}
    onEndReachedThreshold={0.5}
    onRefresh={onRefresh}
  />
);
export default List;
