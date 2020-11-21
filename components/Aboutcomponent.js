import { Card, ListItem } from "react-native-elements";
import { FlatList, Image, Text, View } from "react-native";
import React, { Component } from "react";

import { LEADERS } from "../shared/leaders";
import { STYLES } from "../shared/styles";
import { baseUrl } from "../shared/baseUrl";
import { connect } from "react-redux";

//
const mapStateToProps = (state) => {
  return { leaders: state.leaders };
};

//
function History() {
  return (
    <Card>
      <Card.Title>Our History</Card.Title>
      <Card.Divider />
      <Text>
        Started in 2010, Ristorante con Fusion quickly established itself as a
        culinary icon par excellence in Hong Kong. With its unique brand of
        world fusion cuisine that can be found nowhere else, it enjoys patronage
        from the A-list clientele in Hong Kong. Featuring four of the best
        three-star Michelin chefs in the world, you never know what will arrive
        on your plate the next time you visit us.
      </Text>
      <Text style={{ marginTop: 10 }}>
        The restaurant traces its humble beginnings to The Frying Pan, a
        successful chain started by our CEO, Mr. Peter Pan, that featured for
        the first time the world's best cuisines in a pan.
      </Text>
    </Card>
  );
}

//
class About extends Component { 

  static navigationOptions = {
    title: "About Us",
  };
  //
  render() {
    const RenderLeaderItem = ({ item, index }) => {
      const custom_image = (
        <Image
          style={STYLES.leader_image}
          source={{ uri: baseUrl + item.image }}
        />
      );
      return (
        <ListItem
          key={index}
          title={item.name}
          subtitle={item.description}
          leftAvatar={custom_image}
        />
      );
    };

    return (
      <View>
        <History />
        <Card>
          <Card.Title>Corporate Leadership</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.props.leaders.leaders}
            renderItem={RenderLeaderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </Card>
      </View>
    );
  }
}

export default connect(mapStateToProps)(About);
