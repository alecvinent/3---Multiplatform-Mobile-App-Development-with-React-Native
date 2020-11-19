import React, {Component} from "react";
import { Text, View, StyleSheet, Image, Platform } from "react-native";
import { Card } from "react-native-elements";
import Constants from "expo-constants";
import { DISHES } from "../shared/dishes";

//
var styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 50,
        padding: 0
      }
    });

//
function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card style={styles.image}>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Divider/>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={require('./' + dish.image)}
                />
                
                <Text style={{marginBottom: 10}}>
                    {dish.description}
                </Text>
                </Card>
        );
    }
    else {
        return(
            <View />
        );
    }
};

//
class DishDetail extends Component {

    constructor(props){
        super(props);
        this.state = {
            dishes : DISHES
        };
    }

    //
    static navigationOptions = {
        title: 'Dish Details',
      };

    //
    render(){
        const dishId = this.props.navigation.getParam('dishId','');
        return (
            <View style={{flex:1, paddingTop: Platform.OS === 'ios' ? 0: Constants.statusBarHeight}}>
                <RenderDish dish={this.state.dishes[+dishId]} />
            </View>
        );
    };
};
export default DishDetail;