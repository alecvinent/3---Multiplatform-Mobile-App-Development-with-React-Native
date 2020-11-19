import React, { Component } from "react";
import { Text, View } from "react-native";

class Home extends Component {
  static navigationOptions = {
    title: "Home",
  };
  //
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home component</Text>
      </View>
    );
  }
}

export default Home;
