import React, { Component } from "react";
import { Text, View, ScrollView, Image } from "react-native";
import { Card } from "react-native-elements";

//
import { DISHES } from "../shared/dishes";
import { PROMOTIONS } from "../shared/promotions";
import { LEADERS } from "../shared/leaders";
import { STYLES } from "../shared/styles";

//
function RenderItem(props) {
  const item = props.item;
  if (item != null) {
    return (
      <Card style={STYLES.image}>
        <Card.Title>{item.name}</Card.Title>
        <Card.Divider />
        <Image
          style={STYLES.image}
          resizeMode="cover"
          source={require("./images/uthappizza.png")}
        />

        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
      </Card>
    );
  } else {
    return <View />;
  }
}

//
class Home extends Component {
  //
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      promotions: PROMOTIONS,
      leaders: LEADERS,
    };
  }
  //
  static navigationOptions = {
    title: "Home",
  };
  //
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.state.dishes.filter((dish) => dish.featured)[0]}
        />
        <RenderItem
          item={
            this.state.promotions.filter((promotion) => promotion.featured)[0]
          }
        />
        <RenderItem
          item={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      </ScrollView>
    );
  }
}

export default Home;
