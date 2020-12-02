import {
  DrawerItems,
  SafeAreaView,
  createDrawerNavigator,
  createStackNavigator,
} from "react-navigation";
import { Image, Platform, ScrollView, Text, ToastAndroid, View } from "react-native";
import React, { Component } from "react";
import {
  fetchComments,
  fetchDishes,
  fetchLeaders,
  fetchPromos,
} from "../redux/ActionCreators";

import About from "./AboutComponent";
import Constants from "expo-constants";
import Contact from "./ContactComponent";
import DishDetail from "./DishDetailComponent";
import Favorites from "./FavoriteComponent";
import Home from "./HomeComponent";
import { Icon } from "react-native-elements";
import Login from "./LoginComponent";
import Menu from "./MenuComponent";
import NetInfo from '@react-native-community/netinfo';
import Reservation from "./ReservationComponent";
import { STYLES } from "../shared/styles";
import { connect } from "react-redux";

//
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

//
const mapDispatchToProps = (dispatch) => ({
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),

  // postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  // resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  // postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
});

//
const LoginNavigator = createStackNavigator({
  Login: Login
}, {
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      backgroundColor: "#512DA8"
    },
    headerTitleStyle: {
      color: "#fff"
    },
    title: 'Login',
    headerTintColor: "#fff",
    headerLeft: <Icon name="menu" size={24}
      iconStyle={{ color: 'white' }}
      onPress={() => navigation.toggleDrawer()} />
  })
});

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
const ReservationNavigator = createStackNavigator(
  {
    Reservation: { screen: Reservation },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerTintColor: "#fff",
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: "white" }}
          onPress={() => navigation.navigate("DrawerToggle")}
        />
      ),
    }),
  }
);

//
const FavoritesNavigator = createStackNavigator(
  {
    Favorites: { screen: Favorites },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: "#512DA8",
      },
      headerTitleStyle: {
        color: "#fff",
      },
      headerTintColor: "#fff",
      headerLeft: (
        <Icon
          name="menu"
          size={24}
          iconStyle={{ color: "white" }}
          onPress={() => navigation.navigate("DrawerToggle")}
        />
      ),
    }),
  }
);

//
const CustomDrawerContentComponent = (props) => (
  <ScrollView>
    <SafeAreaView
      style={STYLES.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <View style={STYLES.drawerHeader}>
        <View style={{ flex: 1 }}>
          <Image
            source={require("./images/logo.png")}
            style={STYLES.drawerImage}
          />
        </View>
        <View style={{ flex: 2 }}>
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
    Login: {
      screen: LoginNavigator,
      navigationOptions: {
        title: "Login",
        drawerLabel: "Login",
        drawerIcon: ({ tintColor }) => (
          <Icon name="sign-in" type="font-awesome" color={tintColor} />
        ),
      },
    },
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        title: "Home",
        drawerLabel: "Home",
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" type="font-awesome" color={tintColor} />
        ),
      },
    },
    About: {
      screen: AboutNavigator,
      navigationOptions: {
        title: "About",
        drawerLabel: "About Us",
        drawerIcon: ({ tintColor }) => (
          <Icon name="info-circle" type="font-awesome" color={tintColor} />
        ),
      },
    },
    Menu: {
      screen: MenuNavigator,
      navigationOptions: {
        title: "Menu",
        drawerLabel: "Menu",
        drawerIcon: ({ tintColor }) => (
          <Icon name="list" type="font-awesome" color={tintColor} />
        ),
      },
    },
    Contact: {
      screen: ContactNavigator,
      navigationOptions: {
        title: "Contact Us",
        drawerLabel: "Contact Us",
        drawerIcon: ({ tintColor }) => (
          <Icon name="address-card" type="font-awesome" color={tintColor} />
        ),
      },
    },
    Favorites: {
      screen: FavoritesNavigator,
      navigationOptions: {
        title: "My Favorites",
        drawerLabel: "My Favorites",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="heart"
            type="font-awesome"
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      },
    },
    Reservation: {
      screen: ReservationNavigator,
      navigationOptions: {
        title: "Reserve Table",
        drawerLabel: "Reserve Table",
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="cutlery"
            type="font-awesome"
            size={24}
            iconStyle={{ color: tintColor }}
          />
        ),
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerBackgroundColor: "#d1c4e9",
    contentComponent: CustomDrawerContentComponent,
  }
);

//
class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      evento: null
    };
  }

  //
  handleFirstConnectivityChange = (connectionInfo) => {
    switch (connectionInfo.type) {
      case 'none':
        ToastAndroid.show("You're offline", ToastAndroid.LONG);
        break;
      case 'wifi':
        ToastAndroid.show("You're on wifi", ToastAndroid.LONG);
        break;
      case 'cellular':
        ToastAndroid.show("You're cellular", ToastAndroid.LONG);
        break;
      case 'unknown':
        ToastAndroid.show("You have an unknown connection", ToastAndroid.LONG);
        break;

      default:
        break;
    }
  };

  //
  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

    //
    /* NetInfo.getConnectionInfo()
      .then((connectionInfo) => {
        ToastAndroid.show(
          'Initial, type: ' +
          connectionInfo.type +
          ', effectiveType: ' +
          connectionInfo.effectiveType
        );
      }); */

    NetInfo.fetch().then(state => {
      ToastAndroid.show('Connection type' + state.type, ToastAndroid.LONG);
      ToastAndroid.show('Is connected?' + state.isConnected, ToastAndroid.LONG);
    });

    //
    /*
    NetInfo.addEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
    */
    const unsubscribe = NetInfo.addEventListener(state => {
      ToastAndroid.show('Connection type', state.type);
      ToastAndroid.show('Is connected?', state.isConnected);
    });
    this.setState({ evento: unsubscribe });


  }

  //
  componentWillUnmount() {
    /*
    NetInfo.removeEventListener(
      'connectionChange',
      this.handleFirstConnectivityChange
    );
    */

    this.state.evento(); // // To unsubscribe to these update, just use:
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(Main);
