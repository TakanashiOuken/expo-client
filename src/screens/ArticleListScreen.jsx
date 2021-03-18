import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import Header from "../components/Header";
import List from "../components/List";
import Logo from "../components/Logo";
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
  navigation,
}) => {
  const [articles, setArticles] = useState();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await fetchArticles();
        setArticles(res);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  return (
    <Background>
      <Logo />
      <Header>Hi {user.username}</Header>
      {/* <Paragraph>{JSON.stringify(user)}</Paragraph> */}
      <SafeAreaView style={styles.listContainer}>
        <List data={articles} titleKey="reportName" />
      </SafeAreaView>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{ name: "StartScreen" }],
          })
        }
      >
        Logout
      </Button>
    </Background>
  );
};

export default ArticleList;
