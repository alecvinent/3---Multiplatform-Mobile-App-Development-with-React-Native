import { FlatList, Image, StyleSheet } from "react-native";
import React, { Component } from "react";

import { Tile } from "react-native-elements";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";

//
const mapStateToProps = (state) => {
  return { dishes: state.dishes };
};

//
class Menu extends Component {
  static navigationOptions = {
    title: "Menu",
  };

  //
  render() {

    const RenderMenuItem = ({ item, index }) => {
      return (
        <Tile
          key={index}
          title={item.name}
          caption={item.description}
          featured
          hideChevron={true}
          onPress={() => navigate("DishDetail", { dishId: item.id })}
          imageSrc={{ uri: baseUrl + item.image }}
        />
      );
    };

    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.props.dishes.dishes}
        renderItem={RenderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  }
}
export default connect(mapStateToProps)(Menu);
