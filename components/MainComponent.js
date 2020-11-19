import React, { Component } from "react";
import { View, Platform } from "react-native";
import { createStackNavigator } from "react-navigation";
import Constants from "expo-constants";

//
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";

//
const MenuNavigator = createStackNavigator({
  Menu: {screen: Menu},
  DishDetail: {screen: DishDetail}
}, {
  initialRouteName: 'Menu',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#512dab'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      color: '#fff'
    }
  }
});

//
class Main extends Component {

  //
  render() {
    return (
      <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0: Constants.statusBarHeight}}>
        <MenuNavigator />
      </View>
    );
  }
}

export default Main;
