import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  FlatList,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import Constants from "expo-constants";
import { DISHES } from "../shared/dishes";
import { STYLES } from "../shared/styles";
import { COMMENTS } from "../shared/comments";

//
function RenderDish(props) {
  const dish = props.dish;

  if (dish != null) {
    return (
      <Card style={STYLES.image}>
        <Card.Title>{dish.name}</Card.Title>
        <Card.Divider />
        <Image
          style={STYLES.image}
          resizeMode="cover"
          source={require("./" + dish.image)}
        />

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
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      favorites: [],
    };
  }

  //
  markFavorite(dishId) {
    this.setState({ favorites: this.state.favorites.concat(dishId) });
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
            dish={this.state.dishes[+dishId]}
            favorite={this.state.favorites.some((el) => el === dishId)}
            onPress={() => this.markFavorite(dishId)}
          />
          <RenderComments
            comments={this.state.comments.filter(
              (comment) => comment.dishId === dishId
            )}
          />
        </ScrollView>
      </View>
    );
  }
}
export default DishDetail;
