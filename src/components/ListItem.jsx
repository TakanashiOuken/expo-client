import moment from "moment";
import React from "react";
import { List, Subheading, Title } from "react-native-paper";
import Image from "./ImageSpinner";

const ListItem = ({ item, onPress }) => (
  <List.Item
    description={
      item.ra_pub_date && moment(item.ra_pub_date).isValid() ? (
        <Subheading>
          Publish Date: {moment(item.ra_pub_date).format("d MMM yyyy")}
        </Subheading>
      ) : null
    }
    right={(props) => (
      <Image
        {...props}
        style={{ height: 110, width: 110 }}
        url={item.ra_thumbnail_url}
      />
    )}
    title={<Title>{item.ra_title}</Title>}
    onPress={() => {
      onPress(item);
    }}
  />
);

export default ListItem;
