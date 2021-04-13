import { useQuery } from "@apollo/client";
import _isEmpty from "lodash-es/isEmpty";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Background from "../components/Background";
import List from "../components/List";
import ListHeader from "../components/ListHeader";
import { FETCH_ARTICLES } from "../helpers/graphql";

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

const ArticleList = ({
  route: {
    params: { user },
  },
}) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { fetchMore, loading: isLoading } = useQuery(FETCH_ARTICLES, {
    variables: { limit: pageSize, start: page * pageSize },
    onCompleted: ({ articles: nextArticles = [] }) => {
      if (!_isEmpty(nextArticles)) setArticles([...articles, ...nextArticles]);
    },
    onError: (error) => {
      console.log("error", error);
      console.error(`Error: ${error.message}`);
    },
  });

  useEffect(() => {
    fetchMore({
      variables: { limit: pageSize, start: page * pageSize },
    });
  }, [fetchMore, page, pageSize]);

  return (
    <Background>
      <ListHeader title="Asia Morning Line" />
      <SafeAreaView style={styles.listContainer}>
        <List
          data={articles}
          pageSize={pageSize}
          onEndReached={() => {
            setPage(page + 1);
          }}
        />
        {isLoading ? <ActivityIndicator /> : null}
      </SafeAreaView>
    </Background>
  );
};

export default ArticleList;
