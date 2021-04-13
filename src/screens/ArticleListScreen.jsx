import _isEmpty from "lodash-es/isEmpty";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import Background from "../components/Background";
import List from "../components/List";
import ListHeader from "../components/ListHeader";
import { fetchArticles } from "../helpers/api";

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
  const sort = "publishedDate:desc";

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const articlesRef = useRef([]);

  const fetchData = useCallback(async (params) => {
    try {
      setIsLoading(true);
      const nextArticles = await fetchArticles(params);
      if (!_isEmpty(nextArticles)) {
        articlesRef.current = [...articlesRef.current, ...nextArticles];
        setArticles(articlesRef.current);
      }
    } catch (error) {
      console.log("error", error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData({
      _limit: pageSize,
      _sort: sort,
      _start: page * pageSize,
    });
  }, [fetchData, page, pageSize]);

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
