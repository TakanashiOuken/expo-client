import { useQuery } from "@apollo/client";
import moment from "moment";
import React from "react";
import { Dimensions, SafeAreaView, StyleSheet } from "react-native";
import { Paragraph, Subheading, Title } from "react-native-paper";
import BackButton from "../components/BackButton";
import Background from "../components/Background";
import Image from "../components/ImageSpinner";
import Spinner from "../components/Spinner";
import { FETCH_ARTICLE } from "../helpers/graphql";

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get("window").width,
    width: Dimensions.get("window").width,
  },
});

const ArticleDetail = ({
  route: {
    params: {
      item: { id },
    },
  },
  navigation,
}) => {
  const { data: { article = {} } = {}, loading: isLoading } = useQuery(
    FETCH_ARTICLE,
    {
      variables: { id },
      onError: (error) => {
        console.log("error", error);
        console.error(`Error: ${error.message}`);
      },
    }
  );

  return (
    <Background>
      <Spinner fullPage isLoading={isLoading} size="large" />
      <BackButton goBack={navigation.goBack} />
      <Image style={styles.image} url={article.ra_thumbnail_url} />
      <Title>{article.ra_title}</Title>
      <SafeAreaView>
        <Subheading>
          Publish Date: {moment(article.ra_pub_date).format("d MMM yyyy")}{" "}
        </Subheading>
        <Paragraph>{article.ra_brief_info}</Paragraph>
      </SafeAreaView>
    </Background>
  );
};

export default ArticleDetail;
