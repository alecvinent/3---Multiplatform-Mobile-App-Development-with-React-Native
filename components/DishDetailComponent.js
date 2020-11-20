import React, {Component} from "react";
import { Text, View, Image, Platform } from "react-native";
import { Card } from "react-native-elements";
import Constants from "expo-constants";
import { DISHES } from "../shared/dishes";
import { STYLES } from "../shared/styles";

//
function RenderDish(props) {
    const dish = props.dish;

    if (dish != null) {
        return (
            <Card style={STYLES.image}>
                <Card.Title>{dish.name}</Card.Title>
                <Card.Divider/>
                <Image
                    style={STYLES.image}
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