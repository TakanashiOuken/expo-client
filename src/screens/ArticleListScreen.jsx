import _isEmpty from "lodash-es/isEmpty";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
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
    maxHeight: Dimensions.get("window").height / 2,
  },
});

const ArticleList = ({
  route: {
    params: { user },
  },
  navigation,
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

    fetchData({
      _limit: pageSize,
      _sort: sort,
      _start: page * pageSize,
    });
  }, [page, pageSize]);

  return (
    <Background>
      <Logo />
      <Header>Hi {user.username}</Header>
      {/* <Paragraph>{JSON.stringify(user)}</Paragraph> */}
      <SafeAreaView style={styles.listContainer}>
        <List
          data={articles}
          pageSize={pageSize}
          titleKeys={["reportName", "title"]}
          onEndReached={() => {
            setPage(page + 1);
          }}
        />
        {isLoading ? <ActivityIndicator /> : null}
      </SafeAreaView>
      <Button
        mode="outlined"
        onPress={async () => {
          await removeItem("token");
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          });
        }}
      >
        Logout
      </Button>
    </Background>
  );
};

export default ArticleList;
