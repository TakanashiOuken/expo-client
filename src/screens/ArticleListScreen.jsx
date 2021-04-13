import _isEmpty from "lodash-es/isEmpty";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
} from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import List from "../components/List";
import Logo from "../components/Logo";
// import Paragraph from "../components/Paragraph";
import { fetchArticles } from "../helpers/api";
import { removeItem } from "../helpers/storage";

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
  const [pageSize, setPageSize] = useState(5);

  const articlesRef = useRef([]);

  useEffect(() => {
    const fetchData = async (params) => {
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
    };
    // console.log(articles)

    fetchData({
      _limit: pageSize,
      _sort: sort,
      _start: page * pageSize,
    });
  }, [page, pageSize]);

  return (
    <Background>
      {/* <Header>Hi {user.username}</Header> */}
      {/* <Paragraph>{JSON.stringify(user)}</Paragraph> */}
      <SafeAreaView style={styles.listContainer}>
        <Text
          style={
            (styles.box,
            {
              textAlign: "left",
              paddingLeft: 10,
              paddingRight: 10,
              alignSelf: "stretch",
              fontSize: 20,
              fontWeight: "bold",
            })
          }
        >
          Asia Morning Line
        </Text>
        <List
          data={articles}
          pageSize={pageSize}
          titleKeys={["id"]}
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
