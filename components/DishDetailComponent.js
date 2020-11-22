import { Card, Icon } from "react-native-elements";
import {
  FlatList,
  Image,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";

import Constants from "expo-constants";
import { STYLES } from "../shared/styles";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { postFavorite } from "../redux/ActionCreators";

//
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    favorites: state.favorites,
  };
};

//
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (dishId) => dispatch(postFavorite(dishId)),
});

//
function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card
        style={STYLES.image}
        featuredTitle={dish.name}
        featuredSubtitle={dish.category}
        image={{ uri: baseUrl + dish.image }}
      >
        <Text style={{ marginBottom: 10 }}>{dish.description}</Text>
        <Icon
          raised
          reverse
          name={props.favorite ? "heart" : "heart-o"}
          type="font-awesome"
          color="#f50"
          onPress={() =>
            props.favorite ? console.log("Already favorite") : props.onPress()
          }
        />
        <Icon
          raised
          reverse
          name="edit"
          type="font-awesome"
          color="#517fa4"
          onPress={() =>
            props.favorite ? console.log("Already favorite") : props.onPress()
          }
        />
      </Card>
    );
  } else {
    return <View />;
  }
}

//
function renderRating(rating) {
  var stars = [];
  for (let index = 0; index < rating; index++) {
    stars.push(
      <Icon key={index} name="star" type="font-awesome" color="gold" />
    );
  }
  return stars;
}
//
function RenderComments(props) {
  const comments = props.comments;

  const renderCommentItem = ({ item, index }) => {
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comment}</Text>
        <Text style={{ fontSize: 12 }}>{renderRating(item.rating)}</Text>
        <Text style={{ fontSize: 12 }}>
          {"-- " + item.author + ", " + item.date}{" "}
        </Text>
      </View>
    );
  };

  return (
    <Card title="Comments">
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </Card>
  );
}

//
class DishDetail extends Component {
  //
  markFavorite(dishId) {
    console.log(dishId);
    this.props.postFavorite(dishId);
  }

  //
  static navigationOptions = {
    title: "Dish Details",
  };

  //
  render() {
    const dishId = this.props.navigation.getParam("dishId", "");
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <ScrollView>
          <RenderDish
            dish={this.props.dishes.dishes[+dishId]}
            favorite={this.props.favorites.some((el) => el === dishId)}
            onPress={() => this.markFavorite(dishId)}
          />
          <RenderComments
            comments={this.props.comments.comments.filter(
              (comment) => comment.dishId === dishId
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
