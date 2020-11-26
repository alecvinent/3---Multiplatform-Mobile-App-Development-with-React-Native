import { Alert, Animated, Platform } from "react-native";
import { FlatList, Text, View } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import React, { Component } from "react";

import { Loading } from "./LoadingComponent";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";
import { deleteFavorite } from "../redux/ActionCreators";

//
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    favorites: state.favorites,
  };
};

//
const mapDispatchToProps = (dispatch) => ({
  deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId)),
});

//
class Favorites extends Component {
  static navigationOptions = {
    title: "My Favorites",
  };

  render() {
    const { navigate } = this.props.navigation;

    const renderMenuItem = ({ item, index }) => {
      
      const RightActions = (progress, dragX) => {
        const scale = dragX.interpolate({
          inputRange: [-100, 0],
          outputRange: [0.7, 0],
        });
        return (
          <>
            <View style={{ backgroundColor: "red", justifyContent: "center" }}>
              <Animated.Text
                style={{
                  color: "white",
                  paddingHorizontal: 10,
                  fontWeight: "600",
                  transform: [{ scale }],
                }}
              >
                <Icon
                  raised
                  reverse
                  name={"trash-o"}
                  type="font-awesome"
                  color="#f50"
                  onPress={() => {
                    console.log("item.id:", item.id);

                    // Works on both Android and iOS
                    if (Platform.OS !== "web") {
                      Alert.alert(
                        "Alert Title",
                        "My Alert Msg",
                        [
                          {
                            text: "Ask me later",
                            onPress: () => console.log("Ask me later pressed"),
                          },
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => this.props.deleteFavorite(item.id),
                          },
                        ],
                        { cancelable: false }
                      );
                    } else {
                      // cause not worked on web
                      this.props.deleteFavorite(item.id);
                    }
                  }}
                />
              </Animated.Text>
            </View>
          </>
        );
      };

      return (
        <Swipeable renderRightActions={RightActions}>
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            onPress={() => navigate("Dishdetail", { dishId: item.id })}
            leftAvatar={{ source: { uri: baseUrl + item.image } }}
          />
        </Swipeable>
      );
    };

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
          data={this.props.dishes.dishes.filter((dish) =>
            this.props.favorites.some((el) => el === dish.id)
          )}
          renderItem={renderMenuItem}
          keyExtractor={(item) => item.id.toString()}
        />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
