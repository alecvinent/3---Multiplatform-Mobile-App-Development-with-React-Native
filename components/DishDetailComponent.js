import {
  Button,
  FlatList,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Card, Icon, Input, Rating } from "react-native-elements";
import React, { Component } from "react";
import { postComment, postFavorite } from "../redux/ActionCreators";

import Constants from "expo-constants";
import { STYLES } from "../shared/styles";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";

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
  postComment: (dishId, rating, author, comment) =>
    dispatch(postComment(dishId, rating, author, comment)),
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
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
            onPress={() => props.openCommentForm()}
          />
        </View>
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
        keyExtractor={(item) => item.id}
      />
    </Card>
  );
}

//
class DishDetail extends Component {
  static defaultState() {
    return {
      rating: 3,
      author: "",
      comment: "",
      showModal: false,
      message: ''
    };
  }

  constructor(props) {
    super(props);
    this.state = DishDetail.defaultState();
  }

  setRating(rating) {
    this.setState({ rating });
  }

  setAuthor(author) {
    this.setState({ author });
  }

  setComment(comment) {
    this.setState({ comment });
  }

  markFavorite(dishId) {
    const { postFavorite } = this.props;
    postFavorite(dishId);
  }

  resetCommentForm() {
    this.setState(DishDetail.defaultState());
  }

  handleComment(dishId) {
    const { postComment } = this.props;
    const { author, comment, rating } = this.state;
    if (author !== "" || comment !== "") {
      postComment(dishId, rating, author, comment);
      this.resetCommentForm();
    } else {
      this.setState({
        message: "Error: Check empty fields!!"
      });
    }
  }

  openCommentForm() {
    this.setState({ showModal: true });
  }

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
            openCommentForm={() => this.openCommentForm()}
          />
          {/* modal */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showModal}
            onDismiss={() => this.resetCommentForm()}
            onRequestClose={() => this.resetCommentForm()}
          >
            <View style={STYLES.modal}>
              <Text style={STYLES.modalTitle}>Add Your Comment</Text>
              <Text style={STYLES.error}>{this.state.message}</Text>
              <Rating
                minValue={1}
                startingValue={3}
                fractions={0}
                showRating
                onFinishRating={(rating) => this.setRating(rating)}
              />
              <Input
                placeholder="Author"
                leftIcon={<Icon name="user" type="font-awesome" />}
                onChangeText={(author) => this.setAuthor(author)}
              />
              <Input
                placeholder="Comment"
                leftIcon={<Icon name="comment" type="font-awesome" />}
                onChangeText={(comment) => this.setComment(comment)}
              />
              <Button
                onPress={() => this.handleComment(dishId)}
                color="#512DA8"
                title="SUBMIT"
              />
              <Button
                onPress={() => this.resetCommentForm()}
                color="#6c757d"
                title="CANCEL"
              />
            </View>
          </Modal>
          {/* /modal */}
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
