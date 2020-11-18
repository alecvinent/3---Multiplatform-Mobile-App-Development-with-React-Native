import React from "react";
import { Text, View, FlatList } from "react-native";
import { ListItem } from "react-native-elements";

//
const Menu = (props) => {
  const RenderMenuItem = ({ item, index }) => {
    return (
      <ListItem
        key={index}
        title={item.name}
        subtitle={item.description}
        hideChevron={true}
        leftAvatar={{ source: require("./" + item.image) }}
      />
    );
  };

  return (
    <FlatList
      data={props.dishes}
      renderItem={RenderMenuItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};
export default Menu;
