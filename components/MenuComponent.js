import React, {Component} from "react";
import { FlatList, Image, StyleSheet } from 'react-native';
import { ListItem } from "react-native-elements";

import { DISHES } from "../shared/dishes";

//
class Menu extends Component {

  constructor(props){
    super(props);
    this.state = {
      dishes: DISHES
    };
  };

  static navigationOptions = {
    title: 'Menu',
  };  

  //
  render(){
    const styles = StyleSheet.create({
      tinyLogo: {
        width: 50,
        height: 50,
      },
    });

  const RenderMenuItem = ({item, index}) => {
    const custom_image = <Image style={styles.tinyLogo} source={require('./' + item.image)}/>;
      return (
          
          <ListItem
            key={index}
            title={item.name}
            subtitle={item.description}
            hideChevron={true}
            onPress={() => navigate('DishDetail', {dishId: item.id})}
            leftAvatar= {custom_image}
            />
      );
  };

    const { navigate } = this.props.navigation;
    return (
      <FlatList
        data={this.state.dishes}
        renderItem={RenderMenuItem}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };
};
export default Menu;
