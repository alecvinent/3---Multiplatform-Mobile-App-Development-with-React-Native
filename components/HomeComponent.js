import { Image, ScrollView, Text, View } from "react-native";
import React, { Component } from "react";

import { Card } from "react-native-elements";
import { Loading } from "./LoadingComponent";
import { STYLES } from "../shared/styles";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";

//

//
const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

//
function RenderItem(props) {
  const item = props.item;

  if (props.isLoading) {
    return <Loading />;
  } else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  } else {
    return (
      <Card
        style={STYLES.image}
        featuredTitle={item.name}
        featuredSubtitle={item.designation}
        image={{ uri: baseUrl + item.image }}
      >
        <Text style={{ marginBottom: 10 }}>{item.description}</Text>
      </Card>
    );
  }
}

//
class Home extends Component {
  //
  static navigationOptions = {
    title: "Home",
  };
  //
  render() {
    return (
      <ScrollView>
        <RenderItem
          item={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          isLoading={this.props.dishes.isLoading}
          errMess={this.props.dishes.errMess}
        />
        <RenderItem
          item={
            this.props.promotions.promotions.filter(
              (promotion) => promotion.featured
            )[0]
          }
          isLoading={this.props.promotions.isLoading}
          errMess={this.props.promotions.errMess}
        />
        <RenderItem
          item={
            this.props.leaders.leaders.filter((leader) => leader.featured)[0]
          }
          isLoading={this.props.leaders.isLoading}
          errMess={this.props.leaders.errMess}
        />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);
