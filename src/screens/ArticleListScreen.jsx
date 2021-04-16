import { NetworkStatus, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import Background from "../components/Background";
import List from "../components/List";
import ListHeader from "../components/ListHeader";
import { FETCH_ARTICLES } from "../helpers/graphql";

const styles = StyleSheet.create({
  activityIndicator: {
    marginVertical: 10,
  },
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

const ArticleList = ({ navigation }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [refreshing, setRefreshing] = useState(false);

  const {
    data: { articles = [] } = {},
    fetchMore = () => {},
    loading: isLoading,
    refetch,
    networkStatus,
  } = useQuery(FETCH_ARTICLES, {
    variables: { limit: pageSize, start: page * pageSize },
    notifyOnNetworkStatusChange: true,
    onError: ({ message }) => {
      console.error(`Error: ${message}`);
    },
  });

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        if (page) {
          await fetchMore({
            variables: { limit: pageSize, start: page * pageSize },
          });
        } else {
          setRefreshing(true);
          await refetch({
            variables: { limit: pageSize, start: 0 },
          });
          setRefreshing(false);
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData(page);
  }, [fetchMore, page, pageSize, refetch]);

  return (
    <Background>
      <ListHeader
        title={`Asia Morning Line - ${
          networkStatus === NetworkStatus.fetchMore
            ? `Fetching ${page} page`
            : networkStatus === NetworkStatus.refetch
            ? "Refetching"
            : `${articles.length} Articles Loaded`
        }`}
      />
      <SafeAreaView style={styles.listContainer}>
        <List
          data={articles}
          pageSize={pageSize}
          refreshing={refreshing}
          onEndReached={() => {
            setPage(page + 1);
          }}
          onItemPress={(item) => {
            navigation.navigate("ArticleDetailScreen", { item });
          }}
          onRefresh={() => {
            setPage(0);
          }}
        />
        <ActivityIndicator
          isLoading={isLoading}
          style={styles.activityIndicator}
        />
      </SafeAreaView>
    </Background>
  );
};

export default ArticleList;
