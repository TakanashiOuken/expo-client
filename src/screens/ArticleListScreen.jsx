import { useQuery } from "@apollo/client";
import _isEmpty from "lodash-es/isEmpty";
import React, { useState } from "react";
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
import { FETCH_ARTICLES } from "../helpers/graphql";
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
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { fetchMore, loading: isLoading } = useQuery(FETCH_ARTICLES, {
    variables: { limit: pageSize, start: page * pageSize },
    onCompleted: ({ articles: nextArticles = [] }) => {
      if (!_isEmpty(nextArticles)) setArticles([...articles, ...nextArticles]);
    },
    onError: (error) => {
      if (error) {
        console.error(`Error: ${error.message}`);
      }
    },
  });

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
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMore({
              variables: { limit: pageSize, start: nextPage * pageSize },
            });
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
