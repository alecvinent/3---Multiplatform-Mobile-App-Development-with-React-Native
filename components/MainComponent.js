import React, { Component } from "react";
import { View, Platform, Image, ScrollView, Text } from "react-native";
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from "react-navigation";
import Constants from "expo-constants";
import { Icon } from "react-native-elements";

//
import Menu from "./MenuComponent";
import DishDetail from "./DishDetailComponent";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import About from "./AboutComponent";
import { STYLES } from "../shared/styles";

//
const MenuNavigator = createStackNavigator(
  {
    Menu: {
      screen: Menu,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
    DishDetail: { screen: DishDetail },
  },
  {
    initialRouteName: "Menu",
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512dab",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

//
const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512dab",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

//
const ContactNavigator = createStackNavigator(
  {
    Contact: {
      screen: Contact,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512dab",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

//
const AboutNavigator = createStackNavigator(
  {
    About: {
      screen: About,
      navigationOptions: ({ navigation }) => ({
        headerLeft: (
          <Icon
            name="menu"
            size={24}
            color="white"
            onPress={() => navigation.toggleDrawer()}
          />
        ),
      }),
    },
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#512dab",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        color: "#fff",
      },
    },
  }
);

//
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView style={STYLES.container} forceInset={{top: 'always', horizontal: 'never'}}>
      <View style={STYLES.drawerHeader}>
        <View style={{flex:1}}>
          <Image source={require('./images/logo.png')} style={STYLES.drawerImage} />
        </View>
        <View style={{flex: 2}}>
          <Text style={STYLES.drawerHeaderText}>Ristorante Con Fusion</Text>
        </View>
      </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

//
const MainNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon:({tintColor}) => (
          <Icon name="home" type="font-awesome" color={tintColor} />
        )
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        title: "About",
        drawerLabel: "About Us",
        drawerIcon:({tintColor}) => (
          <Icon name="info-circle" type="font-awesome" color={tintColor} />
        )
      },
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon:({tintColor}) => (
          <Icon name="list" type="font-awesome" color={tintColor} />
        )
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        title: "Contact Us",
        drawerLabel: "Contact Us",
        drawerIcon:({tintColor}) => (
          <Icon name="address-card" type="font-awesome" color={tintColor} />
        )
      },
    },
  },
  {
    drawerBackgroundColor: "#d1c4e9",
    contentComponent: CustomDrawerContentComponent
  }
);

//
class Main extends Component {
  //
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
        }}
      >
        <MainNavigator />
      </View>
    );
  }
}

export default Main;
