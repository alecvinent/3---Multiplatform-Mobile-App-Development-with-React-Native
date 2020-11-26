import * as Animatable from "react-native-animatable";

import { FlatList, Text, View } from "react-native";
import React, { Component } from "react";

import { Loading } from "./LoadingComponent";
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
        <Animatable.View
          animation="fadeInRightBig"
          duration={2000}
          delay={1000}
        >
          <Tile
            key={index}
            title={item.name}
            caption={item.description}
            featured
            hideChevron={true}
            onPress={() => navigate("DishDetail", { dishId: item.id })}
            imageSrc={{ uri: baseUrl + item.image }}
          />
        </Animatable.View>
      );
    };

    const { navigate } = this.props.navigation;
    if (this.props.dishes.isLoading) {
      return <Loading />;
    } else if (this.props.dishes.errMess) {
      return (
        <View>
          <Text>{this.props.dishes.errMess}</Text>
        </View>
      );
    } else {
      return (
        <FlatList
          data={this.props.dishes.dishes}
          renderItem={RenderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}
export default connect(mapStateToProps)(Menu);
